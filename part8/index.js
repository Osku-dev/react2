const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

morgan.token('person', (request, response) => {
  if (request.method === "POST") 
  return JSON.stringify(request.body)
})



app.use(morgan('tiny'))
app.use(morgan(':person'))



let persons =  [
    {
      "name": "fsafasf",
      "id": 5676112,
      "number": "5235252"
    },
    {
      "name": "jjdjdj",
      "id": 9839179,
      "number": "62626"
    },
    {
      "name": "test",
      "id": 412412,
      "number": "566246"
    }
  ]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.get('/info', (req, res) => {
    res.send(`Phonebook has info for ${persons.length} people <br></br>${new Date()}` )
  })

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  const generateId = () => {
   const id = Math.floor(Math.random() * 9999999)
    return id;
  }

  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }

    if (persons.some((e) => e.name === body.name)) {
      return response.status(400).json({ 
        error: 'name must be unique' 
      })
    }
  
  
    const person = {
      name: body.name,
      id: generateId(),
      number: body.number
    }
  
    persons = persons.concat(person)
  
    response.json(person)
    
  
  })

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})