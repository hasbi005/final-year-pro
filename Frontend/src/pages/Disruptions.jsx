import {
  AlertTriangle,
  Clock,
  Plane,
  ArrowRight,
} from "lucide-react";

function Disruptions() {

  const disruptions = [
    {
      flight: "6E 421",
      route: "MAA → BOM",
      issue: "Aircraft unavailable",
      delay: "32 min",
      severity: "High",
    },
    {
      flight: "AI 672",
      route: "BOM → DEL",
      issue: "Late incoming aircraft",
      delay: "18 min",
      severity: "Medium",
    },
    {
      flight: "SG 102",
      route: "DEL → MAA",
      issue: "Weather conditions",
      delay: "12 min",
      severity: "Low",
    },
  ];

  return (
    <div className="page-section">

      <div className="page-intro">
        <div>
          <p className="eyebrow">
            EXCEPTION MANAGEMENT
          </p>

          <h2>Flight Disruptions</h2>

          <p>
            Identify operational problems that may
            require aircraft reallocation.
          </p>
        </div>
      </div>


      <div className="disruption-list">

        {disruptions.map((item, index) => (

          <div className="disruption-card" key={index}>

            <div className="disruption-icon">
              <AlertTriangle size={21} />
            </div>

            <div className="disruption-main">

              <div className="disruption-title">

                <strong>{item.flight}</strong>

                <span className={`severity ${item.severity.toLowerCase()}`}>
                  {item.severity}
                </span>

              </div>

              <div className="disruption-route">
                <Plane size={14} />
                {item.route}
              </div>

              <p>{item.issue}</p>

            </div>

            <div className="disruption-delay">

              <Clock size={15} />

              <strong>
                {item.delay}
              </strong>

              <span>
                estimated delay
              </span>

            </div>

            <button className="outline-button">
              Find aircraft
              <ArrowRight size={15} />
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Disruptions;