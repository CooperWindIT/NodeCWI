// dataAccess/sqlDbContext.js (Derived Class)
const DbContext = require('./sqlContext')

class CWIDBContext extends DbContext {
  constructor() {
    super(); // Call the base class constructor
    const flavour = process.env.FLAVOUR;  // Fetch the database name from environment variables
    let dbName;
    if (flavour == 'CWIdb')
      dbName = 'CWIdb';
    else if(flavour == 'CWIVMS')
      dbName = 'CWIVMS';
    else
      dbName = '';
    this.setDatabaseName(dbName);
    this.createPool();
  }
}
const instance = new CWIDBContext(); // ✅ create the instance
module.exports = instance; // ✅ export the instance directly
