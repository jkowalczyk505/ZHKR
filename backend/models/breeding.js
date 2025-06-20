// models/breeding.js
const db = require("../utils/db");

module.exports = {
  findAll() {
    return db.query("SELECT * FROM hodowle");
  },

  findOne(numer) {
    return db.query("SELECT * FROM hodowle WHERE numer = ?", [numer]);
  },

  create(data) {
    const {
      nazwa,
      numer,
      wlasciciel,
      rasy,
      telefon,
      email,
      miejscowosc,
      wojewodztwo,
      gmina,
      fb,
      ig,
      www,
      zdjecie,
    } = data;
    return db.query(
      `INSERT INTO hodowle
       (nazwa,numer,wlasciciel,rasy,telefon,email,miejscowosc,wojewodztwo,gmina,fb,ig,www,zdjecie)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        nazwa,
        numer,
        wlasciciel,
        rasy,
        telefon,
        email,
        miejscowosc,
        wojewodztwo,
        gmina,
        fb,
        ig,
        www,
        zdjecie,
      ]
    );
  },

  update(numer, fields) {
    const sets = Object.keys(fields)
      .map((k) => `\`${k}\` = ?`)
      .join(",");
    const vals = Object.values(fields);
    return db.query(`UPDATE hodowle SET ${sets} WHERE numer = ?`, [
      ...vals,
      numer,
    ]);
  },

  remove(numer) {
    return db.query("DELETE FROM hodowle WHERE numer = ?", [numer]);
  },
};
