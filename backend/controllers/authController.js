const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_LOGIN &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1 godzina = 3600000 ms
    });

    return res.json({ success: true });
  }

  res.status(401).json({ message: "Nieprawidłowe dane logowania" });
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ success: true });
};

exports.me = (req, res) => {
  // req.user zostało ustawione przez authMiddleware
  res.json({ user: req.user });
};
