// ✅ Add DNS fix at the VERY TOP
const dns = require('dns');
// Force IPv4 resolution to fix Node.js v24 DNS issues
dns.setDefaultResultOrder('ipv4first');

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        // Connect to MongoDB first
        await connectDB();
        
        // Start server
        const server = app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`🔗 http://localhost:${PORT}`);
            console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`📊 MongoDB: ${process.env.NODE_ENV === 'production' ? 'Atlas (Cloud)' : 'Local'}`);
        });

        // Handle unhandled promise rejections
        process.on('unhandledRejection', (err, promise) => {
            console.log(`❌ Unhandled Rejection: ${err.message}`);
            server.close(() => process.exit(1));
        });

        // Handle graceful shutdown
        process.on('SIGTERM', () => {
            console.log('🛑 SIGTERM received. Shutting down gracefully...');
            server.close(() => {
                console.log('✅ Server closed');
                process.exit(0);
            });
        });

    } catch (error) {
        console.error(`❌ Failed to start server: ${error.message}`);
        console.log('🔄 Restarting in 5 seconds...');
        setTimeout(startServer, 5000);
    }
};

startServer();