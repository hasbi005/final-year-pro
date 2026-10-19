import { Plane, MapPin, Wrench } from "lucide-react";

function Aircraft() {

  const aircraft = [
    {
      registration: "VT-ANQ",
      model: "Airbus A320-200",
      location: "Chennai",
      status: "Available",
      utilization: 72,
    },
    {
      registration: "VT-EXL",
      model: "Airbus A321neo",
      location: "Mumbai",
      status: "In Flight",
      utilization: 91,
    },
    {
      registration: "VT-SXA",
      model: "Boeing 737-800",
      location: "Delhi",
      status: "Available",
      utilization: 64,
    },
    {
      registration: "VT-RKM",
      model: "Airbus A320",
      location: "Dubai",
      status: "Maintenance",
      utilization: 48,
    },
  ];

  return (
    <div className="page-section">

      <div className="page-intro">
        <div>
          <p className="eyebrow">
            FLEET MANAGEMENT
          </p>

          <h2>Aircraft Fleet</h2>

          <p>
            View aircraft availability, location and
            utilization.
          </p>
        </div>
      </div>


      <div className="aircraft-grid">

        {aircraft.map((item) => (

          <div className="aircraft-card" key={item.registration}>

            <div className="aircraft-card-top">

              <div className="large-aircraft-icon">
                <Plane size={25} />
              </div>

              <span
                className={`status-badge ${item.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {item.status}
              </span>

            </div>

            <h3>{item.registration}</h3>

            <p>{item.model}</p>

            <div className="location-row">
              <MapPin size={15} />
              {item.location}
            </div>

            <div className="utilization-section">

              <div className="utilization-header">
                <span>Utilization</span>
                <strong>{item.utilization}%</strong>
              </div>

              <div className="progress-bar">
                <div
                  style={{
                    width: `${item.utilization}%`,
                  }}
                ></div>
              </div>

            </div>

            {item.status === "Maintenance" && (
              <div className="maintenance-note">
                <Wrench size={14} />
                Maintenance required
              </div>
            )}

          </div>

        ))}

      </div>

    </div>
  );
}

export default Aircraft;