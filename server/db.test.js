const mongoose = require('mongoose');
const { connectToDatabase, disconnectFromDatabase } = require('./db');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.test' });

describe('MongoDB Connectivity', () => {
    beforeAll(async () => {
        process.env.DB = 'mongodb://mongo:27017/db';
        await connectToDatabase();
    }, 10000); // Augmenter le délai d'attente à 10 secondes

    afterAll(async () => {
        await disconnectFromDatabase();
    });

    it('should connect to the database successfully', async () => {
        expect(mongoose.connection.readyState).toBe(1);
    }, 10000); // Augmenter le délai d'attente à 10 secondes

    it('should fail to connect to the database with invalid URI', async () => {
        const invalidUri = 'mongodb://invalidUri';
        process.env.DB = invalidUri;

        try {
            await connectToDatabase();
        } catch (error) {
            expect(mongoose.connection.readyState).toBe(0);
        }
    }, 10000); // Augmenter le délai d'attente à 10 secondes
});
