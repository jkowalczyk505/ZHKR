// controllers/breedingController.js
const Breeding = require("../models/breeding");
const fs = require("fs-extra");
const path = require("path");

exports.getAll = async (req, res) => {
  try {
    const [rows] = await Breeding.findAll();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getOne = async (req, res) => {
  try {
    const [rows] = await Breeding.findOne(req.params.numer);
    if (!rows.length) return res.status(404).json({ message: "Not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.create = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      // Zapisz ścieżkę zdjęcia
      data.zdjecie = `/uploads/breedings/${req.file.filename}`;
    }

    await Breeding.create(data);
    res.status(201).json({ message: "Created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.update = async (req, res) => {
  try {
    const numer = req.params.numer;
    const [rows] = await Breeding.findOne(numer);

    if (!rows.length) return res.status(404).json({ message: "Not found" });

    const existing = rows[0];
    const data = req.body;

    // 1. Jeśli przesłano nowe zdjęcie – usuń stare, zapisz nowe
    if (req.file) {
      if (existing.zdjecie) {
        const oldPath = path.join(__dirname, "..", "public", existing.zdjecie);
        await fs.remove(oldPath);
      }
      data.zdjecie = `/uploads/breedings/${req.file.filename}`;
    }

    // 2. Jeśli użytkownik chce usunąć zdjęcie (bez nowego) – usuń stare
    if (!req.file && data.zdjecie === null) {
      if (existing.zdjecie) {
        const oldPath = path.join(__dirname, "..", "public", existing.zdjecie);
        await fs.remove(oldPath);
      }
      data.zdjecie = null;
    }

    // 3. Aktualizacja danych w bazie
    const [result] = await Breeding.update(numer, data);
    res.json({ message: "Updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.remove = async (req, res) => {
  try {
    const [rows] = await Breeding.findOne(req.params.numer);
    if (!rows.length) return res.status(404).json({ message: "Not found" });

    const zdjecie = rows[0].zdjecie; // np. /uploads/breedings/abc.jpg
    if (zdjecie) {
      const folder = path.dirname(zdjecie); // /uploads/breedings
      const fileName = path.basename(zdjecie);
      const dir = path.join(__dirname, "..", "public", folder);

      // usuń plik
      await fs.remove(path.join(dir, fileName));
    }

    const [result] = await Breeding.remove(req.params.numer);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
