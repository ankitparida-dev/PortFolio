const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // ✅ Choose the right URI based on environment
        const isProduction = process.env.NODE_ENV === 'production';
        
        // Use Atlas in production, Local in development
        const uri = isProduction 
            ? process.env.MONGODB_URI_ATLAS || process.env.MONGODB_URI
            : process.env.MONGODB_URI_LOCAL || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';
        
        console.log(`🔄 Connecting to MongoDB in ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'} mode...`);
        console.log(`📡 Using: ${isProduction ? 'MongoDB Atlas (Cloud)' : 'Local MongoDB'}`);
        
        const conn = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            // ✅ Only use family:4 in development (fixes Node.js v24 DNS issue)
            ...(isProduction ? {} : { family: 4 }),
        });
        
        console.log(`✅ MongoDB Connected Successfully! 🎉`);
        console.log(`📁 Database: ${conn.connection.name}`);
        console.log(`🌐 Host: ${conn.connection.host}`);
        console.log(`📊 Connection State: ${conn.connection.readyState === 1 ? 'Connected ✅' : 'Disconnected ❌'}`);
        
        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error(`❌ MongoDB Error: ${err.message}`);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('⚠️ MongoDB Disconnected');
        });
        
        mongoose.connection.on('reconnected', () => {
            console.log('✅ MongoDB Reconnected');
        });
        
        return conn;
    } catch (error) {
        console.error(`❌ MongoDB Connection Failed: ${error.message}`);
        
        if (error.message.includes('ECONNREFUSED')) {
            console.log('\n💡 MongoDB is not running! Start it with:');
            console.log('   Windows: net start MongoDB');
            console.log('   Mac: brew services start mongodb-community');
            console.log('   Ubuntu: sudo systemctl start mongod');
            console.log('\n📥 Or download from: https://www.mongodb.com/try/download/community');
        } else if (error.message.includes('Authentication failed')) {
            console.log('\n💡 Authentication failed. Check your username and password in .env');
        } else if (error.message.includes('getaddrinfo') || error.message.includes('ENOTFOUND')) {
            console.log('\n💡 Network error. Check your internet connection and DNS settings.');
        } else if (error.message.includes('querySrv')) {
            console.log('\n💡 DNS resolution failed. Try:');
            console.log('   1. Flush DNS: ipconfig /flushdns (Windows)');
            console.log('   2. Use Google DNS: 8.8.8.8');
            console.log('   3. Or use Local MongoDB instead');
        }
        
        console.log('\n📋 Your .env file should have:');
        console.log('   MONGODB_URI_LOCAL=mongodb://127.0.0.1:27017/portfolio');
        console.log('   MONGODB_URI_ATLAS=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/portfolio');
        
        // Don't exit - let it retry
        console.log('\n🔄 Retrying connection in 5 seconds...');
        setTimeout(connectDB, 5000);
    }
};

module.exports = connectDB;