require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");
const breedingRoutes = require("./routes/breedingRoutes");

const app = express();
app.use(express.json());
app.use(cookieParser());

// statyczne pliki (zdjęcia)
app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/hodowle", breedingRoutes);
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server działa na porcie ${PORT}`);
});
