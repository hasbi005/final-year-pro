
from pathlib import Path
import pandas as pd

data_folder = Path("data")
csv_files = list(data_folder.glob("*.csv"))

if not csv_files:
    print("No CSV files found in the data folder.")
else:
    for file in csv_files:
        print(f"\nFile: {file.name}")
        print(f"Size: {file.stat().st_size / (1024 * 1024):.2f} MB")

        try:
            df = pd.read_csv(file, nrows=5)

            print("\nColumn names:")
            print(df.columns.tolist())

            print("\nFirst 5 rows:")
            print(df.to_string(index=False))

        except Exception as error:
            print(f"Could not read file: {error}")
