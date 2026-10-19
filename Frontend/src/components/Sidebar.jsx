import {
  LayoutDashboard,
  Plane,
  PlaneTakeoff,
  AlertTriangle,
  RefreshCw,
  Settings,
  ChevronLeft,
} from "lucide-react";

function Sidebar({ activePage, setActivePage }) {
  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Flights",
      icon: PlaneTakeoff,
    },
    {
      name: "Aircraft",
      icon: Plane,
    },
    {
      name: "Disruptions",
      icon: AlertTriangle,
    },
    {
      name: "Reallocation",
      icon: RefreshCw,
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <Plane size={22} />
        </div>

        <div>
          <h2>AirOps</h2>
          <span>Resource Control</span>
        </div>
      </div>

      <div className="sidebar-section-title">
        OPERATIONS
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              className={`sidebar-item ${
                activePage === item.name ? "active" : ""
              }`}
              onClick={() => setActivePage(item.name)}
            >
              <Icon size={19} />
              <span>{item.name}</span>

              {item.name === "Disruptions" && (
                <span className="notification-dot"></span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <button className="sidebar-item">
          <Settings size={19} />
          <span>Settings</span>
        </button>

        <div className="system-status">
          <div className="status-indicator"></div>

          <div>
            <strong>System Online</strong>
            <small>All services operational</small>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;