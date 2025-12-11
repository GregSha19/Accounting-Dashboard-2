import { useState } from "react";
import { TopNav } from "./components/TopNav";
import { Sidebar } from "./components/Sidebar";
import { OverviewTab } from "./components/tabs/OverviewTab";
import { TransactionsTab } from "./components/tabs/TransactionsTab";
import { SuppliersTab } from "./components/tabs/SuppliersTab";
import { AccountingTab } from "./components/tabs/AccountingTab";
import { ReconciliationTab } from "./components/tabs/ReconciliationTab";

export default function App() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);

  const renderActiveTab = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab onNavigate={setActiveTab} />;
      case "transactions":
        return <TransactionsTab />;
      case "suppliers":
        return <SuppliersTab />;
      case "accounting":
        return <AccountingTab />;
      case "reconciliation":
        return <ReconciliationTab />;
      default:
        return <OverviewTab onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <div className="flex">
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() =>
            setSidebarCollapsed(!sidebarCollapsed)
          }
        />
        <main
          className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-64"}`}
        >
          <div className="p-6">{renderActiveTab()}</div>
        </main>
      </div>
    </div>
  );
}