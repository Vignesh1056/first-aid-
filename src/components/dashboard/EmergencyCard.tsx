import { useState, useEffect } from "react";
import { Phone, AlertCircle, MapPin, Clock, UserPlus } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// ✅ Hospital Emergency Numbers
const emergencyContacts = [
  { name: "Sri Ramachandra Medical Centre", number: "+91-44-2476-8027", location: "Porur, Chennai" },
  { name: "MIOT International Hospital", number: "+91-44-4200-2288", location: "Manapakkam, Chennai" },
  { name: "Saveetha Medical College & Hospital", number: "+91-44-6672-6672", location: "Thandalam, Chennai" },
  { name: "Aravind Eye Hospital", number: "+91-44-4227-1500", location: "Poonamallee, Chennai" },
  { name: "Dr. Mehta’s Hospitals", number: "+91-44-4227-1000", location: "Chennai" },
];

export function EmergencyCard() {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [personalContacts, setPersonalContacts] = useState<
    { name: string; number: string; relation: string }[]
  >([]);

  // Add Contact Modal State
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", relation: "", number: "" });

  const { toast } = useToast();

  // ✅ Load contacts from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("personalContacts");
    if (saved) {
      setPersonalContacts(JSON.parse(saved));
    }
  }, []);

  // ✅ Save contacts to localStorage whenever updated
  useEffect(() => {
    localStorage.setItem("personalContacts", JSON.stringify(personalContacts));
  }, [personalContacts]);

  const handleEmergencyCall = () => {
    setIsEmergencyActive(true);
    setShowContacts(true);

    toast({
      title: "🚨 Emergency Mode Activated",
      description: "Select a hospital or family contact to call immediately",
      variant: "destructive",
    });
  };

  const makeCall = (contact: { name: string; number: string; location?: string; relation?: string }) => {
    window.open(`tel:${contact.number}`);

    toast({
      title: `📞 Calling ${contact.name}`,
      description: contact.location
        ? `Connecting to ${contact.location}...`
        : `Calling your ${contact.relation}...`,
    });

    setShowContacts(false);
    setIsEmergencyActive(false);
  };

  const handleAddContact = () => {
    if (!newContact.name || !newContact.relation || !newContact.number) {
      toast({
        title: "⚠️ Missing Fields",
        description: "Please fill all details before adding a contact",
        variant: "destructive",
      });
      return;
    }
    setPersonalContacts([...personalContacts, newContact]);
    setNewContact({ name: "", relation: "", number: "" });
    setShowAddContact(false);

    toast({
      title: "✅ Contact Added",
      description: "New emergency contact saved successfully",
    });
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
              Select a hospital or personal contact to call immediately. You can also add your own contacts.
            </DialogDescription>
          </DialogHeader>

          {/* 🏥 Hospital Contacts */}
          <h3 className="font-semibold text-sm mt-2 mb-1">🏥 Hospitals</h3>
          <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
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
                  <p className="text-sm text-muted-foreground font-mono">{contact.number}</p>
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

          {/* 👨‍👩‍👧 Personal Contacts */}
          <h3 className="font-semibold text-sm mt-2 mb-1">👨‍👩‍👧 Family & Friends</h3>
          <div className="space-y-3 max-h-60 overflow-y-auto mb-2">
            {personalContacts.length > 0 ? (
              personalContacts.map((contact, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <h4 className="font-medium">{contact.name}</h4>
                    <p className="text-sm text-muted-foreground">{contact.relation}</p>
                    <p className="text-sm text-muted-foreground font-mono">{contact.number}</p>
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
              ))
            ) : (
              <p className="text-xs text-muted-foreground text-center">No personal contacts added yet.</p>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddContact(true)}
            className="w-full flex items-center justify-center"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add New Contact
          </Button>

          <div className="pt-4 border-t">
            <p className="text-xs text-muted-foreground text-center">
              ⚠️ Only use emergency services for genuine medical emergencies
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Contact Dialog */}
      <Dialog open={showAddContact} onOpenChange={setShowAddContact}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Emergency Contact</DialogTitle>
            <DialogDescription>
              Save personal emergency contacts (like parents or friends) for quick access.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <div>
              <Label>Name</Label>
              <Input
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                placeholder="Enter name"
              />
            </div>
            <div>
              <Label>Relation</Label>
              <Input
                value={newContact.relation}
                onChange={(e) => setNewContact({ ...newContact, relation: e.target.value })}
                placeholder="Father, Mother, Friend..."
              />
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input
                value={newContact.number}
                onChange={(e) => setNewContact({ ...newContact, number: e.target.value })}
                placeholder="+91-98765-43210"
              />
            </div>
            <Button className="w-full" onClick={handleAddContact}>
              Save Contact
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
