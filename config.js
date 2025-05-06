module.exports = {
    PORT: process.env.PORT || 3000,
    
    // Database Configurations for Multiple Databases
    DB_CONFIGS: {
      CWIdb: {
        user: 'admin',
        password: 'vms123456',
        server:'vms2025.czyay66ssdpk.eu-north-1.rds.amazonaws.com',//'CWIDEVLAP02/SQLEXPRESS',
        database: 'CWI_db',
        connectionTimeout: 30000, 
        requestTimeout: 30000,  
        options: {
          encrypt: true, // Azure
          trustServerCertificate: true, 
        },
      },
      CWIVMS: {
        user: 'admin',
        password: 'vms123456',
        server: 'vms2025.czyay66ssdpk.eu-north-1.rds.amazonaws.com',
        database: 'QAVMS1',
        options: {
          encrypt: true, // Azure
          trustServerCertificate: true, 
        },
      },
      
      // Add more databases as needed
    },
  };
  