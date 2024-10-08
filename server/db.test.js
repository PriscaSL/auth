const mongoose = require('mongoose');
const connectToDatabase = require('./db'); // Importez votre fonction de connexion à MongoDB
const dotenv = require('dotenv');

// Charger les variables d'environnement depuis .env.test
dotenv.config({ path: '.env.test' });

describe('MongoDB Connectivity', () => {
  // Nettoyer l'état de la base de données avant chaque test si nécessaire
  beforeAll(async () => {
    // Vous pouvez configurer des choses avant les tests ici si nécessaire
  });

  afterAll(async () => {
    // Fermez la connexion MongoDB après les tests
    await mongoose.connection.close();
  });

  it('should connect to the database successfully', async () => {
    await connectToDatabase(); // Appel à votre fonction de connexion MongoDB
    expect(mongoose.connection.readyState).toBe(1); // 1 signifie que MongoDB est connecté
  });

  it('should fail to connect to the database with invalid URI', async () => {
    const invalidUri = 'mongodb://invalidUri';
    
    // Vous pouvez modifier temporairement la variable d'environnement pour un test d'échec
    process.env.DB = invalidUri;
    
    try {
      await connectToDatabase();
    } catch (error) {
      expect(mongoose.connection.readyState).toBe(0); // 0 signifie que MongoDB n'est pas connecté
    }
  });
});
