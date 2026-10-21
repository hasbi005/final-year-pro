
from pathlib import Path

import numpy as np
import pandas as pd
import torch
from torch import nn


# This file is inside project/ai/models/
ROOT = Path(__file__).resolve().parent
PROJECT_ROOT = ROOT.parent.parent

DATA_FILE = (
    PROJECT_ROOT / "data" / "processed" / "daily_airport_delays.csv"
)
MODEL_FILE = ROOT / "delay_lstm_kaggle.pt"


class DelayLSTM(nn.Module):
    def __init__(self, hidden_size):
        super().__init__()
        self.lstm = nn.LSTM(
            input_size=1,
            hidden_size=hidden_size,
            batch_first=True,
        )
        self.output = nn.Linear(hidden_size, 1)

    def forward(self, x):
        sequence_output, _ = self.lstm(x)
        return self.output(sequence_output[:, -1, :])


def predict_delay():
    if not DATA_FILE.exists():
        raise FileNotFoundError(f"Dataset not found: {DATA_FILE}")

    if not MODEL_FILE.exists():
        raise FileNotFoundError(f"Model not found: {MODEL_FILE}")

    checkpoint = torch.load(
        MODEL_FILE,
        map_location="cpu",
        weights_only=True,
    )

    airport = str(checkpoint["airport"])
    mean = float(checkpoint["train_mean"])
    std = float(checkpoint["train_std"])
    lookback = int(checkpoint["lookback"])

    if std == 0:
        raise ValueError("Invalid model checkpoint: training std is zero.")

    df = pd.read_csv(DATA_FILE)
    df["FLIGHT_DATE"] = pd.to_datetime(df["FLIGHT_DATE"])
    df["ORIGIN_AIRPORT"] = df["ORIGIN_AIRPORT"].astype(str)

    df = df[df["ORIGIN_AIRPORT"] == airport]

    if df.empty:
        raise ValueError(f"No historical data found for airport {airport}")

    daily = (
        df.groupby("FLIGHT_DATE")["AVG_ARRIVAL_DELAY"]
        .mean()
        .sort_index()
    )

    all_dates = pd.date_range(
        daily.index.min(),
        daily.index.max(),
        freq="D",
    )

    series = daily.reindex(all_dates).interpolate(
        method="time",
        limit_direction="both",
    )

    if len(series) < lookback:
        raise ValueError(
            f"Need {lookback} days of data; found {len(series)}."
        )

    values = series.to_numpy(dtype=np.float32)[-lookback:]
    scaled = (values - mean) / std

    x = torch.tensor(
        scaled,
        dtype=torch.float32,
    ).reshape(1, lookback, 1)

    model = DelayLSTM(int(checkpoint["hidden_size"]))
    model.load_state_dict(checkpoint["model_state_dict"])
    model.eval()

    with torch.no_grad():
        prediction_scaled = model(x).item()

    prediction_minutes = prediction_scaled * std + mean
    prediction_date = series.index[-1] + pd.Timedelta(days=1)

    return {
        "airport": airport,
        "last_historical_date": str(series.index[-1].date()),
        "prediction_date": str(prediction_date.date()),
        "predicted_delay_minutes": float(prediction_minutes),
    }


if __name__ == "__main__":
    result = predict_delay()

    print("LSTM model loaded successfully!")
    print(f"Airport: {result['airport']}")
    print(f"Last historical date: {result['last_historical_date']}")
    print(f"Prediction date: {result['prediction_date']}")
    print(
        "Predicted arrival delay: "
        f"{result['predicted_delay_minutes']:.2f} minutes"
    )
