const mongoose = require('mongoose');

const DATABASE_URI = process.env.DATABASE_URI || 'mongodb+srv://gainmode46:XnjDxAwNf6Gx3Reo@cluster0.2zketsh.mongodb.net/gain?retryWrites=true&w=majority&appName=Cluster0';

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    await mongoose.connect(DATABASE_URI);
    console.log('✅ MongoDB connected successfully!');
    
    // Test a simple query
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📊 Available collections:', collections.map(c => c.name));
    
    await mongoose.disconnect();
    console.log('✅ Connection test completed');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
  }
}

testConnection();