
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generateInvoice = async (orderId) => {
  const element = document.getElementById(`invoice-${orderId}`);
  if (!element) return;

  const canvas = await html2canvas(element, { scale: 2 });
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF();
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save(`invoice-${orderId}.pdf`);
};
