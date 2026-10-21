
from pathlib import Path
import pandas as pd

ROOT = Path(__file__).resolve().parent
INPUT_FILE = ROOT / "data" / "flights.csv"
OUTPUT_DIR = ROOT / "data" / "processed"
OUTPUT_FILE = OUTPUT_DIR / "flights_clean.csv"

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

columns = [
    "YEAR",
    "MONTH",
    "DAY",
    "AIRLINE",
    "ORIGIN_AIRPORT",
    "DESTINATION_AIRPORT",
    "ARRIVAL_DELAY",
    "CANCELLED",
    "DIVERTED",
]

if not INPUT_FILE.exists():
    raise FileNotFoundError(f"Missing dataset: {INPUT_FILE}")

total_rows = 0
first_chunk = True

for chunk in pd.read_csv(
    INPUT_FILE,
    usecols=columns,
    chunksize=100_000,
):
    chunk["ARRIVAL_DELAY"] = pd.to_numeric(
        chunk["ARRIVAL_DELAY"], errors="coerce"
    )

    chunk = chunk.dropna(
        subset=[
            "YEAR",
            "MONTH",
            "DAY",
            "AIRLINE",
            "ORIGIN_AIRPORT",
            "DESTINATION_AIRPORT",
            "ARRIVAL_DELAY",
        ]
    )

    chunk = chunk[
        (chunk["CANCELLED"] == 0)
        & (chunk["DIVERTED"] == 0)
    ]

    chunk["FLIGHT_DATE"] = pd.to_datetime(
        {
            "year": chunk["YEAR"],
            "month": chunk["MONTH"],
            "day": chunk["DAY"],
        },
        errors="coerce",
    )

    chunk = chunk.dropna(subset=["FLIGHT_DATE"])

    chunk.to_csv(
        OUTPUT_FILE,
        mode="w" if first_chunk else "a",
        header=first_chunk,
        index=False,
    )

    first_chunk = False
    total_rows += len(chunk)
    print(f"Cleaned rows so far: {total_rows:,}")

print("\nDataset preparation complete!")
print(f"Total cleaned rows: {total_rows:,}")
print(f"Saved to: {OUTPUT_FILE}")
