// components/invoice/Invoice.jsx
import React from 'react';

const Invoice = ({ order }) => {
  const orderDate = new Date(order.createdAt).toLocaleDateString();

  return (
    <div id={`invoice-${order._id}`} style={styles.invoice}>
      <h1 style={styles.header}>Invoice</h1>
      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Date:</strong> {orderDate}</p>

      <h2 style={styles.section}>Customer Info</h2>
      <p>{order.address.fullName}</p>
      <p>{order.address.street}, {order.address.city}</p>
      <p>{order.address.state} - {order.address.pincode}</p>
      <p>{order.address.country}</p>
      <p>Phone: {order.address.phone}</p>
      <p>Email: {order.address.email}</p>

      <h2 style={styles.section}>Items</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>Author</th>
            <th style={styles.th}>Qty</th>
            <th style={styles.th}>Price</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, i) => {
            const book = item.book;
            const price = item.priceAtPurchase - (item.priceAtPurchase * item.discountPercentAtPurchase) / 100;

            return (
              <tr key={i}>
                <td style={styles.td}>{book.title}</td>
                <td style={styles.td}>{book.author}</td>
                <td style={styles.td}>{item.quantity}</td>
                <td style={styles.td}>₹{price.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={styles.summary}>
        <p><strong>Total Paid:</strong> ₹{order.totalAmount.toFixed(2)}</p>
      </div>
    </div>
  );
};

const styles = {
  invoice: {
    padding: '24px',
    fontFamily: 'Arial, sans-serif',
    color: '#000',
    backgroundColor: '#fff',
    maxWidth: '800px',
    margin: '0 auto',
    fontSize: '14px',
  },
  header: {
    fontSize: '28px',
    marginBottom: '16px',
  },
  section: {
    marginTop: '24px',
    fontSize: '18px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '12px',
  },
  th: {
    borderBottom: '1px solid #333',
    textAlign: 'left',
    padding: '6px',
  },
  td: {
    borderBottom: '1px solid #ccc',
    padding: '6px',
  },
  summary: {
    marginTop: '24px',
    fontSize: '16px',
    fontWeight: 'bold',
  },
};

export default Invoice;
