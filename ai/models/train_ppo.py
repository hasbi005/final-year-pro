
from pathlib import Path
import sys

from stable_baselines3 import PPO

# Current folder: ai/models
ROOT = Path(__file__).resolve().parent

# Parent folder: ai
AI_FOLDER = ROOT.parent

# Allow Python to find aircraft_env.py inside ai/
sys.path.insert(0, str(AI_FOLDER))

from aircraft_env import AircraftReallocationEnv

# Save model inside ai/models/
MODEL_PATH = ROOT / "aircraft_ppo_kaggle.zip"

env = AircraftReallocationEnv()

model = PPO(
    "MlpPolicy",
    env,
    learning_rate=0.0003,
    n_steps=256,
    batch_size=64,
    gamma=0.99,
    verbose=1,
    seed=42
)

print("Starting PPO training...")

model.learn(total_timesteps=20000)

MODEL_PATH.parent.mkdir(parents=True, exist_ok=True)
model.save(str(MODEL_PATH))

print("PPO training completed!")
print(f"Model saved to: {MODEL_PATH}")

env.close()
