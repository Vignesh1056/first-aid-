import { useState, useEffect } from "react";
import { MapPin, Phone, Navigation, Clock, Star, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Hospital {
  id: string;
  name: string;
  address: string;
  phone: string;
  distance: string;
  rating: number;
  services: string[];
  isOpen24x7: boolean;
  coordinates: { lat: number; lng: number };
}

// Mock hospital data with real Indian hospitals
const hospitals: Hospital[] = [
  {
    id: "1",
    name: "Apollo Hospital",
    address: "Sarita Vihar, New Delhi - 110076",
    phone: "+91-11-2692-5858",
    distance: "2.3 km",
    rating: 4.5,
    services: ["Emergency", "ICU", "Surgery", "Cardiology"],
    isOpen24x7: true,
    coordinates: { lat: 28.5245, lng: 77.2711 },
  },
  {
    id: "2", 
    name: "Fortis Hospital",
    address: "Sector 62, Noida - 201301",
    phone: "+91-120-663-3333",
    distance: "3.8 km",
    rating: 4.3,
    services: ["Emergency", "Trauma", "Neurology", "Oncology"],
    isOpen24x7: true,
    coordinates: { lat: 28.6271, lng: 77.3763 },
  },
  {
    id: "3",
    name: "Max Super Speciality Hospital",
    address: "Press Enclave Road, Saket, New Delhi - 110017",
    phone: "+91-11-2651-5050", 
    distance: "4.2 km",
    rating: 4.4,
    services: ["Emergency", "ICU", "Pediatrics", "Orthopedics"],
    isOpen24x7: true,
    coordinates: { lat: 28.5244, lng: 77.2066 },
  },
  {
    id: "4",
    name: "AIIMS Emergency",
    address: "Ansari Nagar, New Delhi - 110029",
    phone: "+91-11-2658-8500",
    distance: "5.1 km", 
    rating: 4.6,
    services: ["Emergency", "Trauma", "Critical Care", "Surgery"],
    isOpen24x7: true,
    coordinates: { lat: 28.5672, lng: 77.2100 },
  },
  {
    id: "5",
    name: "Sir Ganga Ram Hospital",
    address: "Rajinder Nagar, New Delhi - 110060",
    phone: "+91-11-2575-1111",
    distance: "6.7 km",
    rating: 4.2,
    services: ["Emergency", "Cardiology", "Neurology", "Gastroenterology"],
    isOpen24x7: true,
    coordinates: { lat: 28.6364, lng: 77.1927 },
  },
];

export function HospitalLocator() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredHospitals, setFilteredHospitals] = useState(hospitals);
  const [userLocation, setUserLocation] = useState<string>("Location access required");
  const { toast } = useToast();

  useEffect(() => {
    // Request location permission and get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode this to get address
          setUserLocation(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
        },
        (error) => {
          console.log("Location access denied:", error);
          setUserLocation("Location access denied");
        }
      );
    }
  }, []);

  useEffect(() => {
    const filtered = hospitals.filter(hospital =>
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.services.some(service => 
        service.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredHospitals(filtered);
  }, [searchQuery]);

  const handleCallHospital = (hospital: Hospital) => {
    window.open(`tel:${hospital.phone}`);
    toast({
      title: `📞 Calling ${hospital.name}`,
      description: "Connecting to hospital...",
    });
  };

  const handleGetDirections = (hospital: Hospital) => {
    // Open Google Maps with directions
    const url = `https://www.google.com/maps/dir/?api=1&destination=${hospital.coordinates.lat},${hospital.coordinates.lng}&travelmode=driving`;
    window.open(url, '_blank');
    
    toast({
      title: `🗺️ Directions to ${hospital.name}`,
      description: "Opening Google Maps...",
    });
  };

  return (
    <Card className="bg-gradient-card shadow-card">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gradient-medical shadow-medical">
            <MapPin className="h-6 w-6 text-secondary-foreground" />
          </div>
          <div>
            <CardTitle>Nearby Hospitals</CardTitle>
            <CardDescription>Find and contact nearby medical facilities</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Location */}
        <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
          <Navigation className="h-4 w-4 text-accent" />
          <span className="text-sm font-medium">Your Location:</span>
          <span className="text-sm text-muted-foreground">{userLocation}</span>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search hospitals or services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Hospital List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredHospitals.map((hospital) => (
            <div
              key={hospital.id}
              className="p-4 border rounded-lg hover:shadow-md transition-all bg-background"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-lg">{hospital.name}</h3>
                    {hospital.isOpen24x7 && (
                      <Badge variant="secondary" className="bg-accent text-accent-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        24x7
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{hospital.rating}</span>
                    <span className="text-sm text-muted-foreground">• {hospital.distance}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-3">{hospital.address}</p>

              {/* Services */}
              <div className="flex flex-wrap gap-2 mb-4">
                {hospital.services.map((service, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {service}
                  </Badge>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button
                  onClick={() => handleCallHospital(hospital)}
                  variant="default"
                  size="sm"
                  className="flex-1 bg-gradient-emergency hover:shadow-emergency"
                >
                  <Phone className="h-4 w-4 mr-1" />
                  Call
                </Button>
                <Button
                  onClick={() => handleGetDirections(hospital)}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <Navigation className="h-4 w-4 mr-1" />
                  Directions
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredHospitals.length === 0 && (
          <div className="text-center py-8">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No hospitals found matching your search.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}