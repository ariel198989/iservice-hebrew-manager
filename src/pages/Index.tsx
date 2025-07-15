import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Dashboard } from '@/components/Dashboard';
import { ClientsManager } from '@/components/ClientsManager';
import { ServiceCallsManager } from '@/components/ServiceCallsManager';

const Index = () => {
  const [activeView, setActiveView] = useState('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'clients':
        return <ClientsManager />;
      case 'service-calls':
        return <ServiceCallsManager />;
      case 'hour-banks':
        return <div className="text-center p-12 text-muted-foreground">מודול בנקי שעות בבנייה...</div>;
      case 'equipment':
        return <div className="text-center p-12 text-muted-foreground">מודול ציוד וספקים בבנייה...</div>;
      case 'reports':
        return <div className="text-center p-12 text-muted-foreground">מודול דוחות בבנייה...</div>;
      case 'invoices':
        return <div className="text-center p-12 text-muted-foreground">מודול חשבוניות בבנייה...</div>;
      case 'settings':
        return <div className="text-center p-12 text-muted-foreground">מודול הגדרות בבנייה...</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeView={activeView} onViewChange={setActiveView}>
      {renderView()}
    </Layout>
  );
};

export default Index;
