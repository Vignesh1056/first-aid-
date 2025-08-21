import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmergencyCard } from "@/components/dashboard/EmergencyCard";
import { HospitalLocator } from "@/components/dashboard/HospitalLocator";
import { AIChatbot } from "@/components/dashboard/AIChatbot";
import { FirstAidTutorials } from "@/components/dashboard/FirstAidTutorials";
import { QuizSystem } from "@/components/dashboard/QuizSystem";
import { Heart, MapPin, Bot, Play, Brain, AlertTriangle } from "lucide-react";
import heroMedical from "@/assets/hero-medical.jpg";

interface DashboardProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function Dashboard({ activeTab = "emergency", onTabChange }: DashboardProps) {

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroMedical} 
            alt="Medical Emergency"
            className="w-full h-64 object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70" />
        </div>
        <div className="relative container py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Your Complete{" "}
              <span className="bg-gradient-emergency bg-clip-text text-transparent">
                Emergency Care
              </span>{" "}
              Assistant
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Professional first aid guidance, hospital locator, AI medical assistant, 
              and emergency services - all in one trusted platform.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-primary" />
                <span>24/7 Emergency Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-accent" />
                <span>Professional Medical Guidance</span>
              </div>
              <div className="flex items-center space-x-2">
                <Bot className="h-4 w-4 text-secondary" />
                <span>AI-Powered Assistant</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="container py-8">
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 h-12">
            <TabsTrigger value="emergency" className="flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Emergency</span>
            </TabsTrigger>
            <TabsTrigger value="hospitals" className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Hospitals</span>
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center space-x-2">
              <Bot className="h-4 w-4" />
              <span className="hidden sm:inline">AI Assistant</span>
            </TabsTrigger>
            <TabsTrigger value="tutorials" className="flex items-center space-x-2">
              <Play className="h-4 w-4" />
              <span className="hidden sm:inline">Tutorials</span>
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">Quiz</span>
            </TabsTrigger>
          </TabsList>

          <div className="fade-in">
            <TabsContent value="emergency" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <EmergencyCard />
                </div>
                <div className="lg:col-span-2">
                  <HospitalLocator />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="hospitals" className="space-y-6">
              <HospitalLocator />
            </TabsContent>

            <TabsContent value="ai" className="space-y-6">
              <AIChatbot />
            </TabsContent>

            <TabsContent value="tutorials" className="space-y-6">
              <FirstAidTutorials />
            </TabsContent>

            <TabsContent value="quiz" className="space-y-6">
              <QuizSystem />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Quick Access Float */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-40">
        {activeTab !== "emergency" && (
          <button
            onClick={() => onTabChange?.("emergency")}
            className="w-14 h-14 bg-gradient-emergency shadow-emergency rounded-full flex items-center justify-center pulse-emergency hover:shadow-floating transition-all"
            title="Emergency SOS"
          >
            <Heart className="h-6 w-6 text-primary-foreground" />
          </button>
        )}
        
        {activeTab !== "ai" && (
          <button
            onClick={() => onTabChange?.("ai")}
            className="w-12 h-12 bg-gradient-medical shadow-medical rounded-full flex items-center justify-center hover:shadow-floating transition-all"
            title="AI Assistant"
          >
            <Bot className="h-5 w-5 text-secondary-foreground" />
          </button>
        )}
      </div>
    </div>
  );
}