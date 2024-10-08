const mongoose = require("mongoose");

let isConnected; // Variable pour vérifier si la connexion est active

const connectToDatabase = async () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    mongoose.set('strictQuery', true);

    // Vérifiez si la connexion est déjà active
    if (isConnected) {
        console.log("Déjà connecté à la base de données.");
        return;
    }

    try {
        await mongoose.connect(process.env.DB, connectionParams);
        isConnected = true; // Mettez à jour la variable d'état
        console.log("Connected to database successfully");
    } catch (error) {
        console.error("Could not connect to database!", error);
    }
};

const disconnectFromDatabase = async () => {
    if (isConnected) {
        await mongoose.connection.close();
        isConnected = false; // Mettez à jour l'état de connexion
        console.log("Disconnected from database");
    }
};

module.exports = { connectToDatabase, disconnectFromDatabase };
