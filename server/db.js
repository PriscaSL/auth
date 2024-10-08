const mongoose = require("mongoose");

let isConnected;

const connectToDatabase = async () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log("Déjà connecté à la base de données.");
        return;
    }

    try {
        console.log("Tentative de connexion à la base de données...");
        await mongoose.connect(process.env.DB, connectionParams);
        isConnected = true;
        console.log("Connecté à la base de données avec succès");
    } catch (error) {
        console.error("Erreur lors de la connexion à la base de données!", error);
    }
};

const disconnectFromDatabase = async () => {
    if (isConnected) {
        await mongoose.connection.close();
        isConnected = false;
        console.log("Déconnecté de la base de données");
    }
};

module.exports = { connectToDatabase, disconnectFromDatabase };
