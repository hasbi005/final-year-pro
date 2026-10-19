import {
  Plane,
  ArrowRight,
  CheckCircle2,
  BrainCircuit,
  Zap,
} from "lucide-react";

function Reallocation() {

  return (
    <div className="page-section">

      <div className="page-intro">

        <div>
          <p className="eyebrow">
            INTELLIGENT RESOURCE ALLOCATION
          </p>

          <h2>Aircraft Reallocation</h2>

          <p>
            Use AI-assisted recommendations to select
            the most suitable aircraft during disruptions.
          </p>
        </div>

        <div className="ai-status">
          <BrainCircuit size={17} />
          AI Engine Active
        </div>

      </div>


      {/* Problem */}

      <div className="reallocation-problem">

        <div className="problem-header">
          <div>
            <span className="warning-label">
              ACTION REQUIRED
            </span>

            <h3>
              Flight 6E 421 requires an aircraft
            </h3>

            <p>
              Current aircraft is unavailable due to
              an operational disruption.
            </p>
          </div>

          <div className="flight-code">
            6E 421
          </div>
        </div>


        {/* Current route */}

        <div className="route-large">

          <div>
            <span>DEPARTURE</span>
            <strong>MAA</strong>
            <small>Chennai</small>
          </div>

          <ArrowRight size={28} />

          <div>
            <span>ARRIVAL</span>
            <strong>BOM</strong>
            <small>Mumbai</small>
          </div>

        </div>

      </div>


      {/* AI recommendation */}

      <div className="recommendation-section">

        <div className="section-title">

          <div>
            <span className="eyebrow">
              PPO OPTIMIZATION
            </span>

            <h3>
              Recommended Aircraft
            </h3>
          </div>

          <div className="optimization-badge">
            <Zap size={15} />
            Best Match
          </div>

        </div>


        <div className="recommendation-card">

          <div className="recommendation-aircraft">

            <div className="large-aircraft-icon">
              <Plane size={26} />
            </div>

            <div>
              <strong>VT-ANQ</strong>
              <span>Airbus A320-200</span>
            </div>

          </div>


          <div className="recommendation-details">

            <div>
              <span>Current Location</span>
              <strong>Chennai</strong>
            </div>

            <div>
              <span>Available At</span>
              <strong>10:05 AM</strong>
            </div>

            <div>
              <span>Capacity</span>
              <strong>180 seats</strong>
            </div>

            <div>
              <span>AI Score</span>
              <strong className="ai-score">
                94.7%
              </strong>
            </div>

          </div>


          <button className="allocate-button">
            <CheckCircle2 size={17} />
            Allocate Aircraft
          </button>

        </div>

      </div>


      {/* Why this aircraft */}

      <div className="reason-card">

        <BrainCircuit size={22} />

        <div>
          <strong>
            Why was VT-ANQ selected?
          </strong>

          <p>
            The PPO optimization model selected this
            aircraft based on availability, location,
            capacity, turnaround time and predicted
            operational impact.
          </p>
        </div>

      </div>

    </div>
  );
}

export default Reallocation;