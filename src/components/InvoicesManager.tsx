import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Download, Send, DollarSign, Calendar, CheckCircle, Clock, AlertCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  vatAmount: number;
  totalAmount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  paymentMethod?: string;
  paidDate?: string;
  description: string;
  serviceCallIds: string[];
  hoursWorked: number;
  hourlyRate: number;
  notes?: string;
}

interface InvoiceItem {
  id: string;
  invoiceId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  serviceCallId?: string;
}

export function InvoicesManager() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const invoices: Invoice[] = [
    {
      id: '1',
      invoiceNumber: 'INV-2024-001',
      clientId: '1',
      clientName: 'חברת טק סולושנס בע״מ',
      issueDate: '2024-01-15',
      dueDate: '2024-02-15',
      amount: 3500,
      vatAmount: 595,
      totalAmount: 4095,
      status: 'paid',
      paymentMethod: 'העברה בנקאית',
      paidDate: '2024-01-20',
      description: 'שירותי תמיכה טכנית - ינואר 2024',
      serviceCallIds: ['SC001', 'SC002'],
      hoursWorked: 10,
      hourlyRate: 350,
      notes: 'תשלום התקבל בזמן'
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-002',
      clientId: '2',
      clientName: 'משרד עורכי דין רוזן ושות׳',
      issueDate: '2024-01-20',
      dueDate: '2024-02-20',
      amount: 2800,
      vatAmount: 476,
      totalAmount: 3276,
      status: 'sent',
      description: 'שירותי תמיכה מבנק שעות',
      serviceCallIds: ['SC003', 'SC004'],
      hoursWorked: 8,
      hourlyRate: 350,
      notes: 'נשלח ללקוח במייל'
    },
    {
      id: '3',
      invoiceNumber: 'INV-2024-003',
      clientId: '3',
      clientName: 'קליניקת השיניים ד״ר לוי',
      issueDate: '2024-01-10',
      dueDate: '2024-02-10',
      amount: 1800,
      vatAmount: 306,
      totalAmount: 2106,
      status: 'overdue',
      description: 'התקנת מערכת גיבוי',
      serviceCallIds: ['SC005'],
      hoursWorked: 6,
      hourlyRate: 300
    },
    {
      id: '4',
      invoiceNumber: 'INV-2024-004',
      clientId: '4',
      clientName: 'חברת פיננסים בע״מ',
      issueDate: '2024-01-25',
      dueDate: '2024-02-25',
      amount: 4800,
      vatAmount: 816,
      totalAmount: 5616,
      status: 'draft',
      description: 'שירותי תמיכה וייעוץ',
      serviceCallIds: ['SC006', 'SC007'],
      hoursWorked: 12,
      hourlyRate: 400
    }
  ];

  const getStatusText = (status: string) => {
    switch (status) {
      case 'draft': return 'טיוטה';
      case 'sent': return 'נשלח';
      case 'paid': return 'שולם';
      case 'overdue': return 'בפיגור';
      case 'cancelled': return 'מבוטל';
      default: return status;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'sent': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'paid': return 'bg-green-100 text-green-800 border-green-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      case 'cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <FileText className="h-4 w-4" />;
      case 'sent': return <Send className="h-4 w-4" />;
      case 'paid': return <CheckCircle className="h-4 w-4" />;
      case 'overdue': return <AlertCircle className="h-4 w-4" />;
      case 'cancelled': return <AlertCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || invoice.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalStatistics = {
    totalInvoices: invoices.length,
    totalAmount: invoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0),
    paidAmount: invoices.filter(i => i.status === 'paid').reduce((sum, invoice) => sum + invoice.totalAmount, 0),
    pendingAmount: invoices.filter(i => i.status === 'sent').reduce((sum, invoice) => sum + invoice.totalAmount, 0),
    overdueAmount: invoices.filter(i => i.status === 'overdue').reduce((sum, invoice) => sum + invoice.totalAmount, 0),
    draftCount: invoices.filter(i => i.status === 'draft').length,
    sentCount: invoices.filter(i => i.status === 'sent').length,
    paidCount: invoices.filter(i => i.status === 'paid').length,
    overdueCount: invoices.filter(i => i.status === 'overdue').length
  };

  const formatCurrency = (amount: number) => {
    return `₪${amount.toLocaleString()}`;
  };

  const isOverdue = (dueDate: string, status: string) => {
    if (status === 'paid') return false;
    const due = new Date(dueDate);
    const today = new Date();
    return due < today;
  };

  return (
    <div className="space-y-8 fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between slide-in-right">
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-2">ניהול חשבוניות</h1>
          <p className="text-muted-foreground text-lg">נהל חשבוניות, מעקב תשלומים וחיובים</p>
        </div>
        <Button className="btn-hover-scale premium-card px-6 py-3 text-base font-medium">
          <Plus className="h-5 w-5 ml-2" />
          חשבונית חדשה
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="premium-card slide-in-left">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">סה״כ חשבוניות</p>
                <p className="text-3xl font-bold text-foreground">{totalStatistics.totalInvoices}</p>
                <p className="text-sm text-muted-foreground">{formatCurrency(totalStatistics.totalAmount)}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <FileText className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card slide-in-left" style={{animationDelay: '0.1s'}}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">שולם</p>
                <p className="text-3xl font-bold text-green-600">{totalStatistics.paidCount}</p>
                <p className="text-sm text-green-600">{formatCurrency(totalStatistics.paidAmount)}</p>
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
                <p className="text-sm text-muted-foreground mb-1">ממתין לתשלום</p>
                <p className="text-3xl font-bold text-blue-600">{totalStatistics.sentCount}</p>
                <p className="text-sm text-blue-600">{formatCurrency(totalStatistics.pendingAmount)}</p>
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
                <p className="text-sm text-muted-foreground mb-1">בפיגור</p>
                <p className="text-3xl font-bold text-red-600">{totalStatistics.overdueCount}</p>
                <p className="text-sm text-red-600">{formatCurrency(totalStatistics.overdueAmount)}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <AlertCircle className="h-6 w-6 text-red-600" />
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
                placeholder="חיפוש לפי לקוח, מספר חשבונית או תיאור..."
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
                variant={selectedStatus === 'draft' ? 'default' : 'outline'}
                onClick={() => setSelectedStatus('draft')}
                size="sm"
                className="premium-card"
              >
                טיוטות
              </Button>
              <Button
                variant={selectedStatus === 'sent' ? 'default' : 'outline'}
                onClick={() => setSelectedStatus('sent')}
                size="sm"
                className="premium-card"
              >
                נשלח
              </Button>
              <Button
                variant={selectedStatus === 'paid' ? 'default' : 'outline'}
                onClick={() => setSelectedStatus('paid')}
                size="sm"
                className="premium-card"
              >
                שולם
              </Button>
              <Button
                variant={selectedStatus === 'overdue' ? 'default' : 'outline'}
                onClick={() => setSelectedStatus('overdue')}
                size="sm"
                className="premium-card"
              >
                בפיגור
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoices List */}
      <div className="space-y-6">
        {filteredInvoices.map((invoice, index) => (
          <Card key={invoice.id} className="interactive-card group stagger-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-foreground">{invoice.invoiceNumber}</h3>
                    <Badge className={`${getStatusBadge(invoice.status)} status-indicator flex items-center gap-1`}>
                      {getStatusIcon(invoice.status)}
                      {getStatusText(invoice.status)}
                    </Badge>
                    {isOverdue(invoice.dueDate, invoice.status) && (
                      <Badge className="bg-red-100 text-red-800 border-red-200">
                        פיגור
                      </Badge>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Client Info */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground">{invoice.clientName}</h4>
                      <p className="text-sm text-muted-foreground">{invoice.description}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{invoice.hoursWorked} שעות עבודה</span>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">הוצא:</span>
                        <span className="text-foreground">{invoice.issueDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">תאריך תשלום:</span>
                        <span className={`${isOverdue(invoice.dueDate, invoice.status) ? 'text-red-600' : 'text-foreground'}`}>
                          {invoice.dueDate}
                        </span>
                      </div>
                      {invoice.paidDate && (
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-muted-foreground">שולם:</span>
                          <span className="text-green-600">{invoice.paidDate}</span>
                        </div>
                      )}
                    </div>

                    {/* Amount */}
                    <div className="space-y-2">
                      <div className="premium-card p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium text-foreground">סכום כולל</span>
                        </div>
                        <p className="text-2xl font-bold text-primary">{formatCurrency(invoice.totalAmount)}</p>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <p>בסיס: {formatCurrency(invoice.amount)}</p>
                          <p>מע״מ: {formatCurrency(invoice.vatAmount)}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Service Calls */}
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <p className="text-sm font-medium text-foreground mb-2">קריאות שירות:</p>
                    <div className="flex flex-wrap gap-2">
                      {invoice.serviceCallIds.map((callId) => (
                        <Badge key={callId} variant="secondary" className="text-xs">
                          {callId}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  {invoice.notes && (
                    <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                      <p className="text-sm text-muted-foreground">{invoice.notes}</p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Button variant="ghost" size="sm" className="premium-card">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="premium-card">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="premium-card">
                    <Edit className="h-4 w-4" />
                  </Button>
                  {invoice.status === 'draft' && (
                    <Button variant="ghost" size="sm" className="premium-card">
                      <Send className="h-4 w-4" />
                    </Button>
                  )}
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
      {filteredInvoices.length === 0 && (
        <Card className="premium-card fade-in-up">
          <CardContent className="p-16 text-center">
            <div className="space-y-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">לא נמצאו חשבוניות</h3>
                <p className="text-muted-foreground text-lg">
                  {searchTerm ? 'נסה לשנות את מילות החיפוש' : 'התחל על ידי יצירת חשבונית חדשה'}
                </p>
              </div>
              {!searchTerm && (
                <Button className="premium-card px-8 py-3 text-base">
                  <Plus className="h-5 w-5 ml-2" />
                  צור חשבונית חדשה
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}