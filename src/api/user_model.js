const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "104.131.48.82",
  database: "NutriMais2",
  password: "postdba",
  port: 5433,
});

const getUsers = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM users", (error, results) => {
      if (error) {
        console.log(error);
        reject(error);
      }
      resolve(results.rows);
    });
  });
};
const createUser = (body) => {
  return new Promise(function (resolve, reject) {
    const { name, cpf } = body;
    pool.query(
      "INSERT INTO users (nameUser, cpfUser) VALUES ($1, $2) RETURNING *",
      [name, cpf],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        }

        resolve(`A new user has been added added: ${results.rows[0]}`);
      }
    );
  });
};
const deleteUser = (request, response) => {
  return new Promise(function (resolve, reject) {
    const id = parseInt(request);
    pool.query(
      "delete from users where idUser = $1",
      [id],
      (error, results) => {
        if (error) {
          console.log(error);
          reject(error);
        }
        resolve(`User deleted with ID: ${id}`);
      }
    );
  });
};

module.exports = {
  getUsers,
  createUser,
  deleteUser,
};
