import { useState } from 'react';
import { Save, User, Bell, Shield, Palette, Globe, Database, Mail, Phone, MapPin, Building, CreditCard, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CompanySettings {
  companyName: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  taxId: string;
  logo: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  newServiceCall: boolean;
  overdueInvoices: boolean;
  lowHourBanks: boolean;
  systemAlerts: boolean;
}

interface BillingSettings {
  defaultHourlyRate: number;
  vatRate: number;
  paymentTerms: number;
  currency: string;
  invoiceTemplate: string;
  autoInvoicing: boolean;
}

interface SystemSettings {
  language: string;
  timezone: string;
  dateFormat: string;
  theme: string;
  autoBackup: boolean;
  backupFrequency: string;
}

export function SettingsManager() {
  const [companySettings, setCompanySettings] = useState<CompanySettings>({
    companyName: 'שירותי מחשבים בע״מ',
    email: 'info@computerservices.co.il',
    phone: '03-1234567',
    address: 'רחוב הרצל 15, תל אביב',
    website: 'www.computerservices.co.il',
    taxId: '123456789',
    logo: ''
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: false,
    newServiceCall: true,
    overdueInvoices: true,
    lowHourBanks: true,
    systemAlerts: true
  });

  const [billingSettings, setBillingSettings] = useState<BillingSettings>({
    defaultHourlyRate: 350,
    vatRate: 17,
    paymentTerms: 30,
    currency: 'ILS',
    invoiceTemplate: 'default',
    autoInvoicing: false
  });

  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    language: 'he',
    timezone: 'Asia/Jerusalem',
    dateFormat: 'DD/MM/YYYY',
    theme: 'light',
    autoBackup: true,
    backupFrequency: 'daily'
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between slide-in-right">
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-2">הגדרות מערכת</h1>
          <p className="text-muted-foreground text-lg">נהל הגדרות החברה, התראות ומערכת</p>
        </div>
        <Button 
          onClick={handleSave}
          disabled={isSaving}
          className="btn-hover-scale premium-card px-6 py-3 text-base font-medium"
        >
          {isSaving ? (
            <>
              <Clock className="h-5 w-5 ml-2 animate-spin" />
              שומר...
            </>
          ) : (
            <>
              <Save className="h-5 w-5 ml-2" />
              שמור הגדרות
            </>
          )}
        </Button>
      </div>

      {/* Success Message */}
      {saveSuccess && (
        <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg slide-in-down">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <span className="text-green-800 font-medium">ההגדרות נשמרו בהצלחה!</span>
        </div>
      )}

      <Tabs defaultValue="company" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 premium-card">
          <TabsTrigger value="company" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            פרטי חברה
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            התראות
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            חיוב
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            מערכת
          </TabsTrigger>
        </TabsList>

        {/* Company Settings */}
        <TabsContent value="company" className="space-y-6">
          <Card className="premium-card slide-in-left">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                פרטי החברה
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">שם החברה</Label>
                  <Input
                    id="companyName"
                    value={companySettings.companyName}
                    onChange={(e) => setCompanySettings({...companySettings, companyName: e.target.value})}
                    className="premium-card"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxId">מספר עוסק מורשה</Label>
                  <Input
                    id="taxId"
                    value={companySettings.taxId}
                    onChange={(e) => setCompanySettings({...companySettings, taxId: e.target.value})}
                    className="premium-card"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">כתובת אימייל</Label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={companySettings.email}
                      onChange={(e) => setCompanySettings({...companySettings, email: e.target.value})}
                      className="pr-10 premium-card"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">מספר טלפון</Label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={companySettings.phone}
                      onChange={(e) => setCompanySettings({...companySettings, phone: e.target.value})}
                      className="pr-10 premium-card"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">כתובת</Label>
                <div className="relative">
                  <MapPin className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="address"
                    value={companySettings.address}
                    onChange={(e) => setCompanySettings({...companySettings, address: e.target.value})}
                    className="pr-10 premium-card"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">אתר אינטרנט</Label>
                <div className="relative">
                  <Globe className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="website"
                    value={companySettings.website}
                    onChange={(e) => setCompanySettings({...companySettings, website: e.target.value})}
                    className="pr-10 premium-card"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="premium-card slide-in-left">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                הגדרות התראות
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div>
                    <Label className="text-base font-medium">התראות במייל</Label>
                    <p className="text-sm text-muted-foreground">קבל התראות למייל</p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div>
                    <Label className="text-base font-medium">התראות SMS</Label>
                    <p className="text-sm text-muted-foreground">קבל התראות בהודעות טקסט</p>
                  </div>
                  <Switch
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, smsNotifications: checked})}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div>
                    <Label className="text-base font-medium">קריאות שירות חדשות</Label>
                    <p className="text-sm text-muted-foreground">התראה על קריאות שירות חדשות</p>
                  </div>
                  <Switch
                    checked={notificationSettings.newServiceCall}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, newServiceCall: checked})}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div>
                    <Label className="text-base font-medium">חשבוניות באיחור</Label>
                    <p className="text-sm text-muted-foreground">התראה על חשבוניות שטרם שולמו</p>
                  </div>
                  <Switch
                    checked={notificationSettings.overdueInvoices}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, overdueInvoices: checked})}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div>
                    <Label className="text-base font-medium">בנקי שעות נמוכים</Label>
                    <p className="text-sm text-muted-foreground">התראה כאשר נותרו מעט שעות</p>
                  </div>
                  <Switch
                    checked={notificationSettings.lowHourBanks}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, lowHourBanks: checked})}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div>
                    <Label className="text-base font-medium">התראות מערכת</Label>
                    <p className="text-sm text-muted-foreground">התראות על עדכונים ובעיות מערכת</p>
                  </div>
                  <Switch
                    checked={notificationSettings.systemAlerts}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, systemAlerts: checked})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Settings */}
        <TabsContent value="billing" className="space-y-6">
          <Card className="premium-card slide-in-left">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                הגדרות חיוב
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="defaultRate">תעריף שעתי ברירת מחדל</Label>
                  <div className="relative">
                    <DollarSign className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="defaultRate"
                      type="number"
                      value={billingSettings.defaultHourlyRate}
                      onChange={(e) => setBillingSettings({...billingSettings, defaultHourlyRate: parseInt(e.target.value)})}
                      className="pr-10 premium-card"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vatRate">אחוז מע״מ (%)</Label>
                  <Input
                    id="vatRate"
                    type="number"
                    value={billingSettings.vatRate}
                    onChange={(e) => setBillingSettings({...billingSettings, vatRate: parseInt(e.target.value)})}
                    className="premium-card"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="paymentTerms">תנאי תשלום (ימים)</Label>
                  <Input
                    id="paymentTerms"
                    type="number"
                    value={billingSettings.paymentTerms}
                    onChange={(e) => setBillingSettings({...billingSettings, paymentTerms: parseInt(e.target.value)})}
                    className="premium-card"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">מטבע</Label>
                  <Select value={billingSettings.currency} onValueChange={(value) => setBillingSettings({...billingSettings, currency: value})}>
                    <SelectTrigger className="premium-card">
                      <SelectValue placeholder="בחר מטבע" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ILS">שקל (₪)</SelectItem>
                      <SelectItem value="USD">דולר ($)</SelectItem>
                      <SelectItem value="EUR">יורו (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="invoiceTemplate">תבנית חשבונית</Label>
                <Select value={billingSettings.invoiceTemplate} onValueChange={(value) => setBillingSettings({...billingSettings, invoiceTemplate: value})}>
                  <SelectTrigger className="premium-card">
                    <SelectValue placeholder="בחר תבנית" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">ברירת מחדל</SelectItem>
                    <SelectItem value="minimal">מינימלית</SelectItem>
                    <SelectItem value="detailed">מפורטת</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <Label className="text-base font-medium">חשבונית אוטומטית</Label>
                  <p className="text-sm text-muted-foreground">צור חשבוניות אוטומטית בסוף החודש</p>
                </div>
                <Switch
                  checked={billingSettings.autoInvoicing}
                  onCheckedChange={(checked) => setBillingSettings({...billingSettings, autoInvoicing: checked})}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system" className="space-y-6">
          <Card className="premium-card slide-in-left">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                הגדרות מערכת
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="language">שפה</Label>
                  <Select value={systemSettings.language} onValueChange={(value) => setSystemSettings({...systemSettings, language: value})}>
                    <SelectTrigger className="premium-card">
                      <SelectValue placeholder="בחר שפה" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="he">עברית</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ar">العربية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">אזור זמן</Label>
                  <Select value={systemSettings.timezone} onValueChange={(value) => setSystemSettings({...systemSettings, timezone: value})}>
                    <SelectTrigger className="premium-card">
                      <SelectValue placeholder="בחר אזור זמן" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Jerusalem">ישראל (GMT+2)</SelectItem>
                      <SelectItem value="Europe/London">לונדון (GMT+0)</SelectItem>
                      <SelectItem value="America/New_York">ניו יורק (GMT-5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">פורמט תאריך</Label>
                  <Select value={systemSettings.dateFormat} onValueChange={(value) => setSystemSettings({...systemSettings, dateFormat: value})}>
                    <SelectTrigger className="premium-card">
                      <SelectValue placeholder="בחר פורמט" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="theme">ערכת נושא</Label>
                  <Select value={systemSettings.theme} onValueChange={(value) => setSystemSettings({...systemSettings, theme: value})}>
                    <SelectTrigger className="premium-card">
                      <SelectValue placeholder="בחר ערכת נושא" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">בהיר</SelectItem>
                      <SelectItem value="dark">כהה</SelectItem>
                      <SelectItem value="auto">אוטומטי</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div>
                    <Label className="text-base font-medium">גיבוי אוטומטי</Label>
                    <p className="text-sm text-muted-foreground">צור גיבוי אוטומטי של הנתונים</p>
                  </div>
                  <Switch
                    checked={systemSettings.autoBackup}
                    onCheckedChange={(checked) => setSystemSettings({...systemSettings, autoBackup: checked})}
                  />
                </div>

                {systemSettings.autoBackup && (
                  <div className="space-y-2">
                    <Label htmlFor="backupFrequency">תדירות גיבוי</Label>
                    <Select value={systemSettings.backupFrequency} onValueChange={(value) => setSystemSettings({...systemSettings, backupFrequency: value})}>
                      <SelectTrigger className="premium-card">
                        <SelectValue placeholder="בחר תדירות" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">כל שעה</SelectItem>
                        <SelectItem value="daily">יומי</SelectItem>
                        <SelectItem value="weekly">שבועי</SelectItem>
                        <SelectItem value="monthly">חודשי</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="premium-card slide-in-right">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                מצב המערכת
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">מסד נתונים</p>
                    <p className="text-sm text-green-600">פעיל</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">גיבוי אחרון</p>
                    <p className="text-sm text-green-600">אמש 23:00</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-800">עדכון זמין</p>
                    <p className="text-sm text-blue-600">גרסה 2.1.0</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">שרת מייל</p>
                    <p className="text-sm text-green-600">פעיל</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}