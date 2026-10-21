
from pathlib import Path

import numpy as np
import pandas as pd
import torch
from torch import nn
from torch.utils.data import DataLoader, TensorDataset

ROOT = Path(__file__).resolve().parent
DATA_FILE = ROOT / "data" / "processed" / "daily_airport_delays.csv"
MODEL_DIR = ROOT / "ai" / "models"
MODEL_FILE = MODEL_DIR / "delay_lstm_kaggle.pt"

LOOKBACK = 7
EPOCHS = 30
BATCH_SIZE = 32
HIDDEN_SIZE = 16

torch.manual_seed(42)
np.random.seed(42)

# 1. Check files and protect existing models
if not DATA_FILE.exists():
    raise FileNotFoundError(f"Dataset not found: {DATA_FILE}")

if MODEL_FILE.exists():
    raise FileExistsError(
        f"Model already exists: {MODEL_FILE}\n"
        "Rename the output path in this script before training again."
    )

MODEL_DIR.mkdir(parents=True, exist_ok=True)

# 2. Load the daily airport dataset
df = pd.read_csv(DATA_FILE)

df["FLIGHT_DATE"] = pd.to_datetime(
    df["FLIGHT_DATE"], errors="coerce"
)
df["AVG_ARRIVAL_DELAY"] = pd.to_numeric(
    df["AVG_ARRIVAL_DELAY"], errors="coerce"
)
df = df.dropna(
    subset=["FLIGHT_DATE", "ORIGIN_AIRPORT", "AVG_ARRIVAL_DELAY"]
)

# 3. Select the airport with the most observed days
coverage = df.groupby("ORIGIN_AIRPORT")["FLIGHT_DATE"].nunique()
airport = coverage.idxmax()

airport_df = df[df["ORIGIN_AIRPORT"] == airport].copy()
airport_df = airport_df.groupby("FLIGHT_DATE")[
    "AVG_ARRIVAL_DELAY"
].mean().sort_index()

print(f"Selected airport: {airport}")
print(f"Observed days: {len(airport_df)}")

if len(airport_df) < 60:
    raise ValueError(
        "Not enough observed days for this experiment."
    )

# 4. Create a daily series.
# Missing dates are interpolated for this initial experiment.
# This is an assumption, because no flight that day does not
# necessarily mean the airport had zero delay.
all_dates = pd.date_range(
    start=airport_df.index.min(),
    end=airport_df.index.max(),
    freq="D",
)
series = airport_df.reindex(all_dates)
series = series.interpolate(method="time", limit_direction="both")

values = series.to_numpy(dtype=np.float32)

# 5. Split chronologically: first 80% for training
split_point = int(len(values) * 0.8)

if split_point <= LOOKBACK or split_point >= len(values):
    raise ValueError("Not enough data for train/test split.")

# Fit normalization using training period only
train_mean = float(values[:split_point].mean())
train_std = float(values[:split_point].std())

if train_std < 1e-6:
    train_std = 1.0

scaled = (values - train_mean) / train_std

# 6. Build sequences: previous 7 days -> next day's delay
X_train, y_train = [], []
X_test, y_test = [], []

for target_idx in range(LOOKBACK, len(scaled)):
    x = scaled[target_idx - LOOKBACK:target_idx]
    y = scaled[target_idx]

    if target_idx < split_point:
        X_train.append(x)
        y_train.append(y)
    else:
        X_test.append(x)
        y_test.append(y)

X_train = torch.tensor(np.array(X_train), dtype=torch.float32).unsqueeze(-1)
y_train = torch.tensor(np.array(y_train), dtype=torch.float32).unsqueeze(-1)
X_test = torch.tensor(np.array(X_test), dtype=torch.float32).unsqueeze(-1)
y_test = torch.tensor(np.array(y_test), dtype=torch.float32).unsqueeze(-1)

print(f"Training sequences: {len(X_train)}")
print(f"Testing sequences: {len(X_test)}")

train_loader = DataLoader(
    TensorDataset(X_train, y_train),
    batch_size=BATCH_SIZE,
    shuffle=True,
)

# 7. Define a small LSTM model
class DelayLSTM(nn.Module):
    def __init__(self):
        super().__init__()
        self.lstm = nn.LSTM(
            input_size=1,
            hidden_size=HIDDEN_SIZE,
            batch_first=True,
        )
        self.output = nn.Linear(HIDDEN_SIZE, 1)

    def forward(self, x):
        sequence_output, _ = self.lstm(x)
        last_output = sequence_output[:, -1, :]
        return self.output(last_output)


model = DelayLSTM()
loss_function = nn.MSELoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

# 8. Train
for epoch in range(EPOCHS):
    model.train()
    total_loss = 0.0

    for batch_x, batch_y in train_loader:
        optimizer.zero_grad()
        predictions = model(batch_x)
        loss = loss_function(predictions, batch_y)
        loss.backward()
        optimizer.step()
        total_loss += loss.item() * len(batch_x)

    average_loss = total_loss / len(X_train)

    if (epoch + 1) % 5 == 0:
        print(
            f"Epoch {epoch + 1}/{EPOCHS} "
            f"- Training loss: {average_loss:.4f}"
        )

# 9. Evaluate on the later, held-out period
model.eval()
with torch.no_grad():
    scaled_predictions = model(X_test).squeeze(-1).numpy()
    actual_scaled = y_test.squeeze(-1).numpy()

predictions_minutes = scaled_predictions * train_std + train_mean
actual_minutes = actual_scaled * train_std + train_mean

mae = float(np.mean(np.abs(predictions_minutes - actual_minutes)))

print(f"\nTest MAE: {mae:.2f} minutes")

# 10. Save a separate model checkpoint and its preprocessing details
torch.save(
    {
        "model_state_dict": model.state_dict(),
        "hidden_size": HIDDEN_SIZE,
        "lookback": LOOKBACK,
        "airport": str(airport),
        "train_mean": train_mean,
        "train_std": train_std,
        "date_start": str(series.index.min().date()),
        "date_end": str(series.index.max().date()),
        "test_mae_minutes": mae,
    },
    MODEL_FILE,
)

print(f"Model saved to: {MODEL_FILE}")
