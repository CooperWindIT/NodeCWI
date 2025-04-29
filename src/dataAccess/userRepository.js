// // dataAccess/userRepository.js
// const SqlDbContext = require('../dataContext/RollCallDBContext');

// const fetchAllUsers = async () => {
//   const query = 'SELECT * FROM Users';
//   return await SqlDbContext.executeQuery(query);
// };

// // const insertUser = async (userData) => {
// //   const query = `
// //     INSERT INTO Users (name, email, password)
// //     VALUES (@name, @email, @password)
// //   `;
// //   const params = {
// //     name: userData.name,
// //     email: userData.email,
// //     password: userData.password,
// //   };
// //   return await SqlDbContext.executeInsert(query, params);
// // };

// module.exports = {
//   fetchAllUsers,
// };
