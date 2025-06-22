import { Link } from "react-router-dom";

function Tile({ title, to, icon, onClick, className }) {
  return (
    <Link to={to} className={`admin-tile ${className}`} onClick={onClick}>
      <div className="icon">{icon}</div>
      <h2>{title}</h2>
    </Link>
  );
}

export default Tile;
