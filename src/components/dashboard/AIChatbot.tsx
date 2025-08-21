import { useState, useRef, useEffect } from "react";
import { Bot, Send, Loader2, MessageSquare, X, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import aiChatbotIcon from "@/assets/ai-chatbot-icon.jpg";

interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const medicalResponses = {
  cpr: "🫀 **CPR Steps:**\n1. Check responsiveness\n2. Call emergency services\n3. Position hands on chest center\n4. Push hard and fast 100-120 compressions/min\n5. Give 30 compressions, then 2 breaths\n6. Continue until help arrives",
  
  choking: "🫁 **Choking Relief:**\n1. Encourage coughing if person is conscious\n2. Stand behind person, wrap arms around waist\n3. Make fist above navel, grasp with other hand\n4. Give 5 quick upward thrusts\n5. Continue until object dislodged or person becomes unconscious",
  
  burns: "🔥 **Burn Treatment:**\n1. Remove from heat source immediately\n2. Cool with running water for 10-20 minutes\n3. Remove jewelry/clothing before swelling\n4. Cover with clean, dry cloth\n5. Do NOT use ice or butter\n6. Seek medical attention for severe burns",
  
  bleeding: "🩸 **Bleeding Control:**\n1. Apply direct pressure with clean cloth\n2. Elevate wounded area above heart if possible\n3. Apply pressure to pressure points if needed\n4. Do NOT remove embedded objects\n5. Call emergency services for severe bleeding",
  
  fracture: "🦴 **Fracture Care:**\n1. Do NOT move the injured person unless necessary\n2. Immobilize the area above and below fracture\n3. Apply ice wrapped in cloth\n4. Check circulation, sensation, movement below injury\n5. Get immediate medical attention",
  
  stroke: "🧠 **Stroke Signs (FAST):**\n**F**ace drooping\n**A**rm weakness\n**S**peech difficulties\n**T**ime to call emergency services\nOther signs: sudden confusion, severe headache, loss of vision"
};

export function AIChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      content: "Hello! I'm your FirstAid+ AI Assistant. I can help you with medical emergencies and first aid procedures. Ask me about CPR, choking, burns, bleeding, fractures, or any other first aid topics.",
      sender: "ai",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Check for specific medical terms
    if (message.includes('cpr') || message.includes('cardiac') || message.includes('heart')) {
      return medicalResponses.cpr;
    }
    if (message.includes('chok') || message.includes('heimlich')) {
      return medicalResponses.choking;
    }
    if (message.includes('burn') || message.includes('fire')) {
      return medicalResponses.burns;
    }
    if (message.includes('bleed') || message.includes('cut') || message.includes('wound')) {
      return medicalResponses.bleeding;
    }
    if (message.includes('fracture') || message.includes('broken') || message.includes('bone')) {
      return medicalResponses.fracture;
    }
    if (message.includes('stroke') || message.includes('brain')) {
      return medicalResponses.stroke;
    }
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! I'm here to help with first aid and medical emergency guidance. What can I assist you with today?";
    }
    if (message.includes('emergency') || message.includes('help')) {
      return "🚨 **For immediate emergencies:**\n1. Call emergency services first\n2. Ensure scene safety\n3. Check for responsiveness\n4. Apply appropriate first aid\n\nWhat specific emergency situation are you dealing with?";
    }
    
    // Generic medical response
    return "I can help with various first aid topics including:\n• CPR and cardiac emergencies\n• Choking relief procedures\n• Burn treatment\n• Bleeding control\n• Fracture care\n• Stroke recognition\n\nPlease tell me more about your specific situation so I can provide targeted guidance.";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString() + "-user",
      content: inputMessage,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: Date.now().toString() + "-ai",
        content: generateAIResponse(inputMessage),
        sender: "ai",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className={`bg-gradient-card shadow-card transition-all duration-300 ${
      isExpanded ? 'fixed inset-4 z-50 max-w-4xl mx-auto my-8' : ''
    }`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img 
                src={aiChatbotIcon} 
                alt="AI Assistant"
                className="h-12 w-12 rounded-lg object-cover shadow-medical"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-background"></div>
            </div>
            <div>
              <CardTitle className="flex items-center space-x-2">
                <span>AI Medical Assistant</span>
                <Badge variant="secondary" className="bg-accent text-accent-foreground">
                  <Bot className="h-3 w-3 mr-1" />
                  Online
                </Badge>
              </CardTitle>
              <CardDescription>Instant first aid guidance and medical help</CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Chat Messages */}
        <ScrollArea 
          className={`border rounded-lg p-4 ${isExpanded ? 'h-96' : 'h-64'}`}
          ref={scrollAreaRef}
        >
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground ml-4'
                      : 'bg-muted mr-4'
                  }`}
                >
                  {message.sender === 'ai' && (
                    <div className="flex items-center space-x-2 mb-2">
                      <Bot className="h-4 w-4 text-accent" />
                      <span className="text-sm font-medium text-accent">FirstAid+ AI</span>
                    </div>
                  )}
                  <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                  <div className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg px-4 py-2 mr-4">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium text-accent">FirstAid+ AI</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <Loader2 className="h-4 w-4 animate-spin text-accent" />
                    <span className="text-sm text-muted-foreground">Analyzing your request...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="flex space-x-2">
          <Input
            placeholder="Ask about first aid, CPR, burns, choking, etc..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={isLoading || !inputMessage.trim()}
            className="bg-gradient-medical hover:shadow-medical"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          {['CPR Steps', 'Choking Relief', 'Burn Treatment', 'Bleeding Control'].map((topic) => (
            <Button
              key={topic}
              variant="outline"
              size="sm"
              onClick={() => setInputMessage(topic)}
              className="text-xs"
            >
              <MessageSquare className="h-3 w-3 mr-1" />
              {topic}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}