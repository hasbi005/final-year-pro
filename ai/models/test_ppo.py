
from pathlib import Path
import sys

import numpy as np
from stable_baselines3 import PPO

ROOT = Path(__file__).resolve().parent
AI_FOLDER = ROOT.parent

sys.path.insert(0, str(AI_FOLDER))

from aircraft_env import AircraftReallocationEnv

MODEL_PATH = ROOT / "aircraft_ppo_kaggle.zip"

env = AircraftReallocationEnv()
model = PPO.load(str(MODEL_PATH))

obs, info = env.reset(seed=42)

action, _states = model.predict(obs, deterministic=True)

obs, reward, terminated, truncated, info = env.step(int(action))

print("Selected aircraft:", f"AIR{int(action) + 1:02d}")
print("Reward:", reward)
print("Eligible:", bool(np.all(env.aircraft[int(action)] == 1)))

env.close()
