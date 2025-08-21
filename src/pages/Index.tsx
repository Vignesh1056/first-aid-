import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { AuthDialog } from "@/components/auth/AuthDialog";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { useAuthStore } from "@/store/authStore";

const Index = () => {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("emergency");
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onSignInClick={() => setShowAuthDialog(true)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <main>
        <Dashboard activeTab={activeTab} onTabChange={setActiveTab} />
      </main>

      <AuthDialog 
        open={showAuthDialog} 
        onOpenChange={setShowAuthDialog}
      />
    </div>
  );
};

export default Index;
