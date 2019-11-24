const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database-mysql');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/api/pokemon', (req, res) => {
  db.getAllPokemon((err, data) => {
    if (err) {
      res.status(404).send("Cant get data from database")
    } else {
      res.status(200).send(data)
    }
  })
  //TODO - your code here!
});

app.put('/api/updatePokemon/:id', (req, res) => {
  db.updatePokemon(req, (err, data) => {
    if (err) {
      res.status(404).send("Cant change the name!!!")
    } else {
      res.status(200).send("Successfully updated the name!!!")
    }
  })
})

app.delete('/api/deletePokemon/:id', (req, res) => {
  db.deletePokemon(req, (err, data) => {
    if (err) {
      res.status(404).send('Cant delete the Pokemon!!!')
    } else {
      res.status(200).send("Bye Pokemon!!")
    }
  })
})

app.get('/api/pokemonType', (req, res) => {
  db.getByType((err, data) => {
    if (err) {
      res.status(404).send('Cant get the Types!!')
    } else {
      res.status(200).send(data)
    }
  })
})

app.get('/api/pokemonByType/:id', (req, res) => {
  db.pokemonByType(req, (err, data) => {
    if (err) {
      res.status(404).send("Cant get the pokes by types!!!")
    } else {
      res.status(200).send(data)
    }
  })
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
