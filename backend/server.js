const express = require("express")
const mainRouter= require('./routes/mainRouter')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser');

app.use(cors())
app.use(express.json())
app.use('/api/v1',mainRouter)


app.listen(3000)