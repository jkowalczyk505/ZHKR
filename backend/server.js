require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const breedingRoutes = require("./routes/breedingRoutes");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/hodowle", breedingRoutes);

app.get(
  "/api/secure-data",
  require("./middleware/authMiddleware"),
  (req, res) => {
    res.json({ message: "Dostęp dla admina OK" });
  }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server działa na porcie ${PORT}`);
});
