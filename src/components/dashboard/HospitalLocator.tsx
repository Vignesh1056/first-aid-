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
    name: "Apollo Hospitals",
    address: "21, Greams Lane, Off Greams Road, Chennai - 600006",
    phone: "+91-44-2829-3333",
    distance: "2.1 km",
    rating: 4.6,
    services: ["Emergency", "ICU", "Cardiology", "Neurology"],
    isOpen24x7: true,
    coordinates: { lat: 13.0638, lng: 80.2643 },
  },
  {
    id: "2",
    name: "Fortis Malar Hospital",
    address: "52, 1st Main Road, Gandhi Nagar, Adyar, Chennai - 600020",
    phone: "+91-44-4200-7575",
    distance: "3.5 km",
    rating: 4.3,
    services: ["Emergency", "Oncology", "Orthopedics", "Pediatrics"],
    isOpen24x7: true,
    coordinates: { lat: 13.0067, lng: 80.2575 },
  },
  {
    id: "3",
    name: "MIOT International",
    address: "4/112, Mount Poonamallee Road, Manapakkam, Chennai - 600089",
    phone: "+91-44-4200-2288",
    distance: "4.8 km",
    rating: 4.4,
    services: ["Emergency", "Trauma", "Cardiology", "Nephrology"],
    isOpen24x7: true,
    coordinates: { lat: 13.0105, lng: 80.1767 },
  },
  {
    id: "4",
    name: "Government General Hospital",
    address: "EVR Periyar Salai, Park Town, Chennai - 600003",
    phone: "+91-44-2530-5000",
    distance: "5.2 km",
    rating: 4.2,
    services: ["Emergency", "Critical Care", "Surgery", "Trauma"],
    isOpen24x7: true,
    coordinates: { lat: 13.0827, lng: 80.2757 },
  },
  {
    id: "5",
    name: "Sri Ramachandra Medical Centre",
    address: "No.1, Ramachandra Nagar, Porur, Chennai - 600116",
    phone: "+91-44-2476-7000",
    distance: "6.9 km",
    rating: 4.3,
    services: ["Emergency", "ICU", "Gastroenterology", "Oncology"],
    isOpen24x7: true,
    coordinates: { lat: 13.0370, lng: 80.1533 },
  },

  {
    id: "6",
    name: "N S Hospital",
    address: "Sembarambakkam, Chennai - 600073",
    phone: "+91-44-xxxx-xxxx",
    distance: "3.2 km",
    rating: 4.0,
    services: ["General Medicine", "Pediatrics", "Emergency"],
    isOpen24x7: true,
    coordinates: { lat: 13.0100, lng: 80.1000 },
  },
  {
    id: "7",
    name: "Annai Theresa Hospitals Pvt Ltd",
    address: "Sembarambakkam, Chennai - 600073",
    phone: "+91-44-yyyy-yyyy",
    distance: "3.5 km",
    rating: 4.2,
    services: ["Emergency", "Maternity", "Surgery"],
    isOpen24x7: true,
    coordinates: { lat: 13.0120, lng: 80.1050 },
  },
  {
    id: "8",
    name: "Annai Arul Hospital",
    address: "Sembarambakkam, Chennai - 600073",
    phone: "+91-44-zzzz-zzzz",
    distance: "3.6 km",
    rating: 4.1,
    services: ["Emergency", "Orthopaedics", "ICU"],
    isOpen24x7: true,
    coordinates: { lat: 13.0130, lng: 80.1080 },
  },
  {
    id: "9",
    name: "Jolen Hospital",
    address: "Velachery Main Rd, Sembarambakkam, Chennai - 600073",
    phone: "+91-44-aaaa-aaaa",
    distance: "3.8 km",
    rating: 4.0,
    services: ["General Surgery", "Emergency"],
    isOpen24x7: false,
    coordinates: { lat: 13.0150, lng: 80.1100 },
  },
  {
    id: "10",
    name: "Homeocare International Pvt Ltd",
    address: "Mudichur Road, Tambaram West (near Sembarambakkam), Chennai",
    phone: "+91-44-bbbb-bbbb",
    distance: "4.0 km",
    rating: 4.4,
    services: ["Homeopathy", "Emergency"],
    isOpen24x7: true,
    coordinates: { lat: 13.0080, lng: 80.0950 },
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
      setUserLocation("📍 Getting your location...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Use reverse geocoding to get a friendly address
          fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=demo&no_annotations=1&limit=1`)
            .then(response => response.json())
            .then(data => {
              if (data.results && data.results[0]) {
                const address = data.results[0].formatted || data.results[0].components.city || data.results[0].components.state;
                setUserLocation(`📍 ${address}`);
              } else {
                setUserLocation(`📍 ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
              }
            })
            .catch(() => {
              setUserLocation(`📍 ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
            });
          
          // Sort hospitals by distance (mock calculation for demo)
          const sortedHospitals = [...hospitals].sort((a, b) => {
            const distanceA = parseFloat(a.distance);
            const distanceB = parseFloat(b.distance);
            return distanceA - distanceB;
          });
          setFilteredHospitals(sortedHospitals);
        },
        (error) => {
          console.log("Location access denied:", error);
          if (error.code === 1) {
            setUserLocation("📍 Location access denied - Enable location to find nearby hospitals");
          } else if (error.code === 2) {
            setUserLocation("📍 Location unavailable - Showing all hospitals");
          } else {
            setUserLocation("📍 Location timeout - Showing all hospitals"); 
          }
          toast({
            title: "Location Access",
            description: "Enable location access to find the nearest hospitals to you.",
            variant: "destructive",
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    } else {
      setUserLocation("📍 Location services not supported");
    }
  }, [toast]);

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