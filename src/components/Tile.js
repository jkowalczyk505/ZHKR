import { Link } from "react-router-dom";

function Tile({ title, to, icon }) {
  return (
    <Link to={to} className="admin-tile">
      <div className="icon">{icon}</div>
      <h2>{title}</h2>
    </Link>
  );
}

export default Tile;
