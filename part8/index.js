require('dotenv').config()
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require('./models/person')
const app = express();

app.use(express.static('build'))
app.use(express.json());
app.use(cors());



morgan.token("person", (request, response) => {
  if (request.method === "POST") return JSON.stringify(request.body);
});

app.use(morgan("tiny"));
app.use(morgan(":person"));



app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get("/info", (req, res) => {
  res.send(
    `Phonebook has info for ${persons.length} people <br></br>${new Date()}`
  );
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const generateId = () => {
  const id = Math.floor(Math.random() * 9999999);
  return id;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (body.name === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }



  const person = new Person({
    name: body.name,
    number: body.number 
   
  })
 
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
