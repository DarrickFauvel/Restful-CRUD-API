require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const app = express()

const productRoute = require("./routes/productRoute")

const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes

app.get("/", (req, res) => {
  res.send("Hello from express")
})

app.get("/blog", (req, res) => {
  res.send("I am a Blog")
})

app.use("/api/products", productRoute)

// Connection

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB")
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
