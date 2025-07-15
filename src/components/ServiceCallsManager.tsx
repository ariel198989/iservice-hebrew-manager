import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Clock, User, Calendar, FileText, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ServiceCall {
  id: string;
  client: string;
  technician: string;
  date: string;
  description: string;
  duration: number;
  status: 'open' | 'in-progress' | 'closed';
  billingType: 'hour_bank' | 'hourly';
  hourBankId?: string;
  equipmentSupplied?: string[];
  notes?: string;
  createdAt: string;
}

export function ServiceCallsManager() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);

  const serviceCalls: ServiceCall[] = [
    {
      id: '1',
      client: 'חברת טק סולושנס בע״מ',
      technician: 'יוסי כהן',
      date: '2024-01-15',
      description: 'פתרון בעיה בשרת המייל - שרת Exchange לא מגיב כראוי, בוצע restart ועדכון התוכנה',
      duration: 2.5,
      status: 'open',
      billingType: 'hour_bank',
      hourBankId: '1',
      equipmentSupplied: ['כבל רשת', 'מתאם USB'],
      notes: 'נדרש מעקב נוסף בשבוע הבא',
      createdAt: '2024-01-15 09:30'
    },
    {
      id: '2',
      client: 'משרד עורכי דין רוזן ושות׳',
      technician: 'שרה לוי',
      date: '2024-01-14',
      description: 'עדכון מערכת רישוי Microsoft 365 והוספת משתמשים חדשים',
      duration: 1.5,
      status: 'in-progress',
      billingType: 'hour_bank',
      hourBankId: '2',
      createdAt: '2024-01-14 14:15'
    },
    {
      id: '3',
      client: 'קליניקת השיניים ד״ר לוי',
      technician: 'דני אברהם',
      date: '2024-01-13',
      description: 'התקנת תוכנת אנטי וירוס על כל המחשבים במשרד',
      duration: 3.0,
      status: 'closed',
      billingType: 'hourly',
      equipmentSupplied: ['רישיון אנטי וירוס'],
      createdAt: '2024-01-13 10:00'
    },
    {
      id: '4',
      client: 'חברת טק סולושנס בע״מ',
      technician: 'יוסי כהן',
      date: '2024-01-12',
      description: 'גיבוי נתונים חודשי ובדיקת תקינות המערכת',
      duration: 1.0,
      status: 'closed',
      billingType: 'hour_bank',
      hourBankId: '1',
      createdAt: '2024-01-12 16:30'
    }
  ];

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return 'פתוח';
      case 'in-progress': return 'בטיפול';
      case 'closed': return 'סגור';
      default: return status;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open': return 'bg-info text-info-foreground';
      case 'in-progress': return 'bg-warning text-warning-foreground';
      case 'closed': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getBillingTypeText = (type: string) => {
    switch (type) {
      case 'hour_bank': return 'בנק שעות';
      case 'hourly': return 'חיוב שעתי';
      default: return type;
    }
  };

  const getBillingTypeBadge = (type: string) => {
    switch (type) {
      case 'hour_bank': return 'bg-secondary text-secondary-foreground';
      case 'hourly': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const filteredCalls = serviceCalls.filter(call => {
    const matchesSearch = call.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         call.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         call.technician.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || call.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalHours = serviceCalls.reduce((sum, call) => sum + call.duration, 0);
  const openCalls = serviceCalls.filter(call => call.status === 'open').length;
  const inProgressCalls = serviceCalls.filter(call => call.status === 'in-progress').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">קריאות שירות</h1>
          <p className="text-muted-foreground">נהל את כל הקריאות והמעקב אחר הטיפול</p>
        </div>
        <Button className="btn-hover-scale">
          <Plus className="h-4 w-4 ml-2" />
          קריאה חדשה
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="professional-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">סה״כ קריאות</p>
                <p className="text-2xl font-bold text-foreground">{serviceCalls.length}</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="professional-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">קריאות פתוחות</p>
                <p className="text-2xl font-bold text-info">{openCalls}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-info" />
            </div>
          </CardContent>
        </Card>

        <Card className="professional-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">בטיפול</p>
                <p className="text-2xl font-bold text-warning">{inProgressCalls}</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="professional-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">סה״כ שעות</p>
                <p className="text-2xl font-bold text-success">{totalHours}</p>
              </div>
              <User className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="professional-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="חיפוש לפי לקוח, תיאור או טכנאי..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="professional-input pr-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedStatus === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedStatus('all')}
                size="sm"
              >
                כל הקריאות
              </Button>
              <Button
                variant={selectedStatus === 'open' ? 'info' : 'outline'}
                onClick={() => setSelectedStatus('open')}
                size="sm"
              >
                פתוח
              </Button>
              <Button
                variant={selectedStatus === 'in-progress' ? 'warning' : 'outline'}
                onClick={() => setSelectedStatus('in-progress')}
                size="sm"
              >
                בטיפול
              </Button>
              <Button
                variant={selectedStatus === 'closed' ? 'success' : 'outline'}
                onClick={() => setSelectedStatus('closed')}
                size="sm"
              >
                סגור
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Calls List */}
      <div className="space-y-4">
        {filteredCalls.map((call) => (
          <Card key={call.id} className="professional-card group">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-lg font-semibold text-foreground">
                      {call.client}
                    </CardTitle>
                    <Badge className={getStatusBadge(call.status)}>
                      {getStatusText(call.status)}
                    </Badge>
                    <Badge variant="outline" className={getBillingTypeBadge(call.billingType)}>
                      {getBillingTypeText(call.billingType)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {call.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {call.technician}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {call.duration} שעות
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              {/* Description */}
              <div>
                <p className="text-sm font-medium text-foreground mb-1">תיאור:</p>
                <p className="text-sm text-muted-foreground">{call.description}</p>
              </div>

              {/* Equipment */}
              {call.equipmentSupplied && call.equipmentSupplied.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">ציוד שסופק:</p>
                  <div className="flex flex-wrap gap-1">
                    {call.equipmentSupplied.map((equipment) => (
                      <Badge key={equipment} variant="secondary" className="text-xs">
                        {equipment}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {call.notes && (
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">הערות:</p>
                  <p className="text-sm text-muted-foreground">{call.notes}</p>
                </div>
              )}

              {/* Footer */}
              <div className="flex justify-between items-center pt-3 border-t border-border">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  נוצר: {call.createdAt}
                </div>
                <div className="text-xs text-muted-foreground">
                  קריאה #{call.id}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredCalls.length === 0 && (
        <Card className="professional-card">
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">לא נמצאו קריאות</h3>
                <p className="text-muted-foreground">
                  {searchTerm ? 'נסה לשנות את מילות החיפוש' : 'התחל על ידי פתיחת קריאה חדשה'}
                </p>
              </div>
              {!searchTerm && (
                <Button>
                  <Plus className="h-4 w-4 ml-2" />
                  פתח קריאה חדשה
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}