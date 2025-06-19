const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Brak autoryzacji" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Odśwież token jeśli zostało mniej niż 6h ważności
    const now = Math.floor(Date.now() / 1000);
    const timeLeft = decoded.exp - now;

    if (timeLeft < 5 * 60) {
      // mniej niż 15 minut
      const newToken = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // NIE używamy HTTPS lokalnie
        sameSite: "lax", // "lax" działa z przekierowaniami i formularzami
        maxAge: 60 * 60 * 1000, // 1 godzina
      });
    }

    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Nieprawidłowy token" });
  }
};
