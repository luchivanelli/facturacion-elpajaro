import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../assets/logo.png";
import whatsappLogo from "../assets/whatsapp.png";
import instagramLogo from "../assets/ig.jpg";
import mercadoPagoLogo from "../assets/mercado-pago.jpg"; 

const drawWhatsappBadge = (doc, x, y, size) => {
  doc.addImage(whatsappLogo, "PNG", x, y, size, size);
};

const drawInstagramBadge = (doc, x, y, size) => {
  doc.addImage(instagramLogo, "JPEG", x, y, size, size);
};

const drawMercadoPagoBadge = (doc, x, y, size) => {
  doc.addImage(mercadoPagoLogo, "JPEG", x, y, size, size);
};

const addContactFooter = (doc, y) => {
  const pageHeight = doc.internal.pageSize.getHeight();
  const iconSize = 8;
  let rowY = y;

  // Si no entra en la página actual, salto de página
  if (rowY + iconSize + 6 > pageHeight - 10) {
    doc.addPage();
    rowY = 20;
  }

  const col1X = 14;
  const col2X = 80;
  const col3X = 146;

  // Línea separadora
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.3);
  doc.line(14, rowY - 4, 196, rowY - 4);

  // WhatsApp
  drawWhatsappBadge(doc, col1X, rowY, iconSize);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(0, 0, 0);
  doc.text("WhatsApp", col1X + iconSize + 3, rowY + 3.3);
  doc.setFont("helvetica", "bold");
  doc.text("3402 485698", col1X + iconSize + 3, rowY + 7.3);

  // Instagram
  drawInstagramBadge(doc, col2X, rowY, iconSize);
  doc.setFont("helvetica", "normal");
  doc.text("Instagram", col2X + iconSize + 3, rowY + 3.3);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("elpajaro_serv.automotriz", col2X + iconSize + 3, rowY + 7.3);
  doc.setFontSize(9);

  // Mercado Pago
  drawMercadoPagoBadge(doc, col3X, rowY, iconSize);
  doc.setFont("helvetica", "normal");
  doc.text("Alias Mercado Pago", col3X + iconSize + 3, rowY + 3.3);
  doc.setFont("helvetica", "bold");
  doc.text("brianvanelli.mp", col3X + iconSize + 3, rowY + 7.3);
};

// ---------- FIN ICONOS ----------

const generateInvoice = (info, items) => {
  const arrayItems = items.map((item) => [
    item.cantidad,
    item.detalle,
    `$ ${item.precio_unitario}`,
    `$ ${item.total}`,
  ]);

  let total = 0;
  items.forEach((item) => {
    total += parseInt(item.total) || 0;
  });

  const entrega = parseInt(info.entrega) || 0;
  const saldo = total - entrega;

  const doc = new jsPDF();

  // Logo
  doc.addImage(logo, "PNG", 138, 10, 60, 30);

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("EL PAJARO - SERVICIO AUTOMOTRIZ", 14, 25);
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("de Brian Vanelli", 14, 32);
  doc.text("Cel. 3402-520117", 14, 37);
  doc.text("Giacchino 65 bis - Arroyo Seco - Santa Fe", 14, 42);

  // Fecha box
  doc.setFont("helvetica", "bold");
  doc.rect(148, 40, 45, 10);
  doc.text(`FECHA: ${info.fecha}`, 151, 47);

  // Datos cliente
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("Sr./es:", 14, 55);
  doc.setFont("helvetica", "bold");
  doc.text(info.cliente, 27, 55);
  doc.setFont("helvetica", "normal");
  doc.text("Domicilio:", 14, 62);
  doc.text(info.direccion, 34, 62);
  doc.text("Vehículo:", 14, 69);
  doc.text(info.vehiculo, 33, 69);
  doc.text("Patente:", 148, 62);
  doc.text(info.patente, 165, 62);
  doc.text("Kilometraje:", 148, 69);
  doc.text(info.kilometraje, 172, 69);

  // Tabla
  autoTable(doc, {
    startY: 75,
    head: [["CANT.", "DETALLE", "PRECIO UNITARIO", "TOTAL"]],
    body: arrayItems,
    theme: "grid",
    styles: { fontSize: 10, cellPadding: 3, textColor: [0, 0, 0] },
    headStyles: {
      fillColor: [15, 17, 23],
      textColor: [245, 158, 11],
      fontStyle: "bold",
    },
    columnStyles: {
      0: { halign: "center", cellWidth: 20 },
      2: { halign: "right", cellWidth: 40 },
      3: { halign: "right", cellWidth: 40 },
    },
  });

  let finalY = doc.lastAutoTable.finalY + 8;

  // Total bruto
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("TOTAL:", 148, finalY);
  doc.rect(168, finalY - 5, 27, 8);
  doc.text(`$ ${total}`, 170, finalY);

  // Entrega (si aplica)
  if (entrega > 0) {
    finalY += 10;
    doc.setFont("helvetica", "normal");
    doc.text("Entrega a cuenta:", 138, finalY);
    doc.setFont("helvetica", "bold");
    doc.text(`$ ${entrega}`, 170, finalY);

    finalY += 10;
    doc.setFillColor(15, 17, 23);
    doc.rect(130, finalY - 6, 65, 10, "F");
    doc.setTextColor(245, 158, 11);
    doc.setFontSize(12);
    doc.text("SALDO:", 132, finalY);
    doc.text(`$ ${saldo}`, 170, finalY);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
  }

  // Observaciones
  finalY += 12;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Observaciones:", 14, finalY);
  doc.setFont("helvetica", "normal");

  const pageWidth = doc.internal.pageSize.getWidth();
  const marginLeft = 50;
  const maxWidth = pageWidth - marginLeft - 14;
  const textoObs =
    info.observaciones && info.observaciones.trim() !== ""
      ? info.observaciones
      : "Sin observaciones";
  const textoDividido = doc.splitTextToSize(textoObs, maxWidth);
  doc.text(textoDividido, marginLeft, finalY);

  // Footer de contacto (WhatsApp / Instagram / Mercado Pago)
  const footerY = finalY + textoDividido.length * 5 + 5;
  addContactFooter(doc, footerY);

  doc.save("factura.pdf");
};

export default generateInvoice;