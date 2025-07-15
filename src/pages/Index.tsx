import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Dashboard } from '@/components/Dashboard';
import { ClientsManager } from '@/components/ClientsManager';
import { ServiceCallsManager } from '@/components/ServiceCallsManager';
import { HourBanksManager } from '@/components/HourBanksManager';
import { EquipmentManager } from '@/components/EquipmentManager';
import { ReportsManager } from '@/components/ReportsManager';
import { InvoicesManager } from '@/components/InvoicesManager';
import { SettingsManager } from '@/components/SettingsManager';

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
        return <HourBanksManager />;
      case 'equipment':
        return <EquipmentManager />;
      case 'reports':
        return <ReportsManager />;
      case 'invoices':
        return <InvoicesManager />;
      case 'settings':
        return <SettingsManager />;
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
