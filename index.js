const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan("dev"));

let products = [
  { id: 1, name: "sepatu", stock: 12, price: 200000 },
  { id: 2, name: "sandal", stock: 10, price: 150000 },
  { id: 3, name: "meja", stock: 3, price: 90000 },
];

app.get("/", (req, res) => {
  res.send(products);
});

app.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  let product = products.find((product) => product.id === id);
  res.send(product);
});

app.post("/", (req, res) => {
  const { name, stock, price } = req.body;
  const newProduct = {
    id: products.length + 1,
    name,
    stock,
    price,
  };
  products.push(newProduct);
  res.json({ message: "product created" });
});

app.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = products.findIndex((product) => product.id === id);
  const { name, stock, price } = req.body;
  const updateProduct = {
    id: products[index].id,
    name,
    stock,
    price,
  };
  products[index] = updateProduct;
  res.json({ message: "product updated" });
});

app.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = products.findIndex((product) => product.id === id);
    products.splice(index,1)
    res.json({ message: "product deleted" });
  });

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
