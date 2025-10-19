import * as XLSX from 'xlsx';

interface ResidentData {
  id: string;
  name: string;
  apartment: string;
  balance: number;
  area: number;
  residents: number;
  status: string;
}

interface PaymentData {
  date: string;
  account: string;
  name: string;
  amount: number;
  type: string;
  status: string;
}

interface MeterReadingData {
  id: string;
  residentId: string;
  residentName: string;
  apartment: string;
  coldWater: number;
  hotWater: number;
  electricity: number;
  date: string;
  prevColdWater?: number;
  prevHotWater?: number;
  prevElectricity?: number;
}

export const exportResidentsToExcel = (residents: ResidentData[]) => {
  const data = residents.map(r => ({
    'Лицевой счет': r.id,
    'ФИО': r.name,
    'Квартира': r.apartment,
    'Площадь (м²)': r.area,
    'Жильцов': r.residents,
    'Баланс (₽)': r.balance,
    'Статус': r.status === 'debt' ? 'Задолженность' : r.status === 'paid' ? 'Оплачено' : 'Переплата'
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Лицевые счета');

  worksheet['!cols'] = [
    { wch: 15 },
    { wch: 30 },
    { wch: 10 },
    { wch: 12 },
    { wch: 10 },
    { wch: 12 },
    { wch: 15 }
  ];

  const fileName = `Лицевые_счета_${new Date().toLocaleDateString('ru-RU').replace(/\./g, '-')}.xlsx`;
  XLSX.writeFile(workbook, fileName);
};

export const exportPaymentsToExcel = (payments: PaymentData[]) => {
  const data = payments.map(p => ({
    'Дата': p.date,
    'Лицевой счет': p.account,
    'Плательщик': p.name,
    'Сумма (₽)': p.amount,
    'Тип платежа': p.type,
    'Статус': p.status === 'processed' ? 'Обработан' : 'В обработке'
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Платежи');

  worksheet['!cols'] = [
    { wch: 12 },
    { wch: 15 },
    { wch: 30 },
    { wch: 12 },
    { wch: 15 },
    { wch: 15 }
  ];

  const total = payments.reduce((sum, p) => sum + p.amount, 0);
  
  const summaryRow = data.length + 2;
  XLSX.utils.sheet_add_aoa(worksheet, [['', '', 'ИТОГО:', total]], { origin: `A${summaryRow}` });

  const fileName = `Платежи_${new Date().toLocaleDateString('ru-RU').replace(/\./g, '-')}.xlsx`;
  XLSX.writeFile(workbook, fileName);
};

export const exportMeterReadingsToExcel = (readings: MeterReadingData[]) => {
  const data = readings.map(r => {
    const coldConsumption = r.prevColdWater ? r.coldWater - r.prevColdWater : 0;
    const hotConsumption = r.prevHotWater ? r.hotWater - r.prevHotWater : 0;
    const electricityConsumption = r.prevElectricity ? r.electricity - r.prevElectricity : 0;

    return {
      'Лицевой счет': r.residentId,
      'ФИО': r.residentName,
      'Квартира': r.apartment,
      'Холодная вода (м³)': r.coldWater || '-',
      'Расход ХВ': coldConsumption > 0 ? coldConsumption.toFixed(1) : '-',
      'Горячая вода (м³)': r.hotWater || '-',
      'Расход ГВ': hotConsumption > 0 ? hotConsumption.toFixed(1) : '-',
      'Электричество (кВт·ч)': r.electricity || '-',
      'Расход эл.': electricityConsumption > 0 ? electricityConsumption : '-',
      'Дата': r.date
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Показания счётчиков');

  worksheet['!cols'] = [
    { wch: 15 },
    { wch: 30 },
    { wch: 10 },
    { wch: 18 },
    { wch: 12 },
    { wch: 18 },
    { wch: 12 },
    { wch: 20 },
    { wch: 12 },
    { wch: 12 }
  ];

  const fileName = `Показания_счётчиков_${new Date().toLocaleDateString('ru-RU').replace(/\./g, '-')}.xlsx`;
  XLSX.writeFile(workbook, fileName);
};

export const exportFullReportToExcel = (
  residents: ResidentData[],
  payments: PaymentData[],
  readings: MeterReadingData[]
) => {
  const workbook = XLSX.utils.book_new();

  const residentsData = residents.map(r => ({
    'Лицевой счет': r.id,
    'ФИО': r.name,
    'Квартира': r.apartment,
    'Площадь (м²)': r.area,
    'Жильцов': r.residents,
    'Баланс (₽)': r.balance,
    'Статус': r.status === 'debt' ? 'Задолженность' : r.status === 'paid' ? 'Оплачено' : 'Переплата'
  }));
  const residentsSheet = XLSX.utils.json_to_sheet(residentsData);
  residentsSheet['!cols'] = [{ wch: 15 }, { wch: 30 }, { wch: 10 }, { wch: 12 }, { wch: 10 }, { wch: 12 }, { wch: 15 }];
  XLSX.utils.book_append_sheet(workbook, residentsSheet, 'Лицевые счета');

  const paymentsData = payments.map(p => ({
    'Дата': p.date,
    'Лицевой счет': p.account,
    'Плательщик': p.name,
    'Сумма (₽)': p.amount,
    'Тип платежа': p.type,
    'Статус': p.status === 'processed' ? 'Обработан' : 'В обработке'
  }));
  const paymentsSheet = XLSX.utils.json_to_sheet(paymentsData);
  paymentsSheet['!cols'] = [{ wch: 12 }, { wch: 15 }, { wch: 30 }, { wch: 12 }, { wch: 15 }, { wch: 15 }];
  XLSX.utils.book_append_sheet(workbook, paymentsSheet, 'Платежи');

  const readingsData = readings.map(r => {
    const coldConsumption = r.prevColdWater ? r.coldWater - r.prevColdWater : 0;
    const hotConsumption = r.prevHotWater ? r.hotWater - r.prevHotWater : 0;
    const electricityConsumption = r.prevElectricity ? r.electricity - r.prevElectricity : 0;

    return {
      'Лицевой счет': r.residentId,
      'ФИО': r.residentName,
      'Квартира': r.apartment,
      'ХВ (м³)': r.coldWater || '-',
      'Расход ХВ': coldConsumption > 0 ? coldConsumption.toFixed(1) : '-',
      'ГВ (м³)': r.hotWater || '-',
      'Расход ГВ': hotConsumption > 0 ? hotConsumption.toFixed(1) : '-',
      'Эл. (кВт·ч)': r.electricity || '-',
      'Расход эл.': electricityConsumption > 0 ? electricityConsumption : '-',
      'Дата': r.date
    };
  });
  const readingsSheet = XLSX.utils.json_to_sheet(readingsData);
  readingsSheet['!cols'] = [{ wch: 15 }, { wch: 30 }, { wch: 10 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 15 }, { wch: 12 }, { wch: 12 }];
  XLSX.utils.book_append_sheet(workbook, readingsSheet, 'Показания');

  const summaryData = [
    { 'Показатель': 'Всего лицевых счетов', 'Значение': residents.length },
    { 'Показатель': 'Общая задолженность (₽)', 'Значение': residents.filter(r => r.balance < 0).reduce((sum, r) => sum + Math.abs(r.balance), 0) },
    { 'Показатель': 'Всего платежей за период', 'Значение': payments.length },
    { 'Показатель': 'Сумма платежей (₽)', 'Значение': payments.reduce((sum, p) => sum + p.amount, 0) },
    { 'Показатель': 'Показания получены', 'Значение': readings.filter(r => r.coldWater > 0).length },
    { 'Показатель': 'Ожидают подачи', 'Значение': readings.filter(r => r.coldWater === 0).length }
  ];
  const summarySheet = XLSX.utils.json_to_sheet(summaryData);
  summarySheet['!cols'] = [{ wch: 35 }, { wch: 20 }];
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Сводка');

  const fileName = `Полный_отчёт_${new Date().toLocaleDateString('ru-RU').replace(/\./g, '-')}.xlsx`;
  XLSX.writeFile(workbook, fileName);
};
