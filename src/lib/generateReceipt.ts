import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ResidentData {
  id: string;
  name: string;
  apartment: string;
  area: number;
  residents: number;
  balance: number;
}

interface ChargeItem {
  service: string;
  rate: number;
  unit: string;
  quantity: number;
  amount: number;
}

export const generateReceipt = (resident: ResidentData, month: string, year: string) => {
  const doc = new jsPDF();
  
  const charges: ChargeItem[] = [
    { 
      service: 'Содержание и ремонт', 
      rate: 28.50, 
      unit: 'м²', 
      quantity: resident.area,
      amount: resident.area * 28.50
    },
    { 
      service: 'Отопление', 
      rate: 42.30, 
      unit: 'м²', 
      quantity: resident.area,
      amount: resident.area * 42.30
    },
    { 
      service: 'Горячая вода', 
      rate: 185.20, 
      unit: 'м³', 
      quantity: 4.5,
      amount: 4.5 * 185.20
    },
    { 
      service: 'Холодная вода', 
      rate: 38.50, 
      unit: 'м³', 
      quantity: 6.2,
      amount: 6.2 * 38.50
    },
    { 
      service: 'Водоотведение', 
      rate: 28.90, 
      unit: 'м³', 
      quantity: 10.7,
      amount: 10.7 * 28.90
    },
    { 
      service: 'Электроэнергия', 
      rate: 5.80, 
      unit: 'кВт·ч', 
      quantity: 250,
      amount: 250 * 5.80
    }
  ];

  const total = charges.reduce((sum, item) => sum + item.amount, 0);
  const toPay = total + resident.balance;

  doc.setFontSize(18);
  doc.text('ПЛАТЕЖНАЯ КВИТАНЦИЯ', 105, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.text(`ТСЖ "Солнечный"`, 105, 30, { align: 'center' });
  doc.text(`За ${month} ${year} г.`, 105, 37, { align: 'center' });

  doc.setFontSize(10);
  doc.text('Получатель: ТСЖ "Солнечный"', 20, 50);
  doc.text('ИНН: 7701234567 | КПП: 770101001', 20, 56);
  doc.text('Р/с: 40703810400000000001', 20, 62);
  doc.text('Банк: ПАО "Сбербанк России"', 20, 68);
  doc.text('БИК: 044525225 | К/с: 30101810400000000225', 20, 74);

  doc.setDrawColor(200);
  doc.line(20, 80, 190, 80);

  doc.setFontSize(11);
  doc.text('СВЕДЕНИЯ О ПЛАТЕЛЬЩИКЕ', 20, 88);
  
  doc.setFontSize(10);
  doc.text(`Лицевой счет: ${resident.id}`, 20, 96);
  doc.text(`ФИО: ${resident.name}`, 20, 102);
  doc.text(`Адрес: г. Москва, ул. Солнечная, д. 10, кв. ${resident.apartment}`, 20, 108);
  doc.text(`Площадь: ${resident.area} м² | Проживает: ${resident.residents} чел.`, 20, 114);

  autoTable(doc, {
    startY: 125,
    head: [['Наименование услуги', 'Ед.', 'Тариф', 'Объем', 'Сумма']],
    body: charges.map(item => [
      item.service,
      item.unit,
      `${item.rate.toFixed(2)} ₽`,
      item.quantity.toFixed(2),
      `${item.amount.toFixed(2)} ₽`
    ]),
    foot: [
      ['', '', '', 'Итого начислено:', `${total.toFixed(2)} ₽`],
      ['', '', '', resident.balance >= 0 ? 'Переплата:' : 'Задолженность:', `${Math.abs(resident.balance).toFixed(2)} ₽`],
      ['', '', '', 'К оплате:', `${toPay.toFixed(2)} ₽`]
    ],
    theme: 'grid',
    headStyles: { fillColor: [26, 31, 44], fontSize: 9 },
    footStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontStyle: 'bold' },
    styles: { fontSize: 9, cellPadding: 3 },
    columnStyles: {
      0: { cellWidth: 70 },
      1: { cellWidth: 20, halign: 'center' },
      2: { cellWidth: 30, halign: 'right' },
      3: { cellWidth: 25, halign: 'right' },
      4: { cellWidth: 35, halign: 'right' }
    }
  });

  const finalY = (doc as any).lastAutoTable.finalY + 15;
  
  doc.setFontSize(9);
  doc.text('Оплатить можно:', 20, finalY);
  doc.text('• Через Сбербанк Онлайн (по номеру лицевого счета)', 20, finalY + 6);
  doc.text('• В отделении любого банка', 20, finalY + 12);
  doc.text('• Через терминалы оплаты', 20, finalY + 18);
  doc.text('• По QR-коду в мобильном приложении банка', 20, finalY + 24);

  doc.setFontSize(8);
  doc.setTextColor(100);
  doc.text('Квитанция сформирована автоматически. При возникновении вопросов обращайтесь в офис ТСЖ.', 105, 280, { align: 'center' });
  doc.text(`Дата формирования: ${new Date().toLocaleDateString('ru-RU')}`, 105, 285, { align: 'center' });

  doc.save(`Квитанция_${resident.id}_${month}_${year}.pdf`);
};

export const generateBulkReceipts = (residents: ResidentData[], month: string, year: string) => {
  residents.forEach((resident, index) => {
    setTimeout(() => {
      generateReceipt(resident, month, year);
    }, index * 300);
  });
};
