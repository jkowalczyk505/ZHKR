const Breeding = require("../models/breeding");

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
    if (!rows.length) {
      return res.status(404).json({ message: "Breeding not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.create = async (req, res) => {
  try {
    await Breeding.create(req.body);
    res.status(201).json({ message: "Breeding created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.update = async (req, res) => {
  try {
    const [result] = await Breeding.update(req.params.numer, req.body);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Breeding not found" });
    }
    res.json({ message: "Breeding updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.remove = async (req, res) => {
  try {
    const [result] = await Breeding.remove(req.params.numer);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Breeding not found" });
    }
    res.json({ message: "Breeding deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
