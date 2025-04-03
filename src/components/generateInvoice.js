import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../assets/logo.png"

const genereteInvoice = (info, items) => {
    const arrayItems = items.map(item => [item.cantidad, item.detalle, `$ ${item.precio_unitario}`, `$ ${item.total}`]);
    let total = 0

    //Definir el total de todos los items
    items.forEach(item => {
        total += parseInt(item.total) || 0;
    });

    total = total.toString()

    const doc = new jsPDF();

    doc.addImage(logo, "PNG", 138, 10, 60, 30);
    
    // Información del dueño
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("EL PAJARO - SERVICIO AUTOMOTRIZ", 14, 25);
    doc.setFontSize(12);
    doc.text("de Brian Vanelli", 14, 32);
    doc.text("Cel. 3402-520117", 14, 37);
    doc.text("Giacchino 65 bis - Arroyo Seco - Santa Fe", 14, 42);
    
    // Cuadro de fecha
    doc.rect(148, 40, 45, 10);
    doc.text(`FECHA: ${info.fecha}`, 151, 47);

    // Datos del cliente
    doc.setFont("helvetica", "normal", "bold");
    doc.setFontSize(11);
    doc.text("Sr./es:", 14, 55);
    doc.text(info.cliente, 27, 55);
    doc.text("Domicilio:", 14, 62);
    doc.text(info.direccion, 34, 62);
    doc.text("Vehículo:", 14, 69);
    doc.text(info.vehiculo, 33, 69);
    doc.text("Patente:", 148, 62);
    doc.text(info.patente, 165, 62);
    doc.text("Kilometraje:", 148, 69);
    doc.text(info.kilometraje, 172, 69);
    
    // Tabla de detalles
    autoTable(doc, {
        startY: 80,
        head: [['CANT.', 'DETALLE', 'PRECIO UNITARIO', 'TOTAL']],
        body: arrayItems,
        theme: 'grid',
        styles: { fontSize: 10, cellPadding: 3, textColor: [0, 0, 0] },
        headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255], fontStyle: 'bold' },
        columnStyles: {
            0: { halign: 'center', cellWidth: 20 },
            2: { halign: 'right', cellWidth: 40 },
            3: { halign: 'right', cellWidth: 40 },
        },
    });
    
    // Total
    let finalY = doc.lastAutoTable.finalY + 10;
    doc.setFont("helvetica", "bold");
    doc.text("TOTAL:", 150, finalY);
    doc.rect(170, finalY - 5, 25, 8); // Cuadro para el total
    doc.text(`$ ${total}`, 172, finalY);
    
    doc.save("factura.pdf");
};

export default genereteInvoice;