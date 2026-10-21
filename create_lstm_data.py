
from pathlib import Path
import pandas as pd

ROOT = Path(__file__).resolve().parent
INPUT_FILE = ROOT / "data" / "processed" / "flights_clean.csv"
OUTPUT_FILE = ROOT / "data" / "processed" / "daily_airport_delays.csv"

if not INPUT_FILE.exists():
    raise FileNotFoundError(f"File not found: {INPUT_FILE}")

# Sum delay and count flights per airport/date in each chunk.
partial_results = []

for chunk in pd.read_csv(
    INPUT_FILE,
    usecols=["FLIGHT_DATE", "ORIGIN_AIRPORT", "ARRIVAL_DELAY"],
    chunksize=200_000,
    dtype={"ORIGIN_AIRPORT": str},
):
    chunk["FLIGHT_DATE"] = pd.to_datetime(
        chunk["FLIGHT_DATE"], errors="coerce"
    )
    chunk["ARRIVAL_DELAY"] = pd.to_numeric(
        chunk["ARRIVAL_DELAY"], errors="coerce"
    )
    chunk = chunk.dropna(
        subset=["FLIGHT_DATE", "ORIGIN_AIRPORT", "ARRIVAL_DELAY"]
    )

    grouped = chunk.groupby(
        ["FLIGHT_DATE", "ORIGIN_AIRPORT"]
    )["ARRIVAL_DELAY"].agg(["sum", "count"]).reset_index()

    partial_results.append(grouped)
    print(f"Processed {len(chunk):,} flight records")

combined = pd.concat(partial_results, ignore_index=True)

daily = (
    combined.groupby(["FLIGHT_DATE", "ORIGIN_AIRPORT"], as_index=False)
    .agg(
        TOTAL_DELAY=("sum", "sum"),
        FLIGHT_COUNT=("count", "sum"),
    )
)

daily["AVG_ARRIVAL_DELAY"] = (
    daily["TOTAL_DELAY"] / daily["FLIGHT_COUNT"]
)

daily = daily.sort_values(["ORIGIN_AIRPORT", "FLIGHT_DATE"])
daily = daily[
    ["FLIGHT_DATE", "ORIGIN_AIRPORT",
     "AVG_ARRIVAL_DELAY", "FLIGHT_COUNT"]
]

daily.to_csv(OUTPUT_FILE, index=False)

print("\nDaily airport dataset created!")
print(f"Records: {len(daily):,}")
print(f"Airports: {daily['ORIGIN_AIRPORT'].nunique()}")
print(f"Date range: {daily['FLIGHT_DATE'].min()} to "
      f"{daily['FLIGHT_DATE'].max()}")
print(f"Saved to: {OUTPUT_FILE}")
print(daily.head(10).to_string(index=False))
