import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { 
      title: 'Всего лицевых счетов', 
      value: '248', 
      icon: 'Users', 
      change: '+12', 
      color: 'bg-blue-500' 
    },
    { 
      title: 'Задолженность', 
      value: '1.2M ₽', 
      icon: 'AlertCircle', 
      change: '-8%', 
      color: 'bg-red-500' 
    },
    { 
      title: 'Оплачено за месяц', 
      value: '3.8M ₽', 
      icon: 'CheckCircle', 
      change: '+15%', 
      color: 'bg-green-500' 
    },
    { 
      title: 'К начислению', 
      value: '4.1M ₽', 
      icon: 'FileText', 
      change: '+2%', 
      color: 'bg-yellow-500' 
    }
  ];

  const residents = [
    { 
      id: '001234', 
      name: 'Иванов Иван Иванович', 
      apartment: '45', 
      balance: -12500, 
      area: 65.5, 
      residents: 3,
      status: 'debt' 
    },
    { 
      id: '001235', 
      name: 'Петрова Мария Сергеевна', 
      apartment: '46', 
      balance: 0, 
      area: 48.2, 
      residents: 2,
      status: 'paid' 
    },
    { 
      id: '001236', 
      name: 'Сидоров Петр Алексеевич', 
      apartment: '47', 
      balance: 8500, 
      area: 72.0, 
      residents: 4,
      status: 'overpaid' 
    },
    { 
      id: '001237', 
      name: 'Козлова Елена Викторовна', 
      apartment: '48', 
      balance: -5200, 
      area: 54.3, 
      residents: 2,
      status: 'debt' 
    },
    { 
      id: '001238', 
      name: 'Морозов Андрей Николаевич', 
      apartment: '49', 
      balance: 0, 
      area: 62.8, 
      residents: 3,
      status: 'paid' 
    }
  ];

  const payments = [
    { 
      date: '15.10.2024', 
      account: '001234', 
      name: 'Иванов И.И.', 
      amount: 8500, 
      type: 'Квитанция',
      status: 'processed' 
    },
    { 
      date: '14.10.2024', 
      account: '001236', 
      name: 'Сидоров П.А.', 
      amount: 12000, 
      type: 'Онлайн',
      status: 'processed' 
    },
    { 
      date: '14.10.2024', 
      account: '001235', 
      name: 'Петрова М.С.', 
      amount: 6800, 
      type: 'Банк',
      status: 'processed' 
    },
    { 
      date: '13.10.2024', 
      account: '001238', 
      name: 'Морозов А.Н.', 
      amount: 9200, 
      type: 'Онлайн',
      status: 'pending' 
    }
  ];

  const charges = [
    { service: 'Содержание и ремонт', rate: 28.50, unit: 'м²' },
    { service: 'Отопление', rate: 42.30, unit: 'м²' },
    { service: 'Горячая вода', rate: 185.20, unit: 'м³' },
    { service: 'Холодная вода', rate: 38.50, unit: 'м³' },
    { service: 'Водоотведение', rate: 28.90, unit: 'м³' },
    { service: 'Электроэнергия', rate: 5.80, unit: 'кВт·ч' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'debt':
        return <Badge variant="destructive">Задолженность</Badge>;
      case 'paid':
        return <Badge className="bg-green-500">Оплачено</Badge>;
      case 'overpaid':
        return <Badge className="bg-blue-500">Переплата</Badge>;
      default:
        return <Badge variant="secondary">—</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'processed':
        return <Badge className="bg-green-500">Обработан</Badge>;
      case 'pending':
        return <Badge variant="secondary">В обработке</Badge>;
      default:
        return <Badge variant="secondary">—</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-primary text-primary-foreground border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                <Icon name="Building2" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold">РасчетныйЦентр</h1>
                <p className="text-sm text-primary-foreground/80">ТСЖ "Солнечный"</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Icon name="Bell" size={20} className="mr-2" />
                Уведомления
              </Button>
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Icon name="User" size={20} className="mr-2" />
                Администратор
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="dashboard" className="gap-2">
              <Icon name="LayoutDashboard" size={16} />
              Дашборд
            </TabsTrigger>
            <TabsTrigger value="residents" className="gap-2">
              <Icon name="Users" size={16} />
              Жильцы
            </TabsTrigger>
            <TabsTrigger value="payments" className="gap-2">
              <Icon name="Wallet" size={16} />
              Платежи
            </TabsTrigger>
            <TabsTrigger value="charges" className="gap-2">
              <Icon name="Calculator" size={16} />
              Тарифы
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </CardTitle>
                      <div className={`${stat.color} w-8 h-8 rounded-lg flex items-center justify-center`}>
                        <Icon name={stat.icon} size={16} className="text-white" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.change} с прошлого месяца
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="TrendingUp" size={20} />
                    Последние платежи
                  </CardTitle>
                  <CardDescription>Актуальные поступления</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {payments.slice(0, 4).map((payment, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                        <div>
                          <p className="font-medium">{payment.name}</p>
                          <p className="text-sm text-muted-foreground">{payment.date} • {payment.type}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">+{payment.amount.toLocaleString()} ₽</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="AlertTriangle" size={20} />
                    Должники
                  </CardTitle>
                  <CardDescription>Требуют внимания</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {residents.filter(r => r.status === 'debt').map((resident, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                        <div>
                          <p className="font-medium">{resident.name}</p>
                          <p className="text-sm text-muted-foreground">Кв. {resident.apartment} • ЛС {resident.id}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-red-600">{resident.balance.toLocaleString()} ₽</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="residents" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Лицевые счета</CardTitle>
                    <CardDescription>Управление жильцами и квартирами</CardDescription>
                  </div>
                  <Button className="bg-secondary hover:bg-secondary/90">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить жильца
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Лицевой счет</TableHead>
                      <TableHead>ФИО</TableHead>
                      <TableHead>Квартира</TableHead>
                      <TableHead>Площадь</TableHead>
                      <TableHead>Жильцов</TableHead>
                      <TableHead>Баланс</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {residents.map((resident) => (
                      <TableRow key={resident.id}>
                        <TableCell className="font-mono">{resident.id}</TableCell>
                        <TableCell className="font-medium">{resident.name}</TableCell>
                        <TableCell>{resident.apartment}</TableCell>
                        <TableCell>{resident.area} м²</TableCell>
                        <TableCell>{resident.residents}</TableCell>
                        <TableCell className={resident.balance < 0 ? 'text-red-600 font-semibold' : resident.balance > 0 ? 'text-blue-600 font-semibold' : ''}>
                          {resident.balance.toLocaleString()} ₽
                        </TableCell>
                        <TableCell>{getStatusBadge(resident.status)}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Icon name="MoreVertical" size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>История платежей</CardTitle>
                    <CardDescription>Все поступления за текущий период</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Icon name="Filter" size={16} className="mr-2" />
                      Фильтр
                    </Button>
                    <Button className="bg-secondary hover:bg-secondary/90">
                      <Icon name="Download" size={16} className="mr-2" />
                      Экспорт
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Дата</TableHead>
                      <TableHead>Лицевой счет</TableHead>
                      <TableHead>Плательщик</TableHead>
                      <TableHead>Сумма</TableHead>
                      <TableHead>Тип платежа</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment, index) => (
                      <TableRow key={index}>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell className="font-mono">{payment.account}</TableCell>
                        <TableCell>{payment.name}</TableCell>
                        <TableCell className="font-semibold text-green-600">
                          +{payment.amount.toLocaleString()} ₽
                        </TableCell>
                        <TableCell>{payment.type}</TableCell>
                        <TableCell>{getPaymentStatusBadge(payment.status)}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Icon name="Eye" size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="charges" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Тарифы на услуги</CardTitle>
                    <CardDescription>Действующие расценки на октябрь 2024</CardDescription>
                  </div>
                  <Button className="bg-secondary hover:bg-secondary/90">
                    <Icon name="Edit" size={16} className="mr-2" />
                    Изменить тарифы
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Наименование услуги</TableHead>
                      <TableHead>Единица измерения</TableHead>
                      <TableHead>Тариф</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {charges.map((charge, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{charge.service}</TableCell>
                        <TableCell>{charge.unit}</TableCell>
                        <TableCell className="font-semibold">{charge.rate.toFixed(2)} ₽</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Icon name="History" size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Calculator" size={20} />
                  Калькулятор начислений
                </CardTitle>
                <CardDescription>Пример расчёта для квартиры 65 м² с 3 жильцами</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Содержание и ремонт (65 м² × 28.50 ₽)</span>
                    <span className="font-semibold">1,852.50 ₽</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Отопление (65 м² × 42.30 ₽)</span>
                    <span className="font-semibold">2,749.50 ₽</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Водоснабжение и водоотведение</span>
                    <span className="font-semibold">1,890.00 ₽</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Электроэнергия (250 кВт·ч × 5.80 ₽)</span>
                    <span className="font-semibold">1,450.00 ₽</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t-2">
                    <span className="text-lg font-semibold">Итого к оплате:</span>
                    <span className="text-2xl font-bold text-secondary">7,942.00 ₽</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
