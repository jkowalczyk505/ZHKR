// models/post.js
const db = require("../utils/db");

module.exports = {
  findAll() {
    return db.query(
      "SELECT id, tytul, url, opis, data_utworzenia, zdjecia FROM posty WHERE widocznosc = 1 ORDER BY data_utworzenia DESC"
    );
  },

  findOne(idOrSlug) {
    if (/^\d+$/.test(idOrSlug)) {
      return db.query("SELECT * FROM posty WHERE id = ?", [idOrSlug]);
    } else {
      return db.query("SELECT * FROM posty WHERE url = ?", [idOrSlug]);
    }
  },

  create(data) {
    const { tytul, url, opis, widocznosc = 1 } = data;
    return db.query(
      `INSERT INTO posty (tytul, url, opis, widocznosc)
       VALUES (?, ?, ?, ?)`,
      [tytul, url, opis, widocznosc]
    );
  },

  update(id, fields) {
    const sets = Object.keys(fields)
      .map((k) => `\`${k}\` = ?`)
      .join(", ");
    const vals = Object.values(fields);
    return db.query(`UPDATE posty SET ${sets} WHERE id = ?`, [...vals, id]);
  },

  remove(id) {
    return db.query("DELETE FROM posty WHERE id = ?", [id]);
  },
};
