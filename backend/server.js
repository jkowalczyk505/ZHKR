require("dotenv").config();
const express = require("express");
const db = require("./utils/db");

const app = express();

// Test połączenia z bazą przy starcie serwera
async function testDBConnection() {
  try {
    const [rows] = await db.query("SELECT 1");
    console.log("✅ Connected to the database");
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
  }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  testDBConnection(); // wywołujemy test po uruchomieniu serwera
});
