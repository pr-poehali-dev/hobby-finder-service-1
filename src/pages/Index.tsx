import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

type Mood = 'energetic' | 'calm' | 'creative' | 'social';
type TestStep = 'welcome' | 'question1' | 'question2' | 'question3' | 'results';

interface Activity {
  id: number;
  title: string;
  description: string;
  category: string;
  budget: 'free' | 'low' | 'medium' | 'high';
  company: 'solo' | 'duo' | 'group';
  mood: Mood[];
  icon: string;
}

const activities: Activity[] = [
  {
    id: 1,
    title: 'Йога на природе',
    description: 'Утренняя практика в парке для начинающих',
    category: 'Спорт',
    budget: 'free',
    company: 'group',
    mood: ['calm', 'energetic'],
    icon: 'Heart'
  },
  {
    id: 2,
    title: 'Рисование акварелью',
    description: 'Мастер-класс по акварельной живописи',
    category: 'Творчество',
    budget: 'low',
    company: 'solo',
    mood: ['creative', 'calm'],
    icon: 'Palette'
  },
  {
    id: 3,
    title: 'Настольные игры',
    description: 'Вечер стратегий и веселья в антикафе',
    category: 'Развлечения',
    budget: 'low',
    company: 'group',
    mood: ['social', 'creative'],
    icon: 'Gamepad2'
  },
  {
    id: 4,
    title: 'Фотопрогулка',
    description: 'Исследуем город с камерой',
    category: 'Творчество',
    budget: 'free',
    company: 'duo',
    mood: ['creative', 'energetic'],
    icon: 'Camera'
  },
  {
    id: 5,
    title: 'Кулинарный мастер-класс',
    description: 'Готовим итальянскую пасту с нуля',
    category: 'Обучение',
    budget: 'medium',
    company: 'group',
    mood: ['creative', 'social'],
    icon: 'ChefHat'
  },
  {
    id: 6,
    title: 'Медитация',
    description: 'Практика осознанности для снятия стресса',
    category: 'Саморазвитие',
    budget: 'free',
    company: 'solo',
    mood: ['calm'],
    icon: 'Sparkles'
  }
];

export default function Index() {
  const [currentView, setCurrentView] = useState<'home' | 'test' | 'catalog' | 'profile'>('home');
  const [testStep, setTestStep] = useState<TestStep>('welcome');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [userMood, setUserMood] = useState<Mood>('creative');
  const [budgetFilter, setBudgetFilter] = useState<string[]>([]);
  const [companyFilter, setCompanyFilter] = useState<string[]>([]);
  const [savedActivities, setSavedActivities] = useState<number[]>([1, 3, 5]);

  const startTest = () => {
    setCurrentView('test');
    setTestStep('question1');
    setAnswers({});
  };

  const nextQuestion = (question: string, answer: string) => {
    setAnswers({ ...answers, [question]: answer });
    
    if (testStep === 'question1') setTestStep('question2');
    else if (testStep === 'question2') setTestStep('question3');
    else if (testStep === 'question3') {
      const mood = calculateMood(answer);
      setUserMood(mood);
      setTestStep('results');
    }
  };

  const calculateMood = (lastAnswer: string): Mood => {
    if (lastAnswer === 'party') return 'social';
    if (lastAnswer === 'nature') return 'calm';
    if (lastAnswer === 'art') return 'creative';
    return 'energetic';
  };

  const finishTest = () => {
    setCurrentView('catalog');
    setTestStep('welcome');
  };

  const toggleSave = (id: number) => {
    setSavedActivities(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const filteredActivities = activities.filter(activity => {
    const budgetMatch = budgetFilter.length === 0 || budgetFilter.includes(activity.budget);
    const companyMatch = companyFilter.length === 0 || companyFilter.includes(activity.company);
    return budgetMatch && companyMatch;
  });

  const recommendedActivities = activities.filter(a => a.mood.includes(userMood));

  if (currentView === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 opacity-20 pointer-events-none">
          <img src="https://cdn.poehali.dev/projects/d45d0f03-dac5-4989-8db7-0fa686347e6c/files/358ad48b-eaaa-474e-b09a-1c1218aae354.jpg" alt="" className="w-full h-full object-contain" />
        </div>
        <div className="absolute bottom-0 right-0 w-72 h-72 opacity-20 pointer-events-none">
          <img src="https://cdn.poehali.dev/projects/d45d0f03-dac5-4989-8db7-0fa686347e6c/files/6c21669c-b5d5-43b0-beab-c17abd6e9f99.jpg" alt="" className="w-full h-full object-contain" />
        </div>
        <div className="absolute top-0 right-0 w-56 h-56 opacity-15 pointer-events-none">
          <img src="https://cdn.poehali.dev/projects/d45d0f03-dac5-4989-8db7-0fa686347e6c/files/358ad48b-eaaa-474e-b09a-1c1218aae354.jpg" alt="" className="w-full h-full object-contain transform scale-x-[-1]" />
        </div>
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Momentum
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Найди своё идеальное хобби и друзей по интересам
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
              <Card className="hover:shadow-xl transition-all hover:scale-105 border-2 border-primary/20">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                    <Icon name="Brain" className="text-primary" size={24} />
                  </div>
                  <CardTitle>Пройди тест</CardTitle>
                  <CardDescription>
                    Узнай свой тип личности и настроение
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-xl transition-all hover:scale-105 border-2 border-secondary/20">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4 mx-auto">
                    <Icon name="Search" className="text-secondary" size={24} />
                  </div>
                  <CardTitle>Найди хобби</CardTitle>
                  <CardDescription>
                    Тысячи занятий с умными фильтрами
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-xl transition-all hover:scale-105 border-2 border-accent/20">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 mx-auto">
                    <Icon name="Users" className="text-accent" size={24} />
                  </div>
                  <CardTitle>Встреть друзей</CardTitle>
                  <CardDescription>
                    Общайся с единомышленниками
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div className="space-y-4 pt-8">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl"
                onClick={startTest}
              >
                <Icon name="Sparkles" className="mr-2" />
                Начать тест
              </Button>
              <p className="text-sm text-muted-foreground">
                Всего 3 вопроса • 1 минута
              </p>
            </div>
          </div>

          <div className="mt-20 flex justify-center gap-6">
            <Button variant="ghost" onClick={() => setCurrentView('catalog')}>
              <Icon name="Grid3x3" className="mr-2" size={20} />
              Каталог
            </Button>
            <Button variant="ghost" onClick={() => setCurrentView('profile')}>
              <Icon name="User" className="mr-2" size={20} />
              Профиль
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'test') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Button 
            variant="ghost" 
            onClick={() => setCurrentView('home')}
            className="mb-6"
          >
            <Icon name="ArrowLeft" className="mr-2" size={20} />
            Назад
          </Button>

          {testStep === 'welcome' && (
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="text-3xl">Привет! 👋</CardTitle>
                <CardDescription>
                  Давай узнаем, какие занятия тебе подойдут лучше всего
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => setTestStep('question1')} className="w-full">
                  Начать
                </Button>
              </CardContent>
            </Card>
          )}

          {testStep === 'question1' && (
            <Card className="animate-scale-in">
              <CardHeader>
                <div className="flex justify-between items-center mb-4">
                  <Badge>Вопрос 1 из 3</Badge>
                  <Progress value={33} className="w-24" />
                </div>
                <CardTitle>Как ты обычно проводишь выходные?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <RadioGroup>
                  <div 
                    className="flex items-center space-x-2 p-4 rounded-lg border-2 cursor-pointer hover:border-primary transition-colors"
                    onClick={() => nextQuestion('q1', 'active')}
                  >
                    <RadioGroupItem value="active" id="active" />
                    <Label htmlFor="active" className="cursor-pointer flex-1">
                      Активно: спорт, прогулки, встречи
                    </Label>
                  </div>
                  <div 
                    className="flex items-center space-x-2 p-4 rounded-lg border-2 cursor-pointer hover:border-primary transition-colors"
                    onClick={() => nextQuestion('q1', 'home')}
                  >
                    <RadioGroupItem value="home" id="home" />
                    <Label htmlFor="home" className="cursor-pointer flex-1">
                      Дома: книги, фильмы, творчество
                    </Label>
                  </div>
                  <div 
                    className="flex items-center space-x-2 p-4 rounded-lg border-2 cursor-pointer hover:border-primary transition-colors"
                    onClick={() => nextQuestion('q1', 'mixed')}
                  >
                    <RadioGroupItem value="mixed" id="mixed" />
                    <Label htmlFor="mixed" className="cursor-pointer flex-1">
                      По-разному, в зависимости от настроения
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          )}

          {testStep === 'question2' && (
            <Card className="animate-scale-in">
              <CardHeader>
                <div className="flex justify-between items-center mb-4">
                  <Badge>Вопрос 2 из 3</Badge>
                  <Progress value={66} className="w-24" />
                </div>
                <CardTitle>С кем ты предпочитаешь заниматься хобби?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <RadioGroup>
                  <div 
                    className="flex items-center space-x-2 p-4 rounded-lg border-2 cursor-pointer hover:border-primary transition-colors"
                    onClick={() => nextQuestion('q2', 'solo')}
                  >
                    <RadioGroupItem value="solo" id="solo" />
                    <Label htmlFor="solo" className="cursor-pointer flex-1">
                      Один — мне нужно личное время
                    </Label>
                  </div>
                  <div 
                    className="flex items-center space-x-2 p-4 rounded-lg border-2 cursor-pointer hover:border-primary transition-colors"
                    onClick={() => nextQuestion('q2', 'close')}
                  >
                    <RadioGroupItem value="close" id="close" />
                    <Label htmlFor="close" className="cursor-pointer flex-1">
                      С близким другом или партнёром
                    </Label>
                  </div>
                  <div 
                    className="flex items-center space-x-2 p-4 rounded-lg border-2 cursor-pointer hover:border-primary transition-colors"
                    onClick={() => nextQuestion('q2', 'group')}
                  >
                    <RadioGroupItem value="group" id="group" />
                    <Label htmlFor="group" className="cursor-pointer flex-1">
                      В компании — чем больше, тем веселее
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          )}

          {testStep === 'question3' && (
            <Card className="animate-scale-in">
              <CardHeader>
                <div className="flex justify-between items-center mb-4">
                  <Badge>Вопрос 3 из 3</Badge>
                  <Progress value={100} className="w-24" />
                </div>
                <CardTitle>Какой формат отдыха тебе ближе?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <RadioGroup>
                  <div 
                    className="flex items-center space-x-2 p-4 rounded-lg border-2 cursor-pointer hover:border-primary transition-colors"
                    onClick={() => nextQuestion('q3', 'nature')}
                  >
                    <RadioGroupItem value="nature" id="nature" />
                    <Label htmlFor="nature" className="cursor-pointer flex-1">
                      Природа и свежий воздух
                    </Label>
                  </div>
                  <div 
                    className="flex items-center space-x-2 p-4 rounded-lg border-2 cursor-pointer hover:border-primary transition-colors"
                    onClick={() => nextQuestion('q3', 'art')}
                  >
                    <RadioGroupItem value="art" id="art" />
                    <Label htmlFor="art" className="cursor-pointer flex-1">
                      Искусство и творчество
                    </Label>
                  </div>
                  <div 
                    className="flex items-center space-x-2 p-4 rounded-lg border-2 cursor-pointer hover:border-primary transition-colors"
                    onClick={() => nextQuestion('q3', 'party')}
                  >
                    <RadioGroupItem value="party" id="party" />
                    <Label htmlFor="party" className="cursor-pointer flex-1">
                      Вечеринки и события
                    </Label>
                  </div>
                  <div 
                    className="flex items-center space-x-2 p-4 rounded-lg border-2 cursor-pointer hover:border-primary transition-colors"
                    onClick={() => nextQuestion('q3', 'learning')}
                  >
                    <RadioGroupItem value="learning" id="learning" />
                    <Label htmlFor="learning" className="cursor-pointer flex-1">
                      Обучение и саморазвитие
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          )}

          {testStep === 'results' && (
            <Card className="animate-scale-in">
              <CardHeader>
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto flex items-center justify-center">
                    <Icon name="Sparkles" className="text-white" size={40} />
                  </div>
                  <CardTitle className="text-3xl">Твой тип: {
                    userMood === 'creative' ? '🎨 Творец' :
                    userMood === 'social' ? '🎉 Душа компании' :
                    userMood === 'calm' ? '🧘 Философ' : '⚡ Энерджайзер'
                  }</CardTitle>
                  <CardDescription className="text-base">
                    {userMood === 'creative' && 'Ты любишь создавать и экспериментировать. Творческие занятия — твоя стихия!'}
                    {userMood === 'social' && 'Ты получаешь энергию от общения. Групповые активности сделают тебя счастливее!'}
                    {userMood === 'calm' && 'Ты ценишь спокойствие и гармонию. Медитативные практики — для тебя!'}
                    {userMood === 'energetic' && 'Ты полон энергии и готов к действию. Спорт и активности — твой выбор!'}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Мы подобрали для тебя:</h3>
                  <p className="text-sm text-muted-foreground">
                    {recommendedActivities.length} занятий идеально подходят твоему типу личности
                  </p>
                </div>
                <Button onClick={finishTest} className="w-full" size="lg">
                  Посмотреть рекомендации
                  <Icon name="ArrowRight" className="ml-2" size={20} />
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  if (currentView === 'catalog') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Каталог занятий</h1>
              <p className="text-muted-foreground">Найди своё идеальное хобби</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setCurrentView('home')}>
                <Icon name="Home" className="mr-2" size={20} />
                Главная
              </Button>
              <Button variant="outline" onClick={() => setCurrentView('profile')}>
                <Icon name="User" className="mr-2" size={20} />
                Профиль
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="all">Все занятия</TabsTrigger>
              <TabsTrigger value="recommended">Для тебя</TabsTrigger>
            </TabsList>

            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <Icon name="SlidersHorizontal" className="mr-2" size={20} />
                Фильтры
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="mb-3 block">Бюджет</Label>
                  <div className="space-y-2">
                    {['free', 'low', 'medium', 'high'].map(budget => (
                      <div key={budget} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={budget}
                          checked={budgetFilter.includes(budget)}
                          onChange={() => {
                            setBudgetFilter(prev =>
                              prev.includes(budget)
                                ? prev.filter(b => b !== budget)
                                : [...prev, budget]
                            );
                          }}
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor={budget} className="cursor-pointer">
                          {budget === 'free' && '💚 Бесплатно'}
                          {budget === 'low' && '💰 До 1000₽'}
                          {budget === 'medium' && '💎 До 3000₽'}
                          {budget === 'high' && '👑 Премиум'}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="mb-3 block">Компания</Label>
                  <div className="space-y-2">
                    {['solo', 'duo', 'group'].map(company => (
                      <div key={company} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={company}
                          checked={companyFilter.includes(company)}
                          onChange={() => {
                            setCompanyFilter(prev =>
                              prev.includes(company)
                                ? prev.filter(c => c !== company)
                                : [...prev, company]
                            );
                          }}
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor={company} className="cursor-pointer">
                          {company === 'solo' && '🧘 Один'}
                          {company === 'duo' && '👥 Вдвоём'}
                          {company === 'group' && '🎉 Компания'}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {(budgetFilter.length > 0 || companyFilter.length > 0) && (
                <Button 
                  variant="ghost" 
                  className="mt-4"
                  onClick={() => {
                    setBudgetFilter([]);
                    setCompanyFilter([]);
                  }}
                >
                  Сбросить фильтры
                </Button>
              )}
            </Card>

            <TabsContent value="all" className="space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredActivities.map(activity => (
                  <Card key={activity.id} className="hover:shadow-lg transition-all hover:scale-105">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                          <Icon name={activity.icon as any} className="text-white" size={24} />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleSave(activity.id)}
                        >
                          <Icon 
                            name={savedActivities.includes(activity.id) ? 'Heart' : 'Heart'} 
                            className={savedActivities.includes(activity.id) ? 'fill-red-500 text-red-500' : ''} 
                            size={20} 
                          />
                        </Button>
                      </div>
                      <CardTitle>{activity.title}</CardTitle>
                      <CardDescription>{activity.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">{activity.category}</Badge>
                        <Badge variant="outline">
                          {activity.budget === 'free' && '💚 Бесплатно'}
                          {activity.budget === 'low' && '💰 До 1000₽'}
                          {activity.budget === 'medium' && '💎 До 3000₽'}
                          {activity.budget === 'high' && '👑 Премиум'}
                        </Badge>
                      </div>
                      <Button className="w-full">
                        Узнать больше
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recommended" className="space-y-4">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg mb-6">
                <h3 className="font-semibold text-lg mb-2">
                  Специально для тебя, {
                    userMood === 'creative' ? '🎨 Творец' :
                    userMood === 'social' ? '🎉 Душа компании' :
                    userMood === 'calm' ? '🧘 Философ' : '⚡ Энерджайзер'
                  }!
                </h3>
                <p className="text-sm text-muted-foreground">
                  Эти занятия идеально подходят твоему характеру и настроению
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedActivities.map(activity => (
                  <Card key={activity.id} className="hover:shadow-lg transition-all hover:scale-105 border-2 border-primary/20">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                          <Icon name={activity.icon as any} className="text-white" size={24} />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleSave(activity.id)}
                        >
                          <Icon 
                            name={savedActivities.includes(activity.id) ? 'Heart' : 'Heart'} 
                            className={savedActivities.includes(activity.id) ? 'fill-red-500 text-red-500' : ''} 
                            size={20} 
                          />
                        </Button>
                      </div>
                      <CardTitle>{activity.title}</CardTitle>
                      <CardDescription>{activity.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">{activity.category}</Badge>
                        <Badge className="bg-gradient-to-r from-primary to-secondary">
                          Рекомендуем
                        </Badge>
                      </div>
                      <Button className="w-full">
                        Узнать больше
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  if (currentView === 'profile') {
    const stats = {
      activitiesTried: 12,
      favoriteCategory: 'Творчество',
      totalHours: 48,
      friendsFound: 7
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-8">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Мой профиль</h1>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setCurrentView('home')}>
                <Icon name="Home" className="mr-2" size={20} />
                Главная
              </Button>
              <Button variant="outline" onClick={() => setCurrentView('catalog')}>
                <Icon name="Grid3x3" className="mr-2" size={20} />
                Каталог
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="md:col-span-1">
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-secondary text-white">
                    АП
                  </AvatarFallback>
                </Avatar>
                <CardTitle>Анна Петрова</CardTitle>
                <CardDescription>
                  {userMood === 'creative' ? '🎨 Творец' :
                   userMood === 'social' ? '🎉 Душа компании' :
                   userMood === 'calm' ? '🧘 Философ' : '⚡ Энерджайзер'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Интересы</span>
                  <Badge>5</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Друзей</span>
                  <Badge>{stats.friendsFound}</Badge>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <Icon name="Settings" className="mr-2" size={18} />
                  Настройки
                </Button>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Статистика активности</CardTitle>
                <CardDescription>Твой прогресс за всё время</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-1">
                      {stats.activitiesTried}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Занятий попробовано
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 p-4 rounded-lg">
                    <div className="text-3xl font-bold text-secondary mb-1">
                      {stats.totalHours}ч
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Всего времени
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Любимая категория</span>
                    <span className="text-sm text-muted-foreground">{stats.favoriteCategory}</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Прогресс этого месяца</span>
                    <span className="text-sm text-muted-foreground">8 из 10 целей</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="saved" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="saved">Сохранённое</TabsTrigger>
              <TabsTrigger value="friends">Друзья</TabsTrigger>
            </TabsList>

            <TabsContent value="saved">
              <Card>
                <CardHeader>
                  <CardTitle>Сохранённые занятия</CardTitle>
                  <CardDescription>
                    {savedActivities.length} занятий в избранном
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {activities.filter(a => savedActivities.includes(a.id)).map(activity => (
                      <div key={activity.id} className="flex gap-4 p-4 rounded-lg border hover:shadow-md transition-all">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                          <Icon name={activity.icon as any} className="text-white" size={24} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{activity.title}</h4>
                          <p className="text-sm text-muted-foreground">{activity.category}</p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => toggleSave(activity.id)}>
                          <Icon name="X" size={18} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="friends">
              <Card>
                <CardHeader>
                  <CardTitle>Друзья по интересам</CardTitle>
                  <CardDescription>
                    {stats.friendsFound} человек с похожими увлечениями
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['Иван Смирнов', 'Мария Козлова', 'Алексей Волков'].map((name, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-lg border hover:shadow-md transition-all">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                            {name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-semibold">{name}</h4>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">Творчество</Badge>
                            <Badge variant="secondary" className="text-xs">Спорт</Badge>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Icon name="MessageCircle" className="mr-2" size={16} />
                          Написать
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">
                      <Icon name="UserPlus" className="mr-2" size={18} />
                      Найти ещё друзей
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  return null;
}