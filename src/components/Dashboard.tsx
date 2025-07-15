import { Users, Phone, Clock, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<any>;
  trend?: string;
  trendUp?: boolean;
  className?: string;
}

function StatCard({ title, value, icon: Icon, trend, trendUp, className }: StatCardProps) {
  return (
    <Card className={`stat-card rtl-fade-in ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sm:pb-3">
        <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="relative">
          <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          {trendUp && <div className="pulse-ring bg-success/20"></div>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground gradient-text mb-1 sm:mb-2">{value}</div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-medium ${trendUp ? 'text-success' : 'text-destructive'}`}>
            <div className={`w-2 h-2 rounded-full ${trendUp ? 'bg-success' : 'bg-destructive'}`}></div>
            <span className="hidden sm:inline">{trend}</span>
            <span className="sm:hidden">{trendUp ? '+' : '-'}{trend.match(/\d+/)?.[0]}%</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface ServiceCall {
  id: string;
  client: string;
  description: string;
  status: 'open' | 'in-progress' | 'closed';
  date: string;
  technician: string;
}

interface HourBank {
  id: string;
  client: string;
  remaining: number;
  total: number;
  status: 'active' | 'low' | 'expired';
}

export function Dashboard() {
  const recentCalls: ServiceCall[] = [
    {
      id: '1',
      client: 'חברת טק סולושנס',
      description: 'בעיה בשרת המייל',
      status: 'open',
      date: '2024-01-15',
      technician: 'יוסי כהן'
    },
    {
      id: '2',
      client: 'משרד עורכי דין רוזן',
      description: 'עדכון מערכת רישוי',
      status: 'in-progress',
      date: '2024-01-14',
      technician: 'שרה לוי'
    },
    {
      id: '3',
      client: 'קליניקת השיניים',
      description: 'התקנת אנטי וירוס',
      status: 'closed',
      date: '2024-01-13',
      technician: 'דני אברהם'
    }
  ];

  const hourBanks: HourBank[] = [
    {
      id: '1',
      client: 'חברת טק סולושנס',
      remaining: 8.5,
      total: 20,
      status: 'active'
    },
    {
      id: '2',
      client: 'משרד עורכי דין רוזן',
      remaining: 2.5,
      total: 15,
      status: 'low'
    },
    {
      id: '3',
      client: 'קליניקת השיניים',
      remaining: 0,
      total: 10,
      status: 'expired'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-info text-info-foreground';
      case 'in-progress': return 'bg-warning text-warning-foreground';
      case 'closed': return 'bg-success text-success-foreground';
      case 'active': return 'bg-success text-success-foreground';
      case 'low': return 'bg-warning text-warning-foreground';
      case 'expired': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return 'פתוח';
      case 'in-progress': return 'בטיפול';
      case 'closed': return 'סגור';
      case 'active': return 'פעיל';
      case 'low': return 'נמוך';
      case 'expired': return 'פג תוקף';
      default: return status;
    }
  };

  return (
    <div className="space-y-8 fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 slide-in-right">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-2">לוח בקרה</h1>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">סקירה כללית של מערכת ניהול השירות</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <Button className="btn-hover-scale premium-card px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium">
            <Phone className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
            קריאה חדשה
          </Button>
          <Button variant="outline" className="btn-hover-scale premium-card px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium">
            <Users className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
            לקוח חדש
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="סה״כ לקוחות"
          value="147"
          icon={Users}
          trend="+12% מהחודש הקודם"
          trendUp={true}
          className="stagger-fade-in"
        />
        <StatCard
          title="קריאות פתוחות"
          value="23"
          icon={Phone}
          trend="-8% מהחודש הקודם"
          trendUp={false}
          className="stagger-fade-in"
        />
        <StatCard
          title="שעות זמינות"
          value="342.5"
          icon={Clock}
          trend="+5% מהחודש הקודם"
          trendUp={true}
          className="stagger-fade-in"
        />
        <StatCard
          title="הכנסות החודש"
          value="₪45,280"
          icon={TrendingUp}
          trend="+18% מהחודש הקודם"
          trendUp={true}
          className="stagger-fade-in"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Recent Service Calls */}
        <Card className="premium-card slide-in-left">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl">
              <div className="relative">
                <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-info rounded-full animate-pulse"></div>
              </div>
              קריאות שירות אחרונות
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCalls.map((call, index) => (
                <div key={call.id} className={`interactive-card p-3 sm:p-4 rounded-xl bg-gradient-to-r from-white to-gray-50 border border-gray-100 stagger-fade-in`} style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                    <div className="flex-1">
                      <p className="font-semibold text-foreground text-base sm:text-lg">{call.client}</p>
                      <p className="text-sm text-muted-foreground mt-1">{call.description}</p>
                      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-2">
                        <span className="w-1 h-1 bg-current rounded-full"></span>
                        {call.date} • {call.technician}
                      </p>
                    </div>
                    <span className={`status-indicator ${getStatusColor(call.status)} text-xs sm:text-sm`}>
                      {getStatusText(call.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-6 premium-card py-3">
              צפה בכל הקריאות
            </Button>
          </CardContent>
        </Card>

        {/* Hour Banks Status */}
        <Card className="premium-card slide-in-right">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl">
              <div className="relative">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-warning rounded-full animate-pulse"></div>
              </div>
              מצב בנקי שעות
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hourBanks.map((bank, index) => (
                <div key={bank.id} className={`interactive-card p-3 sm:p-4 rounded-xl bg-gradient-to-r from-white to-gray-50 border border-gray-100 stagger-fade-in`} style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                    <div className="flex-1">
                      <p className="font-semibold text-foreground text-base sm:text-lg">{bank.client}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {bank.remaining} שעות מתוך {bank.total}
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 mt-2 sm:mt-3 overflow-hidden">
                        <div 
                          className="h-2 sm:h-3 rounded-full bg-gradient-to-r from-primary to-primary-light transition-all duration-1000 ease-out"
                          style={{ width: `${(bank.remaining / bank.total) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className={`status-indicator ${getStatusColor(bank.status)} text-xs sm:text-sm sm:mr-4`}>
                      {getStatusText(bank.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-6 premium-card py-3">
              נהל בנקי שעות
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <Card className="premium-card border-2 border-warning/30 fade-in-up">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 sm:gap-3 text-warning text-lg sm:text-xl">
            <div className="relative">
              <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6" />
              <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-destructive rounded-full animate-pulse"></div>
            </div>
            התראות מערכת
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="interactive-card p-3 sm:p-4 rounded-xl bg-gradient-to-r from-warning/10 to-warning/5 border border-warning/20 stagger-fade-in">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="relative">
                  <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-warning" />
                  <div className="pulse-ring bg-warning/20"></div>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground text-sm sm:text-base">בנק השעות של משרד עורכי דין רוזן קרוב לסיום</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">נותרו 2.5 שעות מתוך 15</p>
                </div>
              </div>
            </div>
            <div className="interactive-card p-3 sm:p-4 rounded-xl bg-gradient-to-r from-destructive/10 to-destructive/5 border border-destructive/20 stagger-fade-in">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="relative">
                  <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-destructive" />
                  <div className="pulse-ring bg-destructive/20"></div>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground text-sm sm:text-base">בנק השעות של קליניקת השיניים פג תוקף</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">יש צורך בחידוש או חיוב נוסף</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}