const express = require("express")
const mongoose = require("mongoose")
const Product = require("./models/productModel")

const app = express()
const PORT = 3000

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello from express")
})

app.get("/blog", (req, res) => {
  res.send("I am a Blog")
})

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json(products)
  } catch (erro) {
    res.status(500).json({ message: error.message })
  }
})

app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findById(id)
    res.status(200).json(product)
  } catch (erro) {
    res.status(500).json({ message: error.message })
  }
})

app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(200).json(product)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message })
  }
})

app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findByIdAndUpdate(id, req.body)
    if (!product) {
      return res
        .status(404)
        .json({ message: `Cannot find any product with ID ${id}` })
    }
    const updatedProduct = await Product.findById(id)
    res.status(200).json(updatedProduct)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findByIdAndDelete(id)
    if (!product) {
      return res
        .status(404)
        .json({ message: `Cannot find any product with ID ${id}` })
    }
    res.status(200).json({ message: `Deleted product with ID ${id}` })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
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
