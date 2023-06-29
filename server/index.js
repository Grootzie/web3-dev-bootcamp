const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "ff1fa4f3b034a1e9a9487200ea0adde8da7f34f2": 100,
  "69bc0482f9da2ea85a5ef423bb1074ad0b9d2909": 50,
  "5f4af66038bf1b6c1d2c2aed7ef1af5720464795": 75,
};

const private_keys = {
  "Ox1": 0x10,
  "0x2": 0x20,
  "0x3": 0x30,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
