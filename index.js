import express from "express"

const app = express()

const port = 8000
app.use(express.json()) // Built-in middleware 

let teaData = []
let nextId = 1

// Creating New Tea
app.post('/teas', (req,res) => {
    const {name, price} = req.body
    console.log(req.body);
    
    const newTea = {id: nextId++, name, price}
    teaData.push(newTea)
    res.status(200).send(newTea)
})

// Showing All Tea
app.get('/showteas',(req, res)=> {
    if (!teaData.length) {
        return res.status(404).send("No Tea Found!!!")
    }
    res.status(200).send(teaData)
})

// Getting Tea from Id
app.get('/teas/:id', (req,res) => {
    const tea =  teaData.find(t => req.params.id == t.id ) // Prams is use to take data from url
    if (!tea) {
        return res.status(404).send(`No Tea Found with ID: ${req.params.id}!!!`)
    }
    res.status(200).send(tea)
})

// Updating Tea from Id
app.put('/teas/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const tea =  teaData.find(t => req.params.id == t.id )
    if (!tea) {
        return res.status(404).send(`No Tea Found with ID: ${req.params.id}!!!`)
    }
    const {name, price} = req.body
    tea.name = name
    tea.price = price
    res.status(200).send(tea)
})

// Delete Tea from id

app.delete('/teas/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const index =  teaData.findIndex(t => id == t.id )
    teaData =  teaData.filter(t => id !== t.id )
    if (index === -1) {
        return res.status(404).send(`No Tea Found with ID: ${req.params.id}!!!`)
    }
    res.status(200).send(teaData)
})

app.listen(port, () => {
    console.log('Server is listening');
    
})