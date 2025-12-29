import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg mb-2 transition ${
      isActive
        ? "bg-sky-600 text-white"
        : "text-slate-300 hover:bg-slate-800"
    }`;

  return (
    <aside className="w-64 bg-slate-950 p-4 border-r border-slate-800">
      <h2 className="text-xl font-bold mb-6">🎛 Control Panel</h2>

      <NavLink to="/" className={linkClass}>
        Live Dashboard
      </NavLink>

      <NavLink to="/voice" className={linkClass}>
        Voice Controller
      </NavLink>

      <NavLink to="/video" className={linkClass}>
        Video Controller
      </NavLink>

      <NavLink to="/moderation" className={linkClass}>
        Moderation
      </NavLink>

      <NavLink to="/settings" className={linkClass}>
        Settings
      </NavLink>
    </aside>
  );
}
