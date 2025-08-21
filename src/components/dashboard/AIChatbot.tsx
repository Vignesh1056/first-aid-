import { useState, useRef, useEffect } from "react";
import { Bot, Send, Loader2, MessageSquare, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import aiChatbotIcon from "@/assets/ai-chatbot-icon.jpg";
import { getGeminiResponse } from "@/lib/gemini";

interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export function AIChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      content: "👋 Hello! I'm your FirstAid+ AI Assistant. I can help you with medical emergencies and first aid procedures. Ask me about CPR, choking, burns, bleeding, fractures, stroke, or any other first aid topics.",
      sender: "ai",
      timestamp: new Date(),
    },
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

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString() + "-user",
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const aiText = await getGeminiResponse(inputMessage);

      const aiResponse: ChatMessage = {
        id: Date.now().toString() + "-ai",
        content: aiText,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "-ai",
          content: "⚠️ Sorry, I couldn't process that request right now.",
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card
      className={`bg-gradient-card shadow-card transition-all duration-300 ${
        isExpanded ? "fixed inset-4 z-50 max-w-4xl mx-auto my-8" : ""
      }`}
    >
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
            <Button variant="outline" size="icon" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Chat Messages */}
        <ScrollArea
          className={`border rounded-lg p-4 ${isExpanded ? "h-96" : "h-64"}`}
          ref={scrollAreaRef}
        >
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground ml-4"
                      : "bg-muted mr-4"
                  }`}
                >
                  {message.sender === "ai" && (
                    <div className="flex items-center space-x-2 mb-2">
                      <Bot className="h-4 w-4 text-accent" />
                      <span className="text-sm font-medium text-accent">FirstAid+ AI</span>
                    </div>
                  )}
                  <div className="text-sm whitespace-pre-wrap">
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                  <div
                    className={`text-xs mt-1 ${
                      message.sender === "user"
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
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
          {[
            "CPR Steps",
            "Choking Relief",
            "Burn Treatment",
            "Bleeding Control",
            "Stroke Signs",
            "Fracture First Aid",
            "Heatstroke Care",
            "Seizure Response",
          ].map((topic) => (
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
