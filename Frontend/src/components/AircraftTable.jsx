import { CheckCircle2, Clock3, Wrench } from "lucide-react";

function AircraftTable({ aircraft }) {
  const getIcon = (status) => {
    if (status === "Available")
      return <CheckCircle2 size={15} />;

    if (status === "In Flight")
      return <Clock3 size={15} />;

    return <Wrench size={15} />;
  };

  return (
    <div className="table-card">

      <div className="table-header">
        <div>
          <h2>Aircraft Availability</h2>
          <p>Current fleet utilization</p>
        </div>
      </div>

      <div className="aircraft-list">

        {aircraft.map((item) => (
          <div
            className="aircraft-row"
            key={item.id}
          >

            <div className="aircraft-main">

              <div className="aircraft-icon">
                ✈
              </div>

              <div>
                <strong>{item.registration}</strong>
                <span>{item.model}</span>
              </div>

            </div>

            <div className="aircraft-location">
              <small>Location</small>
              <strong>{item.location}</strong>
            </div>

            <div
              className={`aircraft-status ${item.status
                .toLowerCase()
                .replace(" ", "-")}`}
            >
              {getIcon(item.status)}
              {item.status}
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default AircraftTable;