const express = require("express")
const mongoose = require("mongoose")

const app = express()
const PORT = 3000

app.get("/", (req, res) => {
  res.send("Hello from express")
})

app.get("/blog", (req, res) => {
  res.send("I am a Blog")
})

mongoose
  .connect(
    "mongodb+srv://darrickdevelops:Xvkm1LWwbYMDTPnf@projects.mmupqab.mongodb.net/learning?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB")
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
