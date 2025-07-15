import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Phone, Mail, MapPin, Clock, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Client {
  id: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  clientType: 'retainer' | 'hourly' | 'hour_bank';
  hourlyRate?: number;
  services: string[];
  createdAt: string;
}

export function ClientsManager() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const clients: Client[] = [
    {
      id: '1',
      companyName: 'חברת טק סולושנס בע״מ',
      contactPerson: 'דוד כהן',
      phone: '03-1234567',
      email: 'david@techsolutions.co.il',
      address: 'רחוב הרצל 15, תל אביב',
      clientType: 'retainer',
      services: ['Microsoft 365', 'גיבוי ענן', 'אנטי וירוס'],
      createdAt: '2024-01-10'
    },
    {
      id: '2',
      companyName: 'משרד עורכי דין רוזן ושות׳',
      contactPerson: 'שרה רוזן',
      phone: '02-9876543',
      email: 'sara@rozenlaw.co.il',
      address: 'רחוב בן יהודה 8, ירושלים',
      clientType: 'hour_bank',
      hourlyRate: 350,
      services: ['Microsoft 365', 'VPN'],
      createdAt: '2024-01-05'
    },
    {
      id: '3',
      companyName: 'קליניקת השיניים ד״ר לוי',
      contactPerson: 'ד״ר מיכל לוי',
      phone: '09-5555555',
      email: 'clinic@levy-dental.co.il',
      address: 'רחוב וייצמן 42, נתניה',
      clientType: 'hourly',
      hourlyRate: 300,
      services: ['גיבוי ענן', 'אנטי וירוס'],
      createdAt: '2024-01-15'
    }
  ];

  const getClientTypeText = (type: string) => {
    switch (type) {
      case 'retainer': return 'ריטיינר';
      case 'hour_bank': return 'בנק שעות';
      case 'hourly': return 'שעתי';
      default: return type;
    }
  };

  const getClientTypeBadge = (type: string) => {
    switch (type) {
      case 'retainer': return 'bg-primary text-primary-foreground';
      case 'hour_bank': return 'bg-secondary text-secondary-foreground';
      case 'hourly': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || client.clientType === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-8 fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between slide-in-right">
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-2">ניהול לקוחות</h1>
          <p className="text-muted-foreground text-lg">נהל את כל הלקוחות והפרטים שלהם</p>
        </div>
        <Button className="btn-hover-scale premium-card px-6 py-3 text-base font-medium">
          <Plus className="h-5 w-5 ml-2" />
          לקוח חדש
        </Button>
      </div>

      {/* Filters */}
      <Card className="premium-card slide-in-left">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 modern-search">
              <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="חיפוש לפי שם חברה או איש קשר..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 border-0 bg-transparent focus:ring-0 placeholder:text-muted-foreground/70"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedType === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedType('all')}
                size="sm"
                className="premium-card"
              >
                כל הלקוחות
              </Button>
              <Button
                variant={selectedType === 'retainer' ? 'default' : 'outline'}
                onClick={() => setSelectedType('retainer')}
                size="sm"
                className="premium-card"
              >
                ריטיינר
              </Button>
              <Button
                variant={selectedType === 'hour_bank' ? 'default' : 'outline'}
                onClick={() => setSelectedType('hour_bank')}
                size="sm"
                className="premium-card"
              >
                בנק שעות
              </Button>
              <Button
                variant={selectedType === 'hourly' ? 'default' : 'outline'}
                onClick={() => setSelectedType('hourly')}
                size="sm"
                className="premium-card"
              >
                שעתי
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredClients.map((client, index) => (
          <Card key={client.id} className="interactive-card group stagger-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-foreground mb-2">
                    {client.companyName}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {client.contactPerson}
                  </p>
                </div>
                <Badge className={`${getClientTypeBadge(client.clientType)} status-indicator`}>
                  {getClientTypeText(client.clientType)}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium">{client.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium">{client.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium">{client.address}</span>
                </div>
              </div>

              {/* Hourly Rate */}
              {client.hourlyRate && (
                <div className="flex items-center gap-3 text-sm font-medium text-primary premium-card p-3 rounded-lg">
                  <DollarSign className="h-5 w-5" />
                  <span className="text-lg font-bold">₪{client.hourlyRate} לשעה</span>
                </div>
              )}

              {/* Services */}
              <div>
                <p className="text-sm font-semibold text-foreground mb-3">שירותים:</p>
                <div className="flex flex-wrap gap-2">
                  {client.services.map((service) => (
                    <Badge key={service} variant="secondary" className="text-xs font-medium px-3 py-1">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center pt-4 border-t border-border/50">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{client.createdAt}</span>
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
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredClients.length === 0 && (
        <Card className="premium-card fade-in-up">
          <CardContent className="p-16 text-center">
            <div className="space-y-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">לא נמצאו לקוחות</h3>
                <p className="text-muted-foreground text-lg">
                  {searchTerm ? 'נסה לשנות את מילות החיפוש' : 'התחל על ידי הוספת לקוח חדש'}
                </p>
              </div>
              {!searchTerm && (
                <Button className="premium-card px-8 py-3 text-base">
                  <Plus className="h-5 w-5 ml-2" />
                  הוסף לקוח חדש
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}