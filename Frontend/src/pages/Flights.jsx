import FlightTable from "../components/FlightTable";

function Flights() {

  const flights = [
    {
      id: 1,
      flight: "AI 984",
      airline: "Air India",
      from: "DXB",
      to: "MAA",
      time: "10:30",
      aircraft: "A320",
      status: "On Time",
    },
    {
      id: 2,
      flight: "6E 421",
      airline: "IndiGo",
      from: "MAA",
      to: "BOM",
      time: "12:45",
      aircraft: "A321",
      status: "Delayed",
    },
    {
      id: 3,
      flight: "EK 542",
      airline: "Emirates",
      from: "DXB",
      to: "COK",
      time: "14:10",
      aircraft: "B777",
      status: "On Time",
    },
    {
      id: 4,
      flight: "SG 102",
      airline: "SpiceJet",
      from: "DEL",
      to: "MAA",
      time: "16:25",
      aircraft: "B737",
      status: "Boarding",
    },
    {
      id: 5,
      flight: "AI 672",
      airline: "Air India",
      from: "BOM",
      to: "DEL",
      time: "18:20",
      aircraft: "A320",
      status: "On Time",
    },
  ];

  return (
    <div className="page-section">

      <div className="page-intro">
        <div>
          <p className="eyebrow">
            FLIGHT OPERATIONS
          </p>

          <h2>Flight Schedule</h2>

          <p>
            Monitor scheduled and active flights across
            the network.
          </p>
        </div>

        <button className="primary-button">
          + Add Flight
        </button>
      </div>

      <FlightTable flights={flights} />

    </div>
  );
}

export default Flights;