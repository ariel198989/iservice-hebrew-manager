import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Package, Truck, MapPin, Phone, Mail, AlertCircle, CheckCircle, Clock, DollarSign, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Equipment {
  id: string;
  name: string;
  category: string;
  brand: string;
  model: string;
  serialNumber: string;
  purchaseDate: string;
  purchasePrice: number;
  supplierId: string;
  supplierName: string;
  status: 'available' | 'in_use' | 'maintenance' | 'retired';
  location: string;
  assignedTo?: string;
  warrantyExpiry?: string;
  notes?: string;
}

interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  categories: string[];
  status: 'active' | 'inactive';
  rating: number;
  lastOrder?: string;
  totalOrders: number;
  notes?: string;
}

export function EquipmentManager() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('equipment');

  const equipment: Equipment[] = [
    {
      id: '1',
      name: 'נתב Wi-Fi 6',
      category: 'רשת',
      brand: 'TP-Link',
      model: 'AX3000',
      serialNumber: 'TPL-AX3000-001',
      purchaseDate: '2024-01-15',
      purchasePrice: 450,
      supplierId: '1',
      supplierName: 'טכנולוגיות מתקדמות',
      status: 'in_use',
      location: 'מחסן מרכזי',
      assignedTo: 'חברת טק סולושנס',
      warrantyExpiry: '2026-01-15',
      notes: 'מותקן אצל הלקוח ב-15/01/2024'
    },
    {
      id: '2',
      name: 'מחשב נייד Dell',
      category: 'מחשבים',
      brand: 'Dell',
      model: 'Latitude 5520',
      serialNumber: 'DL-LAT5520-002',
      purchaseDate: '2024-02-01',
      purchasePrice: 3200,
      supplierId: '2',
      supplierName: 'מחשבים ופתרונות',
      status: 'available',
      location: 'מחסן מרכזי',
      warrantyExpiry: '2027-02-01',
      notes: 'מחשב חדש, מוכן להתקנה'
    },
    {
      id: '3',
      name: 'מקרן NEC',
      category: 'תצוגה',
      brand: 'NEC',
      model: 'V302X',
      serialNumber: 'NEC-V302X-003',
      purchaseDate: '2023-12-10',
      purchasePrice: 2800,
      supplierId: '3',
      supplierName: 'פתרונות AV',
      status: 'maintenance',
      location: 'מעבדה',
      assignedTo: 'משרד עורכי דין רוזן',
      warrantyExpiry: '2025-12-10',
      notes: 'בתיקון - נורת המקרן'
    },
    {
      id: '4',
      name: 'מערכת גיבוי Synology',
      category: 'אחסון',
      brand: 'Synology',
      model: 'DS920+',
      serialNumber: 'SYN-DS920-004',
      purchaseDate: '2024-01-20',
      purchasePrice: 1800,
      supplierId: '1',
      supplierName: 'טכנולוגיות מתקדמות',
      status: 'in_use',
      location: 'אצל לקוח',
      assignedTo: 'קליניקת השיניים',
      warrantyExpiry: '2026-01-20'
    }
  ];

  const suppliers: Supplier[] = [
    {
      id: '1',
      name: 'טכנולוגיות מתקדמות בע״מ',
      contactPerson: 'אבי כהן',
      phone: '03-9876543',
      email: 'avi@techadvanced.co.il',
      address: 'רחוב הרצל 25, תל אביב',
      categories: ['רשת', 'אחסון', 'אבטחה'],
      status: 'active',
      rating: 4.8,
      lastOrder: '2024-01-20',
      totalOrders: 15,
      notes: 'ספק מעולה, משלוח מהיר'
    },
    {
      id: '2',
      name: 'מחשבים ופתרונות בע״מ',
      contactPerson: 'דנה לוי',
      phone: '02-5554321',
      email: 'dana@computers-sol.co.il',
      address: 'רחוב בן יהודה 12, ירושלים',
      categories: ['מחשבים', 'רכיבים', 'תוכנה'],
      status: 'active',
      rating: 4.5,
      lastOrder: '2024-02-01',
      totalOrders: 8,
      notes: 'מחירים תחרותיים, שירות טוב'
    },
    {
      id: '3',
      name: 'פתרונות AV בע״מ',
      contactPerson: 'מיכל שמש',
      phone: '09-7778888',
      email: 'michal@av-solutions.co.il',
      address: 'רחוב וייצמן 8, נתניה',
      categories: ['תצוגה', 'שמע', 'ועידה'],
      status: 'active',
      rating: 4.2,
      lastOrder: '2023-12-10',
      totalOrders: 4,
      notes: 'מתמחים בפתרונות AV'
    },
    {
      id: '4',
      name: 'חלקי חילוף מהירים',
      contactPerson: 'רון דוד',
      phone: '04-1112223',
      email: 'ron@fastparts.co.il',
      address: 'רחוב הנביאים 15, חיפה',
      categories: ['רכיבים', 'חלקי חילוף'],
      status: 'inactive',
      rating: 3.8,
      lastOrder: '2023-08-15',
      totalOrders: 12,
      notes: 'ספק לא פעיל יותר'
    }
  ];

  const getEquipmentStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'זמין';
      case 'in_use': return 'בשימוש';
      case 'maintenance': return 'בתחזוקה';
      case 'retired': return 'הושבת';
      default: return status;
    }
  };

  const getEquipmentStatusBadge = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 border-green-200';
      case 'in_use': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'retired': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getSupplierStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getRatingStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`text-lg ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const equipmentStats = {
    total: equipment.length,
    available: equipment.filter(e => e.status === 'available').length,
    inUse: equipment.filter(e => e.status === 'in_use').length,
    maintenance: equipment.filter(e => e.status === 'maintenance').length,
    totalValue: equipment.reduce((sum, item) => sum + item.purchasePrice, 0)
  };

  const supplierStats = {
    total: suppliers.length,
    active: suppliers.filter(s => s.status === 'active').length,
    totalOrders: suppliers.reduce((sum, supplier) => sum + supplier.totalOrders, 0),
    avgRating: suppliers.reduce((sum, supplier) => sum + supplier.rating, 0) / suppliers.length
  };

  return (
    <div className="space-y-8 fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between slide-in-right">
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-2">ניהול ציוד וספקים</h1>
          <p className="text-muted-foreground text-lg">נהל מלאי ציוד וקשרי ספקים</p>
        </div>
        <Button className="btn-hover-scale premium-card px-6 py-3 text-base font-medium">
          <Plus className="h-5 w-5 ml-2" />
          {activeTab === 'equipment' ? 'ציוד חדש' : 'ספק חדש'}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 premium-card">
          <TabsTrigger value="equipment" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            ציוד
          </TabsTrigger>
          <TabsTrigger value="suppliers" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            ספקים
          </TabsTrigger>
        </TabsList>

        {/* Equipment Tab */}
        <TabsContent value="equipment" className="space-y-6">
          {/* Equipment Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <Card className="premium-card slide-in-left">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">סה״כ ציוד</p>
                    <p className="text-3xl font-bold text-foreground">{equipmentStats.total}</p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="premium-card slide-in-left" style={{animationDelay: '0.1s'}}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">זמין</p>
                    <p className="text-3xl font-bold text-green-600">{equipmentStats.available}</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="premium-card slide-in-left" style={{animationDelay: '0.2s'}}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">בשימוש</p>
                    <p className="text-3xl font-bold text-blue-600">{equipmentStats.inUse}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="premium-card slide-in-left" style={{animationDelay: '0.3s'}}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">בתחזוקה</p>
                    <p className="text-3xl font-bold text-yellow-600">{equipmentStats.maintenance}</p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <AlertCircle className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="premium-card slide-in-left" style={{animationDelay: '0.4s'}}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">ערך כולל</p>
                    <p className="text-3xl font-bold text-primary">₪{equipmentStats.totalValue.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-full">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Equipment Filters */}
          <Card className="premium-card slide-in-left">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 modern-search">
                  <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="חיפוש ציוד לפי שם, דגם או יצרן..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10 border-0 bg-transparent focus:ring-0 placeholder:text-muted-foreground/70"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={selectedCategory === 'all' ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory('all')}
                    size="sm"
                    className="premium-card"
                  >
                    כל הקטגוריות
                  </Button>
                  <Button
                    variant={selectedCategory === 'רשת' ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory('רשת')}
                    size="sm"
                    className="premium-card"
                  >
                    רשת
                  </Button>
                  <Button
                    variant={selectedCategory === 'מחשבים' ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory('מחשבים')}
                    size="sm"
                    className="premium-card"
                  >
                    מחשבים
                  </Button>
                  <Button
                    variant={selectedCategory === 'אחסון' ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory('אחסון')}
                    size="sm"
                    className="premium-card"
                  >
                    אחסון
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Equipment List */}
          <div className="space-y-6">
            {filteredEquipment.map((item, index) => (
              <Card key={item.id} className="interactive-card group stagger-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-foreground">{item.name}</h3>
                        <Badge className={`${getEquipmentStatusBadge(item.status)} status-indicator`}>
                          {getEquipmentStatusText(item.status)}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Basic Info */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Package className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">קטגוריה:</span>
                            <span className="text-foreground font-medium">{item.category}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-muted-foreground">יצרן:</span>
                            <span className="text-foreground font-medium">{item.brand} {item.model}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-muted-foreground">מספר סידורי:</span>
                            <span className="text-foreground font-medium">{item.serialNumber}</span>
                          </div>
                        </div>

                        {/* Location & Assignment */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">מיקום:</span>
                            <span className="text-foreground font-medium">{item.location}</span>
                          </div>
                          {item.assignedTo && (
                            <div className="flex items-center gap-2 text-sm">
                              <Building className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">הוקצה ל:</span>
                              <span className="text-foreground font-medium">{item.assignedTo}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-sm">
                            <Truck className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">ספק:</span>
                            <span className="text-foreground font-medium">{item.supplierName}</span>
                          </div>
                        </div>

                        {/* Financial & Dates */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">מחיר רכישה:</span>
                            <span className="text-foreground font-medium">₪{item.purchasePrice.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-muted-foreground">תאריך רכישה:</span>
                            <span className="text-foreground font-medium">{item.purchaseDate}</span>
                          </div>
                          {item.warrantyExpiry && (
                            <div className="flex items-center gap-2 text-sm">
                              <span className="text-muted-foreground">תוקף אחריות:</span>
                              <span className="text-foreground font-medium">{item.warrantyExpiry}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Notes */}
                      {item.notes && (
                        <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                          <p className="text-sm text-muted-foreground">{item.notes}</p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
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
        </TabsContent>

        {/* Suppliers Tab */}
        <TabsContent value="suppliers" className="space-y-6">
          {/* Supplier Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="premium-card slide-in-left">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">סה״כ ספקים</p>
                    <p className="text-3xl font-bold text-foreground">{supplierStats.total}</p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Truck className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="premium-card slide-in-left" style={{animationDelay: '0.1s'}}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">פעילים</p>
                    <p className="text-3xl font-bold text-green-600">{supplierStats.active}</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="premium-card slide-in-left" style={{animationDelay: '0.2s'}}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">סה״כ הזמנות</p>
                    <p className="text-3xl font-bold text-blue-600">{supplierStats.totalOrders}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="premium-card slide-in-left" style={{animationDelay: '0.3s'}}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">דירוג ממוצע</p>
                    <p className="text-3xl font-bold text-yellow-600">{supplierStats.avgRating.toFixed(1)}</p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <span className="text-xl text-yellow-600">★</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Suppliers Search */}
          <Card className="premium-card slide-in-left">
            <CardContent className="p-6">
              <div className="modern-search">
                <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="חיפוש ספקים לפי שם או איש קשר..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 border-0 bg-transparent focus:ring-0 placeholder:text-muted-foreground/70"
                />
              </div>
            </CardContent>
          </Card>

          {/* Suppliers List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredSuppliers.map((supplier, index) => (
              <Card key={supplier.id} className="interactive-card group stagger-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-foreground">{supplier.name}</h3>
                        <Badge className={`${getSupplierStatusBadge(supplier.status)} status-indicator`}>
                          {supplier.status === 'active' ? 'פעיל' : 'לא פעיל'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{supplier.contactPerson}</p>
                      <div className="flex items-center gap-1 mb-3">
                        {getRatingStars(supplier.rating)}
                        <span className="text-sm text-muted-foreground ml-2">({supplier.rating})</span>
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

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{supplier.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{supplier.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{supplier.address}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">קטגוריות:</span>
                      <span className="text-sm text-muted-foreground">{supplier.totalOrders} הזמנות</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {supplier.categories.map((category) => (
                        <Badge key={category} variant="secondary" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                    {supplier.lastOrder && (
                      <div className="text-xs text-muted-foreground">
                        הזמנה אחרונה: {supplier.lastOrder}
                      </div>
                    )}
                  </div>

                  {supplier.notes && (
                    <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                      <p className="text-sm text-muted-foreground">{supplier.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Empty State */}
      {((activeTab === 'equipment' && filteredEquipment.length === 0) || 
        (activeTab === 'suppliers' && filteredSuppliers.length === 0)) && (
        <Card className="premium-card fade-in-up">
          <CardContent className="p-16 text-center">
            <div className="space-y-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center">
                {activeTab === 'equipment' ? (
                  <Package className="h-8 w-8 text-primary" />
                ) : (
                  <Truck className="h-8 w-8 text-primary" />
                )}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  לא נמצא {activeTab === 'equipment' ? 'ציוד' : 'ספקים'}
                </h3>
                <p className="text-muted-foreground text-lg">
                  {searchTerm ? 'נסה לשנות את מילות החיפוש' : 
                   `התחל על ידי הוספת ${activeTab === 'equipment' ? 'ציוד' : 'ספק'} חדש`}
                </p>
              </div>
              {!searchTerm && (
                <Button className="premium-card px-8 py-3 text-base">
                  <Plus className="h-5 w-5 ml-2" />
                  הוסף {activeTab === 'equipment' ? 'ציוד' : 'ספק'} חדש
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}