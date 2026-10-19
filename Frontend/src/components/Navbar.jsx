import {
  Bell,
  Search,
  CalendarDays,
  ChevronDown,
} from "lucide-react";

function Navbar({ activePage }) {
  return (
    <header className="navbar">
      <div className="navbar-title">
        <span>Operations</span>
        <h1>{activePage}</h1>
      </div>

      <div className="navbar-actions">

        <div className="date-display">
          <CalendarDays size={17} />
          <span>19 October 2026</span>
        </div>

        <div className="search-box">
          <Search size={17} />
          <input
            type="text"
            placeholder="Search flights, aircraft..."
          />
        </div>

        <button className="icon-button">
          <Bell size={19} />
          <span className="bell-dot"></span>
        </button>

        <div className="user-profile">
          <div className="avatar">
            OP
          </div>

          <div className="user-info">
            <strong>Operations</strong>
            <span>Administrator</span>
          </div>

          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
}

export default Navbar;