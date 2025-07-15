import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Clock, AlertCircle, TrendingUp, Calendar, DollarSign, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface HourBank {
  id: string;
  clientId: string;
  clientName: string;
  totalHours: number;
  usedHours: number;
  remainingHours: number;
  hourlyRate: number;
  totalValue: number;
  usedValue: number;
  remainingValue: number;
  purchaseDate: string;
  expirationDate: string;
  status: 'active' | 'expired' | 'depleted' | 'warning';
  isAutoRenewal: boolean;
}

interface HourBankUsage {
  id: string;
  hourBankId: string;
  serviceCallId: string;
  date: string;
  hours: number;
  description: string;
  technician: string;
}

export function HourBanksManager() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const hourBanks: HourBank[] = [
    {
      id: '1',
      clientId: '2',
      clientName: 'משרד עורכי דין רוזן ושות׳',
      totalHours: 100,
      usedHours: 65,
      remainingHours: 35,
      hourlyRate: 350,
      totalValue: 35000,
      usedValue: 22750,
      remainingValue: 12250,
      purchaseDate: '2024-01-05',
      expirationDate: '2024-12-31',
      status: 'active',
      isAutoRenewal: true
    },
    {
      id: '2',
      clientId: '4',
      clientName: 'חברת פיננסים בע״מ',
      totalHours: 50,
      usedHours: 42,
      remainingHours: 8,
      hourlyRate: 400,
      totalValue: 20000,
      usedValue: 16800,
      remainingValue: 3200,
      purchaseDate: '2024-02-01',
      expirationDate: '2024-08-31',
      status: 'warning',
      isAutoRenewal: false
    },
    {
      id: '3',
      clientId: '5',
      clientName: 'מרפאה פרטית ד״ר שמש',
      totalHours: 30,
      usedHours: 30,
      remainingHours: 0,
      hourlyRate: 300,
      totalValue: 9000,
      usedValue: 9000,
      remainingValue: 0,
      purchaseDate: '2023-12-01',
      expirationDate: '2024-06-30',
      status: 'depleted',
      isAutoRenewal: false
    },
    {
      id: '4',
      clientId: '6',
      clientName: 'חברת הנדסה בע״מ',
      totalHours: 200,
      usedHours: 45,
      remainingHours: 155,
      hourlyRate: 380,
      totalValue: 76000,
      usedValue: 17100,
      remainingValue: 58900,
      purchaseDate: '2024-03-15',
      expirationDate: '2025-03-15',
      status: 'active',
      isAutoRenewal: true
    }
  ];

  const hourBankUsages: HourBankUsage[] = [
    {
      id: '1',
      hourBankId: '1',
      serviceCallId: 'SC001',
      date: '2024-01-10',
      hours: 3,
      description: 'התקנת מערכת גיבוי חדשה',
      technician: 'דני לוי'
    },
    {
      id: '2',
      hourBankId: '1',
      serviceCallId: 'SC002',
      date: '2024-01-15',
      hours: 2,
      description: 'עדכון מערכת אנטי וירוס',
      technician: 'שרה כהן'
    }
  ];

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'פעיל';
      case 'expired': return 'פג תוקף';
      case 'depleted': return 'מוצה';
      case 'warning': return 'אזהרה';
      default: return status;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'expired': return 'bg-red-100 text-red-800 border-red-200';
      case 'depleted': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getUsagePercentage = (used: number, total: number) => {
    return (used / total) * 100;
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-red-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const filteredHourBanks = hourBanks.filter(bank => {
    const matchesSearch = bank.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || bank.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalStatistics = {
    totalBanks: hourBanks.length,
    activeBanks: hourBanks.filter(b => b.status === 'active').length,
    totalValue: hourBanks.reduce((sum, bank) => sum + bank.totalValue, 0),
    usedValue: hourBanks.reduce((sum, bank) => sum + bank.usedValue, 0),
    remainingValue: hourBanks.reduce((sum, bank) => sum + bank.remainingValue, 0),
    totalHours: hourBanks.reduce((sum, bank) => sum + bank.totalHours, 0),
    usedHours: hourBanks.reduce((sum, bank) => sum + bank.usedHours, 0),
    remainingHours: hourBanks.reduce((sum, bank) => sum + bank.remainingHours, 0)
  };

  return (
    <div className="space-y-8 fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between slide-in-right">
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-2">ניהול בנקי שעות</h1>
          <p className="text-muted-foreground text-lg">נהל בנקי שעות, מעקב אחר צריכה ותוקף</p>
        </div>
        <Button className="btn-hover-scale premium-card px-6 py-3 text-base font-medium">
          <Plus className="h-5 w-5 ml-2" />
          בנק שעות חדש
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="premium-card slide-in-left">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">סה״כ בנקים</p>
                <p className="text-3xl font-bold text-foreground">{totalStatistics.totalBanks}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card slide-in-left" style={{animationDelay: '0.1s'}}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">בנקים פעילים</p>
                <p className="text-3xl font-bold text-green-600">{totalStatistics.activeBanks}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card slide-in-left" style={{animationDelay: '0.2s'}}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">סה״כ שעות</p>
                <p className="text-3xl font-bold text-primary">{totalStatistics.totalHours}</p>
                <p className="text-xs text-muted-foreground">נוצלו: {totalStatistics.usedHours}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <Clock className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card slide-in-left" style={{animationDelay: '0.3s'}}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">ערך כולל</p>
                <p className="text-3xl font-bold text-primary">₪{totalStatistics.totalValue.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">נותר: ₪{totalStatistics.remainingValue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="premium-card slide-in-left">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 modern-search">
              <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="חיפוש לפי שם לקוח..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 border-0 bg-transparent focus:ring-0 placeholder:text-muted-foreground/70"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedStatus === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedStatus('all')}
                size="sm"
                className="premium-card"
              >
                הכל
              </Button>
              <Button
                variant={selectedStatus === 'active' ? 'default' : 'outline'}
                onClick={() => setSelectedStatus('active')}
                size="sm"
                className="premium-card"
              >
                פעיל
              </Button>
              <Button
                variant={selectedStatus === 'warning' ? 'default' : 'outline'}
                onClick={() => setSelectedStatus('warning')}
                size="sm"
                className="premium-card"
              >
                אזהרה
              </Button>
              <Button
                variant={selectedStatus === 'depleted' ? 'default' : 'outline'}
                onClick={() => setSelectedStatus('depleted')}
                size="sm"
                className="premium-card"
              >
                מוצה
              </Button>
              <Button
                variant={selectedStatus === 'expired' ? 'default' : 'outline'}
                onClick={() => setSelectedStatus('expired')}
                size="sm"
                className="premium-card"
              >
                פג תוקף
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hour Banks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredHourBanks.map((bank, index) => (
          <Card key={bank.id} className="interactive-card group stagger-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl font-bold text-foreground mb-2">
                    {bank.clientName}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getStatusBadge(bank.status)} status-indicator`}>
                      {getStatusText(bank.status)}
                    </Badge>
                    {bank.isAutoRenewal && (
                      <Badge variant="outline" className="text-xs">
                        חידוש אוטומטי
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Button variant="ghost" size="sm" className="premium-card">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="premium-card">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Usage Progress */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">ניצול שעות</span>
                  <span className="text-sm text-muted-foreground">
                    {bank.usedHours} / {bank.totalHours} שעות
                  </span>
                </div>
                <Progress 
                  value={getUsagePercentage(bank.usedHours, bank.totalHours)} 
                  className="h-3"
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>נותרו: {bank.remainingHours} שעות</span>
                  <span>{getUsagePercentage(bank.usedHours, bank.totalHours).toFixed(1)}% נוצל</span>
                </div>
              </div>

              {/* Financial Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="premium-card p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">ערך כולל</span>
                  </div>
                  <p className="text-xl font-bold text-primary">₪{bank.totalValue.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">₪{bank.hourlyRate} לשעה</p>
                </div>
                <div className="premium-card p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-foreground">נותר</span>
                  </div>
                  <p className="text-xl font-bold text-green-600">₪{bank.remainingValue.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{bank.remainingHours} שעות</p>
                </div>
              </div>

              {/* Dates */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>נרכש: {bank.purchaseDate}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <AlertCircle className="h-4 w-4" />
                  <span>תוקף: {bank.expirationDate}</span>
                </div>
              </div>

              {/* Warning for low hours */}
              {bank.remainingHours <= 10 && bank.status === 'active' && (
                <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm text-yellow-800">
                    נותרו מעט שעות - שקול לחדש את הבנק
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredHourBanks.length === 0 && (
        <Card className="premium-card fade-in-up">
          <CardContent className="p-16 text-center">
            <div className="space-y-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">לא נמצאו בנקי שעות</h3>
                <p className="text-muted-foreground text-lg">
                  {searchTerm ? 'נסה לשנות את מילות החיפוש' : 'התחל על ידי יצירת בנק שעות חדש'}
                </p>
              </div>
              {!searchTerm && (
                <Button className="premium-card px-8 py-3 text-base">
                  <Plus className="h-5 w-5 ml-2" />
                  צור בנק שעות חדש
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}