const mysql = require("mysql");
const mysqlConfig = require("./config.js");

const connection = mysql.createConnection(mysqlConfig);

const getAllPokemon = function (callback) {
  // TODO - your code here!
  connection.query("select pokemon.id, pokemon.name, types.name as typeName, pokemon.image_url from pokemon left outer join types on pokemon.type_id=types.id;", (err, data) => {
    if (err) {
      callback(err)
    } else {
      callback(null, data)
    }
  })
};

const updatePokemon = (req, callback) => {
  console.log('now im hangler', req.body)
  console.log('i am id', req.params.id)
  connection.query(`UPDATE pokemon SET name ="${req.body.name}" WHERE id="${req.params.id}";`, (err, data) => {
    if (err) {
      callback(err)
    } else {
      callback(null, data)
    }
  })
}

const deletePokemon = (req, callback) => {
  connection.query(`DELETE FROM pokemon WHERE id="${req.params.id}";`, (err, data) => {
    if (err) {
      callback(err)
    } else {
      callback(null, data)
    }
  })
}

const getByType = (callback) => {
  connection.query(`SELECT * FROM types;`, (err, data) => {
    if (err) {
      callback(err)
    } else {
      callback(null, data)
    }
  })
}

const pokemonByType = (req, callback) => {
  connection.query(`SELECT * from pokemon where pokemon.type_id="${req.params.id}";`, (err, data) => {
    if (err) {
      callback(err)
    } else {
      callback(null, data)
    }
  })
}

module.exports = {
  getAllPokemon,
  updatePokemon,
  deletePokemon,
  getByType,
  pokemonByType
};
