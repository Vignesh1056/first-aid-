import { useState } from "react";
import { Phone, AlertCircle, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const emergencyContacts = [
  { name: "Apollo Hospital Delhi", number: "+91-11-2692-5858", location: "New Delhi" },
  { name: "Fortis Hospital Mumbai", number: "+91-22-6754-3333", location: "Mumbai" },
  { name: "Max Super Speciality", number: "+91-11-2651-5050", location: "New Delhi" },
  { name: "Manipal Hospital", number: "+91-80-2502-4444", location: "Bangalore" },
  { name: "AIIMS Emergency", number: "+91-11-2658-8500", location: "New Delhi" },
];

export function EmergencyCard() {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const { toast } = useToast();

  const handleEmergencyCall = () => {
    setIsEmergencyActive(true);
    setShowContacts(true);
    
    toast({
      title: "🚨 Emergency Mode Activated",
      description: "Select a hospital to call immediately",
      variant: "destructive",
    });
  };

  const makeCall = (hospital: typeof emergencyContacts[0]) => {
    // In a real app, this would initiate a phone call
    window.open(`tel:${hospital.number}`);
    
    toast({
      title: `📞 Calling ${hospital.name}`,
      description: `Connecting to ${hospital.location}...`,
    });
    
    setShowContacts(false);
    setIsEmergencyActive(false);
  };

  return (
    <>
      <Card className="relative overflow-hidden bg-gradient-emergency shadow-emergency border-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
        <CardHeader className="relative">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-full bg-primary-foreground/20">
              <AlertCircle className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-xl text-primary-foreground">Emergency SOS</CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Quick access to emergency services
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative space-y-4">
          <div className="flex items-center space-x-2 text-primary-foreground/90 text-sm">
            <Clock className="h-4 w-4" />
            <span>24/7 Emergency Response</span>
          </div>
          
          <Button
            onClick={handleEmergencyCall}
            size="lg"
            variant="secondary"
            className="w-full h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all pulse-emergency"
          >
            <Phone className="mr-2 h-5 w-5" />
            CALL EMERGENCY
          </Button>
          
          <div className="flex justify-between text-xs text-primary-foreground/70">
            <span>• Ambulance Services</span>
            <span>• Hospital Network</span>
            <span>• Medical Emergency</span>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contacts Dialog */}
      <Dialog open={showContacts} onOpenChange={setShowContacts}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <span>Emergency Contacts</span>
            </DialogTitle>
            <DialogDescription>
              Select a hospital to call immediately. These are verified emergency numbers.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {emergencyContacts.map((contact, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium">{contact.name}</h4>
                    <Badge variant="secondary" className="text-xs">
                      <MapPin className="h-3 w-3 mr-1" />
                      {contact.location}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground font-mono">
                    {contact.number}
                  </p>
                </div>
                <Button
                  onClick={() => makeCall(contact)}
                  variant="default"
                  size="sm"
                  className="bg-gradient-emergency hover:shadow-emergency"
                >
                  <Phone className="h-4 w-4 mr-1" />
                  Call
                </Button>
              </div>
            ))}
          </div>
          
          <div className="pt-4 border-t">
            <p className="text-xs text-muted-foreground text-center">
              ⚠️ Only use emergency services for genuine medical emergencies
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}