import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';
import { Calendar, Download, TrendingUp, TrendingDown, DollarSign, Clock, Users, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ReportData {
  month: string;
  revenue: number;
  hours: number;
  clients: number;
  serviceCalls: number;
}

interface ClientRevenueData {
  name: string;
  revenue: number;
  percentage: number;
}

interface ServiceCallStatusData {
  status: string;
  count: number;
  percentage: number;
}

export function ReportsManager() {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [selectedReportType, setSelectedReportType] = useState('overview');

  const revenueData: ReportData[] = [
    { month: 'ינואר', revenue: 45000, hours: 120, clients: 15, serviceCalls: 25 },
    { month: 'פברואר', revenue: 52000, hours: 140, clients: 18, serviceCalls: 30 },
    { month: 'מרץ', revenue: 48000, hours: 135, clients: 16, serviceCalls: 28 },
    { month: 'אפריל', revenue: 55000, hours: 150, clients: 20, serviceCalls: 35 },
    { month: 'מאי', revenue: 62000, hours: 165, clients: 22, serviceCalls: 40 },
    { month: 'יוני', revenue: 58000, hours: 155, clients: 21, serviceCalls: 38 }
  ];

  const clientRevenueData: ClientRevenueData[] = [
    { name: 'חברת טק סולושנס', revenue: 25000, percentage: 35 },
    { name: 'משרד עורכי דין רוזן', revenue: 18000, percentage: 25 },
    { name: 'קליניקת השיניים', revenue: 12000, percentage: 17 },
    { name: 'חברת פיננסים', revenue: 10000, percentage: 14 },
    { name: 'אחרים', revenue: 6500, percentage: 9 }
  ];

  const serviceCallStatusData: ServiceCallStatusData[] = [
    { status: 'סגור', count: 145, percentage: 65 },
    { status: 'בטיפול', count: 45, percentage: 20 },
    { status: 'פתוח', count: 25, percentage: 11 },
    { status: 'בהמתנה', count: 8, percentage: 4 }
  ];

  const monthlyGrowthData = [
    { month: 'ינואר', current: 45000, previous: 42000 },
    { month: 'פברואר', current: 52000, previous: 48000 },
    { month: 'מרץ', current: 48000, previous: 45000 },
    { month: 'אפריל', current: 55000, previous: 50000 },
    { month: 'מאי', current: 62000, previous: 55000 },
    { month: 'יוני', current: 58000, previous: 52000 }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const currentMonth = revenueData[revenueData.length - 1];
  const previousMonth = revenueData[revenueData.length - 2];
  const revenueGrowth = ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue) * 100;
  const hoursGrowth = ((currentMonth.hours - previousMonth.hours) / previousMonth.hours) * 100;

  const totalStatistics = {
    totalRevenue: revenueData.reduce((sum, item) => sum + item.revenue, 0),
    totalHours: revenueData.reduce((sum, item) => sum + item.hours, 0),
    totalClients: Math.max(...revenueData.map(item => item.clients)),
    totalServiceCalls: revenueData.reduce((sum, item) => sum + item.serviceCalls, 0),
    averageHourlyRate: revenueData.reduce((sum, item) => sum + item.revenue, 0) / revenueData.reduce((sum, item) => sum + item.hours, 0),
    avgCallsPerMonth: revenueData.reduce((sum, item) => sum + item.serviceCalls, 0) / revenueData.length
  };

  const formatCurrency = (amount: number) => {
    return `₪${amount.toLocaleString()}`;
  };

  const formatGrowth = (growth: number) => {
    const isPositive = growth > 0;
    const icon = isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />;
    const color = isPositive ? 'text-green-600' : 'text-red-600';
    return (
      <div className={`flex items-center gap-1 ${color}`}>
        {icon}
        <span>{Math.abs(growth).toFixed(1)}%</span>
      </div>
    );
  };

  return (
    <div className="space-y-8 fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 slide-in-right">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-2">דוחות ואנליטיקה</h1>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">תובנות עסקיות וניתוח ביצועים</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-full sm:w-40 premium-card">
              <SelectValue placeholder="בחר תקופה" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">3 חודשים</SelectItem>
              <SelectItem value="6months">6 חודשים</SelectItem>
              <SelectItem value="12months">12 חודשים</SelectItem>
            </SelectContent>
          </Select>
          <Button className="btn-hover-scale premium-card px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium">
            <Download className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
            ייצא דוח
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="premium-card slide-in-left">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">סה״כ הכנסות</p>
                <p className="text-3xl font-bold text-foreground">{formatCurrency(totalStatistics.totalRevenue)}</p>
                <div className="flex items-center gap-2 mt-1">
                  {formatGrowth(revenueGrowth)}
                  <span className="text-xs text-muted-foreground">לעומת חודש קודם</span>
                </div>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card slide-in-left" style={{animationDelay: '0.1s'}}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">סה״כ שעות</p>
                <p className="text-3xl font-bold text-foreground">{totalStatistics.totalHours}</p>
                <div className="flex items-center gap-2 mt-1">
                  {formatGrowth(hoursGrowth)}
                  <span className="text-xs text-muted-foreground">לעומת חודש קודם</span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card slide-in-left" style={{animationDelay: '0.2s'}}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">לקוחות פעילים</p>
                <p className="text-3xl font-bold text-foreground">{totalStatistics.totalClients}</p>
                <p className="text-sm text-muted-foreground">ממוצע שעתי: {formatCurrency(totalStatistics.averageHourlyRate)}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card slide-in-left" style={{animationDelay: '0.3s'}}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">קריאות שירות</p>
                <p className="text-3xl font-bold text-foreground">{totalStatistics.totalServiceCalls}</p>
                <p className="text-sm text-muted-foreground">ממוצע חודשי: {totalStatistics.avgCallsPerMonth.toFixed(1)}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Trend Chart */}
      <Card className="premium-card slide-in-up">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground">מגמת הכנסות חודשית</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [formatCurrency(value), 'הכנסות']}
                  labelStyle={{ direction: 'rtl' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3B82F6" 
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Hours and Service Calls Chart */}
        <Card className="premium-card slide-in-left">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground">שעות עבודה וקריאות שירות</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      value,
                      name === 'hours' ? 'שעות' : 'קריאות שירות'
                    ]}
                    labelStyle={{ direction: 'rtl' }}
                  />
                  <Bar dataKey="hours" fill="#10B981" name="hours" />
                  <Bar dataKey="serviceCalls" fill="#F59E0B" name="serviceCalls" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Client Revenue Distribution */}
        <Card className="premium-card slide-in-right">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground">התפלגות הכנסות לפי לקוח</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={clientRevenueData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} (${percentage}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="revenue"
                  >
                    {clientRevenueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [formatCurrency(value), 'הכנסות']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Call Status and Client Revenue Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Service Call Status */}
        <Card className="premium-card slide-in-left">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground">סטטוס קריאות שירות</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {serviceCallStatusData.map((item, index) => (
                <div key={item.status} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full`} style={{backgroundColor: COLORS[index % COLORS.length]}}></div>
                    <span className="font-medium text-foreground">{item.status}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="text-sm">
                      {item.count} ({item.percentage}%)
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Clients by Revenue */}
        <Card className="premium-card slide-in-right">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground">לקוחות מובילים</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clientRevenueData.slice(0, 4).map((client, index) => (
                <div key={client.name} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{index + 1}</span>
                    </div>
                    <span className="font-medium text-foreground">{client.name}</span>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-primary">{formatCurrency(client.revenue)}</p>
                    <p className="text-sm text-muted-foreground">{client.percentage}% מהכנסות</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Growth Comparison */}
      <Card className="premium-card slide-in-up">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground">השוואה לתקופה הקודמת</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number, name: string) => [
                    formatCurrency(value),
                    name === 'current' ? 'תקופה נוכחית' : 'תקופה קודמת'
                  ]}
                  labelStyle={{ direction: 'rtl' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="current" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  name="current"
                />
                <Line 
                  type="monotone" 
                  dataKey="previous" 
                  stroke="#94A3B8" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="previous"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card className="premium-card slide-in-up">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground">תובנות מרכזיות</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">צמיחה חיובית</p>
                  <p className="text-sm text-green-700">הכנסות גדלו ב-{revenueGrowth.toFixed(1)}% בחודש האחרון</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-800">יעילות גבוהה</p>
                  <p className="text-sm text-blue-700">ממוצע שעתי: {formatCurrency(totalStatistics.averageHourlyRate)}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="font-medium text-yellow-800">לקוח מוביל</p>
                  <p className="text-sm text-yellow-700">{clientRevenueData[0].name} מייצר {clientRevenueData[0].percentage}% מההכנסות</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <FileText className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium text-purple-800">קריאות שירות</p>
                  <p className="text-sm text-purple-700">65% מהקריאות נסגרו בהצלחה</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}