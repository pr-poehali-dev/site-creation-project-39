import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

export default function Index() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заявка отправлена",
      description: "Мы свяжемся с вами в ближайшее время",
    });
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const benefits = [
    {
      icon: "Target",
      title: "Точная диагностика",
      description: "Глубокий анализ бизнес-процессов с выявлением скрытых проблем"
    },
    {
      icon: "TrendingUp",
      title: "Рост прибыли",
      description: "Стратегии, доказавшие эффективность на практике"
    },
    {
      icon: "Users",
      title: "Экспертная команда",
      description: "15+ лет опыта работы с малым и средним бизнесом"
    },
    {
      icon: "Shield",
      title: "Гарантия результата",
      description: "Работаем до достижения измеримых показателей"
    }
  ];

  const services = [
    {
      icon: "LineChart",
      title: "Стратегический консалтинг",
      description: "Разработка долгосрочной стратегии развития вашего бизнеса с учётом рыночных трендов"
    },
    {
      icon: "Settings",
      title: "Оптимизация процессов",
      description: "Автоматизация и улучшение бизнес-процессов для снижения издержек до 40%"
    },
    {
      icon: "DollarSign",
      title: "Финансовый анализ",
      description: "Комплексный аудит финансовых потоков и рекомендации по управлению капиталом"
    },
    {
      icon: "Users2",
      title: "HR-консалтинг",
      description: "Построение эффективной системы управления персоналом и мотивации команды"
    }
  ];

  const testimonials = [
    {
      name: "Михаил Петров",
      company: "ТехноПром",
      text: "За 6 месяцев работы выручка выросла на 45%. Особенно впечатлила глубина анализа и практичность рекомендаций."
    },
    {
      name: "Елена Соколова",
      company: "Модный дом Элеганс",
      text: "Помогли оптимизировать складскую логистику. Сократили издержки на 30% и ускорили поставки в два раза."
    },
    {
      name: "Андрей Васильев",
      company: "Стройинвест",
      text: "Профессионалы своего дела. Разработали стратегию выхода на новый рынок – сейчас успешно работаем в трёх регионах."
    }
  ];

  const faqs = [
    {
      question: "Сколько времени занимает консалтинговый проект?",
      answer: "Продолжительность зависит от масштаба задач. Экспресс-аудит — 2-3 недели, комплексный проект — от 3 до 6 месяцев. На первой встрече мы определим точные сроки под вашу ситуацию."
    },
    {
      question: "Какая стоимость ваших услуг?",
      answer: "Мы формируем индивидуальное предложение после бесплатной диагностической сессии. Стоимость зависит от объёма работ и поставленных целей. Средний проект для малого бизнеса — от 200 000 рублей."
    },
    {
      question: "Предоставляете ли гарантии результата?",
      answer: "Да, мы работаем на основе KPI и фиксируем целевые показатели в договоре. Если результаты не достигнуты по нашей вине — продолжаем работу бесплатно до достижения цели."
    },
    {
      question: "С какими отраслями вы работаете?",
      answer: "Наша экспертиза охватывает производство, ритейл, услуги, HoReCa, IT и строительство. За 15 лет реализовали более 200 проектов в различных сферах бизнеса."
    },
    {
      question: "Можно ли начать с небольшого проекта?",
      answer: "Конечно! Мы предлагаем экспресс-диагностику на 2-3 недели. Это позволит оценить наш подход и получить первые результаты без долгосрочных обязательств."
    }
  ];

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:30px_30px]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Трансформируем ваш бизнес в прибыльную систему
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 font-light">
              Стратегический консалтинг для малого и среднего бизнеса. Увеличиваем прибыль на 30-50% за 6 месяцев
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 py-6 hover-scale"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Получить консультацию
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-6"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Узнать подробнее
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card 
                key={index} 
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Icon name={benefit.icon} size={32} className="text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Наши услуги</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Комплексные решения для роста вашего бизнеса
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="border-2 hover:border-secondary transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={service.icon} size={24} className="text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Отзывы клиентов</h2>
            <p className="text-xl text-muted-foreground">Результаты, которыми гордятся наши партнёры</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card shadow-md hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="mb-4">
                    <Icon name="Quote" size={32} className="text-secondary/30" />
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-lg">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Частые вопросы</h2>
            <p className="text-xl text-muted-foreground">Ответы на важные вопросы о консалтинге</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-2 border-border rounded-lg px-6 data-[state=open]:border-secondary"
                >
                  <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Получить консультацию</h2>
              <p className="text-xl text-primary-foreground/90">
                Оставьте заявку — мы свяжемся с вами в течение 2 часов
              </p>
            </div>
            <Card className="bg-card/95 backdrop-blur">
              <CardContent className="p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-card-foreground">Ваше имя *</label>
                      <Input 
                        required
                        placeholder="Иван Иванов"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="bg-background"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-card-foreground">Email *</label>
                      <Input 
                        required
                        type="email"
                        placeholder="ivan@company.ru"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="bg-background"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-card-foreground">Телефон *</label>
                    <Input 
                      required
                      type="tel"
                      placeholder="+7 (999) 123-45-67"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-card-foreground">Опишите вашу задачу</label>
                    <Textarea 
                      placeholder="Расскажите о вашем бизнесе и целях..."
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="bg-background resize-none"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg py-6"
                  >
                    Отправить заявку
                    <Icon name="Send" size={20} className="ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <div className="mt-12 text-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center">
                  <Icon name="Phone" size={32} className="mb-3 text-secondary" />
                  <p className="font-semibold mb-1">Телефон</p>
                  <a href="tel:+79991234567" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                    +7 (999) 123-45-67
                  </a>
                </div>
                <div className="flex flex-col items-center">
                  <Icon name="Mail" size={32} className="mb-3 text-secondary" />
                  <p className="font-semibold mb-1">Email</p>
                  <a href="mailto:info@consulting.ru" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                    info@consulting.ru
                  </a>
                </div>
                <div className="flex flex-col items-center">
                  <Icon name="MapPin" size={32} className="mb-3 text-secondary" />
                  <p className="font-semibold mb-1">Офис</p>
                  <p className="text-primary-foreground/80">Москва, ул. Тверская, 1</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-primary/95 text-primary-foreground py-8 border-t border-primary-foreground/10">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-primary-foreground/70">© 2024 Бизнес-Консалтинг. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
