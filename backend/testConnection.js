import 'dotenv/config.js';
import mongoose from 'mongoose';

/**
 * Test MongoDB Connection
 * Run: node testConnection.js
 */

const testConnection = async () => {
    try {
        console.log('🔄 Attempting to connect to MongoDB...');
        console.log(`📍 Connection String: ${process.env.MONGODB_URI}`);

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('✅ Successfully connected to MongoDB!');
        console.log(`📊 Database Name: ${mongoose.connection.db.databaseName}`);

        // Get all collections
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log(`\n📋 Collections in database:`);

        if (collections.length === 0) {
            console.log('   (No collections yet - they will be created when you add data)');
        } else {
            collections.forEach((col, index) => {
                console.log(`   ${index + 1}. ${col.name}`);
            });
        }

        // Connection info
        console.log(`\n🔌 Connection Info:`);
        console.log(`   Host: ${mongoose.connection.host}`);
        console.log(`   Port: ${mongoose.connection.port}`);
        console.log(`   Database: ${mongoose.connection.name}`);

        await mongoose.disconnect();
        console.log('\n✅ Connection test completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Connection Error:', error.message);
        console.log('\n⚠️  Make sure MongoDB is running!');
        console.log('   For Windows:');
        console.log('   - If installed: Run "mongod" in PowerShell');
        console.log('   - Or use Docker: docker run -d -p 27017:27017 --name mongodb mongo');
        process.exit(1);
    }
};

testConnection();
