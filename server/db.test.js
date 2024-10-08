const mongoose = require('mongoose');
const { connectToDatabase, disconnectFromDatabase } = require('./db'); // Importez vos fonctions de connexion et de déconnexion
const dotenv = require('dotenv');

// Charger les variables d'environnement depuis .env.test
dotenv.config({ path: '.env.test' });

describe('MongoDB Connectivity', () => {
    beforeAll(async () => {
        // Configurez l'URI de connexion valide avant de démarrer les tests
        process.env.DB = 'mongodb://mongo:27017/db'; // Assurez-vous que l'alias est utilisé
        await connectToDatabase(); // Connexion à la base de données
    });

    afterAll(async () => {
        // Fermez la connexion MongoDB après les tests
        await disconnectFromDatabase();
    });

    it('should connect to the database successfully', async () => {
        expect(mongoose.connection.readyState).toBe(1); // 1 signifie que MongoDB est connecté
    });

    it('should fail to connect to the database with invalid URI', async () => {
        const invalidUri = 'mongodb://invalidUri';
        
        // Modifiez temporairement la variable d'environnement pour un test d'échec
        process.env.DB = invalidUri;

        try {
            await connectToDatabase(); // Essayez de vous connecter avec une URI invalide
        } catch (error) {
            // Vérifiez que la connexion échoue
            expect(mongoose.connection.readyState).toBe(0); // 0 signifie que MongoDB n'est pas connecté
        }
    });
});
