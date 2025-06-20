import React from "react";
import { FaHouseUser } from "react-icons/fa";
import { IoNewspaperOutline } from "react-icons/io5";

import Tile from "../components/Tile";

function AdminPage() {
  return (
    <div className="admin-page page">
      <div className="content">
        <h1 className="with-line">Panel administratora</h1>
        <p className="admin-description">
          Witaj w panelu administracyjnym. Wybierz sekcję, którą chcesz
          edytować:
        </p>
        <div className="tiles-container">
          <Tile
            title="Hodowle"
            to="/admin/breedings"
            icon={<FaHouseUser size={40} />}
          />
          <Tile
            title="Aktualności"
            to="/admin/posts"
            icon={<IoNewspaperOutline size={40} />}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
