require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);


// Route par défaut pour GET /
app.get('/', (req, res) => {
    res.status(200).send('Hello, world!');
  });

// Si nous ne sommes pas en mode test, démarrer le serveur
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

// Exporter l'application pour les tests
module.exports = app;



