
from pathlib import Path
import sys

from stable_baselines3 import PPO

ROOT = Path(__file__).resolve().parent

# Both Python files are inside ai/models.
sys.path.insert(0, str(ROOT))

from aircraft_env import AircraftReallocationEnv
from lstm_predictor import predict_delay


LSTM_MODEL = ROOT / "delay_lstm_kaggle.pt"
PPO_MODEL = ROOT / "aircraft_ppo_kaggle.zip"


if not LSTM_MODEL.exists():
    raise FileNotFoundError(
        f"LSTM model not found: {LSTM_MODEL}"
    )

if not PPO_MODEL.exists():
    raise FileNotFoundError(
        f"PPO model not found: {PPO_MODEL}"
    )


# 1. Get the LSTM prediction.
lstm_result = predict_delay()
predicted_delay = lstm_result["predicted_delay_minutes"]

print("\n--- LSTM Prediction ---")
print("Airport:", lstm_result["airport"])
print("Prediction date:", lstm_result["prediction_date"])
print(f"Predicted delay: {predicted_delay:.2f} minutes")


# 2. Load the existing PPO model.
env = AircraftReallocationEnv()
model = PPO.load(str(PPO_MODEL), env=env)


# 3. Pass the LSTM prediction into the environment.
obs, _ = env.reset(
    seed=42,
    options={
        "predicted_delay_minutes": predicted_delay
    }
)


# 4. Ask PPO to select an aircraft.
action, _ = model.predict(
    obs,
    deterministic=True
)


# 5. Evaluate the selected action.
_, reward, terminated, truncated, info = env.step(
    int(action)
)

print("\n--- PPO Allocation ---")
print(f"Selected aircraft: AIR{int(action) + 1:02d}")
print("Eligible:", info["eligible"])
print(f"Reward: {reward:.2f}")
print(
    "Delay passed into environment:",
    f'{info["predicted_delay_minutes"]:.2f} minutes'
)

env.close()
