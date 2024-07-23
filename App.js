import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [sales, setSales] = useState([]);
  const [newCustomer, setNewCustomer] = useState({ name: '', address: '', contact: '' });
  const [newItem, setNewItem] = useState({ name: '', description: '' });
  const [newSale, setNewSale] = useState({ customer_id: '', item_id: '', sale_date: '', quantity: '', price_per_unit: '' });

  useEffect(() => {
    fetchCustomers();
    fetchItems();
    fetchSales();
  }, []);

  const fetchCustomers = async () => {
    const response = await axios.get('/customers');
    setCustomers(response.data);
  };

  const fetchItems = async () => {
    const response = await axios.get('/items');
    setItems(response.data);
  };

  const fetchSales = async () => {
    const response = await axios.get('/sales');
    setSales(response.data);
  };

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleSaleChange = (e) => {
    const { name, value } = e.target;
    setNewSale({ ...newSale, [name]: value });
  };

  const handleCustomerSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/customers', newCustomer);
    setNewCustomer({ name: '', address: '', contact: '' });
    fetchCustomers();
  };

  const handleItemSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/items', newItem);
    setNewItem({ name: '', description: '' });
    fetchItems();
  };

  const handleSaleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/sales', newSale);
    setNewSale({ customer_id: '', item_id: '', sale_date: '', quantity: '', price_per_unit: '' });
    fetchSales();
  };

  return (
    <div>
      <h1>Medical Supply Management</h1>
      
      <h2>Customers</h2>
      <form onSubmit={handleCustomerSubmit}>
        <input type="text" name="name" value={newCustomer.name} onChange={handleCustomerChange} placeholder="Name" />
        <input type="text" name="address" value={newCustomer.address} onChange={handleCustomerChange} placeholder="Address" />
        <input type="text" name="contact" value={newCustomer.contact} onChange={handleCustomerChange} placeholder="Contact" />
        <button type="submit">Add Customer</button>
      </form>
      <ul>
        {customers.map((customer, index) => (
          <li key={index}>{customer.name} - {customer.address} - {customer.contact}</li>
        ))}
      </ul>

      <h2>Items</h2>
      <form onSubmit={handleItemSubmit}>
        <input type="text" name="name" value={newItem.name} onChange={handleItemChange} placeholder="Name" />
        <input type="text" name="description" value={newItem.description} onChange={handleItemChange} placeholder="Description" />
        <button type="submit">Add Item</button>
      </form>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.name} - {item.description}</li>
        ))}
      </ul>

      <h2>Sales</h2>
      <form onSubmit={handleSaleSubmit}>
        <input type="text" name="customer_id" value={newSale.customer_id} onChange={handleSaleChange} placeholder="Customer ID" />
        <input type="text" name="item_id" value={newSale.item_id} onChange={handleSaleChange} placeholder="Item ID" />
        <input type="date" name="sale_date" value={newSale.sale_date} onChange={handleSaleChange} placeholder="Sale Date" />
        <input type="number" name="quantity" value={newSale.quantity} onChange={handleSaleChange} placeholder="Quantity" />
        <input type="number" name="price_per_unit" value={newSale.price_per_unit} onChange={handleSaleChange} placeholder="Price per Unit" />
        <button type="submit">Add Sale</button>
      </form>
      <ul>
        {sales.map((sale, index) => (
          <li key={index}>Customer ID: {sale.customer_id}, Item ID: {sale.item_id}, Sale Date: {sale.sale_date}, Quantity: {sale.quantity}, Price per Unit: {sale.price_per_unit}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
