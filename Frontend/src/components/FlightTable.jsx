import { ArrowRight, Clock } from "lucide-react";

function FlightTable({ flights = [] }) {
  return (
    <div className="table-card">

      <div className="table-header">
        <div>
          <h2>Today's Flight Schedule</h2>
          <p>Current operational flight activity</p>
        </div>

        <button className="view-button">
          View all
          <ArrowRight size={15} />
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Flight</th>
              <th>Route</th>
              <th>Departure</th>
              <th>Aircraft</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {flights.map((flight) => (
              <tr key={flight.id}>

                <td>
                  <div className="flight-number">
                    <strong>{flight.flight}</strong>
                    <span>{flight.airline}</span>
                  </div>
                </td>

                <td>
                  <div className="route">
                    <strong>{flight.from}</strong>

                    <ArrowRight size={14} />

                    <strong>{flight.to}</strong>
                  </div>
                </td>

                <td>
                  <div className="departure">
                    <Clock size={14} />
                    {flight.time}
                  </div>
                </td>

                <td>{flight.aircraft}</td>

                <td>
                  <span
                    className={`status-badge ${flight.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {flight.status}
                  </span>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FlightTable;