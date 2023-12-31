const express = require('express')
const app = express()
const userrouter = require('./router/users')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const port = 5000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(userrouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})