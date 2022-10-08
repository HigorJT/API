
const express = require('express');
const cacaoTrybe = require('./cacaoTrybe');

const app = express();
const port = 3000

app.get('/chocolates', async (req, res) => {
  const chocolates = await cacaoTrybe.getAllChocolates();

  chocolates
    ? res.status(200).json({ chocolates })
    : res.status(500).json({ error: 'Internal Server Error' });
});

app.get('/chocolates/:id', async (req, res) => {
  const { id } = req.params;
  const chocolate = await cacaoTrybe.getChocolateById(Number(id));

  chocolate
    ? res.status(200).json({ chocolate })
    : res.status(404).json({ error: 'Chocolate not Found' });
});

app.get('/chocolates/brand/:brandId', async (req, res) => {
  const { brandId } = req.params;
  const chocolates = await cacaoTrybe.getChocolatesByBrand(Number(brandId));
  res.status(200).json({ chocolates });

  !chocolates.length
    ? res.status(200).json({ chocolates })
    : res.status(404).json({ error: 'Brand not Found' });
});

app.listen(port, () => {
  console.log('Rodando na porta 3000')
})

module.exports = app;

