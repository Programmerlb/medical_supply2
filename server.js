const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./dbConfig');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Customers Endpoints
app.get('/customers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM customers');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/customers', async (req, res) => {
  try {
    const { name, address, contact } = req.body;
    const result = await pool.query(
      'INSERT INTO customers (name, address, contact) VALUES ($1, $2, $3) RETURNING *',
      [name, address, contact]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Items Endpoints
app.get('/items', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM items');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/items', async (req, res) => {
  try {
    const { name, description } = req.body;
    const result = await pool.query(
      'INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Sales Endpoints
app.get('/sales', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM sales');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/sales', async (req, res) => {
  try {
    const { customer_id, item_id, sale_date, quantity, price_per_unit } = req.body;
    const result = await pool.query(
      'INSERT INTO sales (customer_id, item_id, sale_date, quantity, price_per_unit) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [customer_id, item_id, sale_date, quantity, price_per_unit]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
