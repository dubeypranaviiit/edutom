function handlePrintInvoice(orderId) {
  const content = document.getElementById(`print-invoice-${orderId}`);
  if (!content) return;

  const printWindow = window.open('', '', 'height=800,width=1000');
  if (!printWindow) return;

  // Use innerHTML to inject content safely
  const doc = printWindow.document;

  const style = `
    <style>
      body { font-family: sans-serif; padding: 20px; }
      h1, h2, p, table { margin-bottom: 10px; }
      table { width: 100%; border-collapse: collapse; }
      th, td { border: 1px solid #ccc; padding: 8px; }
    </style>
  `;

  doc.head.innerHTML = `<title>Invoice</title>${style}`;
  doc.body.innerHTML = content.innerHTML;

  printWindow.focus();

  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 500);
}

export default handlePrintInvoice;