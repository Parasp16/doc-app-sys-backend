const { Sequelize } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false, 
    define: {
      timestamps: true
    }
  }
)


async function testConnection() {
  try {
    await sequelize.authenticate()
    console.log("✅ Database Connected successfully")
  } catch (error) {
    console.log("❌ DB Connection Error:", error)
  }
}


async function syncDB({ force = false, alter = false } = {}) {
  try {
    
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ force, alter })
      console.log("✅ Models synced")
    }
  } catch (error) {
    console.log("❌ Error syncing models:", error)
  }
}



module.exports = {
  sequelize,
  testConnection,
  syncDB
}

