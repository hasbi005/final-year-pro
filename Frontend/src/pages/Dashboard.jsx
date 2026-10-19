import {
  Plane,
  AlertTriangle,
  RefreshCw,
  Users,
  ArrowUpRight,
  Activity,
} from "lucide-react";

import DelayCard from "../components/DelayCard";
import FlightTable from "../components/FlightTable";
import AircraftTable from "../components/AircraftTable";

function Dashboard() {

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
  ];

  const aircraft = [
    {
      id: 1,
      registration: "VT-ANQ",
      model: "Airbus A320",
      location: "Chennai",
      status: "Available",
    },
    {
      id: 2,
      registration: "VT-EXL",
      model: "Airbus A321",
      location: "Mumbai",
      status: "In Flight",
    },
    {
      id: 3,
      registration: "VT-SXA",
      model: "Boeing 737",
      location: "Delhi",
      status: "Available",
    },
  ];

  return (
    <div>

      {/* Welcome section */}

      <section className="dashboard-heading">

        <div>
          <p className="eyebrow">
            AIRLINE OPERATIONS CENTER
          </p>

          <h2>
            Good evening, Operations Team
          </h2>

          <p>
            Monitor your fleet, manage disruptions and
            optimize aircraft allocation.
          </p>
        </div>

        <div className="system-live">
          <span></span>
          Live system
        </div>

      </section>


      {/* Statistics */}

      <section className="stats-grid">

        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-icon blue">
              <Plane size={20} />
            </div>

            <span className="stat-change">
              +8.2%
            </span>
          </div>

          <span className="stat-label">
            Active Flights
          </span>

          <strong className="stat-number">
            42
          </strong>

          <span className="stat-description">
            36 on schedule
          </span>
        </div>


        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-icon purple">
              <Activity size={20} />
            </div>

            <span className="stat-change">
              92%
            </span>
          </div>

          <span className="stat-label">
            Fleet Utilization
          </span>

          <strong className="stat-number">
            78%
          </strong>

          <span className="stat-description">
            3 aircraft available
          </span>
        </div>


        <div className="stat-card warning-card">
          <div className="stat-card-header">
            <div className="stat-icon orange">
              <AlertTriangle size={20} />
            </div>

            <span className="stat-warning">
              Attention
            </span>
          </div>

          <span className="stat-label">
            Active Disruptions
          </span>

          <strong className="stat-number">
            04
          </strong>

          <span className="stat-description">
            2 require action
          </span>
        </div>


        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-icon green">
              <RefreshCw size={20} />
            </div>

            <span className="stat-change">
              Optimal
            </span>
          </div>

          <span className="stat-label">
            Reallocations
          </span>

          <strong className="stat-number">
            07
          </strong>

          <span className="stat-description">
            Automatically optimized
          </span>
        </div>

      </section>


      {/* Delay cards */}

      <section className="delay-grid">

        <DelayCard
          title="Average Delay"
          value="18 min"
          description="Across today's flights"
          trend="12%"
          positive={true}
        />

        <DelayCard
          title="Predicted Delay"
          value="11 min"
          description="LSTM prediction"
          trend="6%"
          positive={true}
        />

        <div className="prediction-card">

          <div className="prediction-header">
            <div>
              <span className="prediction-label">
                AI OPTIMIZATION
              </span>

              <h3>
                PPO Recommendation
              </h3>
            </div>

            <div className="prediction-icon">
              <RefreshCw size={20} />
            </div>
          </div>

          <p>
            Aircraft VT-ANQ is the best available
            resource for flight 6E 421.
          </p>

          <button className="recommendation-button">
            Review recommendation
            <ArrowUpRight size={16} />
          </button>

        </div>

      </section>


      {/* Main content */}

      <section className="dashboard-columns">

        <FlightTable flights={flights} />

        <AircraftTable aircraft={aircraft} />

      </section>


      {/* Bottom insight */}

      <section className="insight-banner">

        <div className="insight-icon">
          <Users size={21} />
        </div>

        <div>
          <strong>
            Passenger impact minimized
          </strong>

          <p>
            Today's optimization prevented an estimated
            126 passenger disruptions through intelligent
            aircraft reassignment.
          </p>
        </div>

      </section>

    </div>
  );
}

export default Dashboard;