import { useState } from "react";
import { Play, Clock, User, ExternalLink, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import firstAidTutorial from "@/assets/first-aid-tutorial.jpg";

interface Tutorial {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  youtubeId: string;
  channel: string;
  views: string;
  category: string;
}

// Curated medical tutorials from trusted channels
const tutorials: Tutorial[] = [
  {
    id: "1",
    title: "CPR Training: How to Save a Life",
    description: "Complete guide to hands-only CPR and rescue breathing techniques",
    duration: "8:42",
    difficulty: "Beginner",
    youtubeId: "n5hP4DIBCEE",
    channel: "American Heart Association",
    views: "2.1M",
    category: "CPR"
  },
  {
    id: "2", 
    title: "Choking Relief - Heimlich Maneuver",
    description: "Learn the proper technique for helping choking victims",
    duration: "5:23",
    difficulty: "Beginner",
    youtubeId: "FEr9m2ZyKK0",
    channel: "Mayo Clinic",
    views: "1.8M",
    category: "Choking"
  },
  {
    id: "3",
    title: "Burn Treatment and First Aid",
    description: "How to properly treat different types of burns and prevent infection",
    duration: "6:15",
    difficulty: "Intermediate",
    youtubeId: "OvO_BQk9vE4",
    channel: "Johns Hopkins Medicine",
    views: "890K",
    category: "Burns"
  },
  {
    id: "4",
    title: "Wound Care and Bleeding Control",
    description: "Effective techniques for stopping bleeding and proper wound care",
    duration: "7:31",
    difficulty: "Beginner",
    youtubeId: "mU7U6y3bkcc",
    channel: "American Red Cross",
    views: "1.2M",
    category: "Bleeding"
  },
  {
    id: "5",
    title: "Fracture and Sprain Management",
    description: "Recognition and initial treatment of bone fractures and sprains",
    duration: "9:18",
    difficulty: "Intermediate",
    youtubeId: "JvO8zfnl9Yc",
    channel: "Cleveland Clinic",
    views: "754K",
    category: "Fractures"
  },
  {
    id: "6",
    title: "Stroke Recognition - FAST Method",
    description: "How to quickly identify stroke symptoms and get help",
    duration: "4:57",
    difficulty: "Beginner",
    youtubeId: "gFk6A9hj1FI",
    channel: "American Stroke Association",
    views: "1.5M",
    category: "Stroke"
  }
];

const categories = ["All", "CPR", "Choking", "Burns", "Bleeding", "Fractures", "Stroke"];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

export function FirstAidTutorials() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  
  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || tutorial.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "All" || tutorial.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const openVideo = (youtubeId: string) => {
    window.open(`https://www.youtube.com/watch?v=${youtubeId}`, '_blank');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-accent text-accent-foreground";
      case "Intermediate": return "bg-secondary text-secondary-foreground"; 
      case "Advanced": return "bg-primary text-primary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="bg-gradient-card shadow-card">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gradient-medical shadow-medical">
            <Play className="h-6 w-6 text-secondary-foreground" />
          </div>
          <div>
            <CardTitle>First Aid Tutorials</CardTitle>
            <CardDescription>Professional medical training videos</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tutorials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-wrap gap-1">
              <span className="text-sm font-medium text-muted-foreground mr-2">Categories:</span>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="text-xs"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            <span className="text-sm font-medium text-muted-foreground mr-2">Difficulty:</span>
            {difficulties.map((difficulty) => (
              <Button
                key={difficulty}
                variant={selectedDifficulty === difficulty ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDifficulty(difficulty)}
                className="text-xs"
              >
                {difficulty}
              </Button>
            ))}
          </div>
        </div>

        {/* Tutorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
          {filteredTutorials.map((tutorial) => (
            <div
              key={tutorial.id}
              className="border rounded-lg overflow-hidden hover:shadow-md transition-all bg-background group cursor-pointer"
              onClick={() => openVideo(tutorial.youtubeId)}
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video bg-muted">
                <img
                  src={firstAidTutorial}
                  alt={tutorial.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center group-hover:bg-primary transition-all">
                    <Play className="h-6 w-6 text-primary-foreground ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                  {tutorial.duration}
                </div>
              </div>

              {/* Video Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                    {tutorial.title}
                  </h3>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-2" />
                </div>
                
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  {tutorial.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <User className="h-3 w-3" />
                    <span>{tutorial.channel}</span>
                    <span>•</span>
                    <span>{tutorial.views} views</span>
                  </div>
                  
                  <Badge className={getDifficultyColor(tutorial.difficulty)} >
                    {tutorial.difficulty}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTutorials.length === 0 && (
          <div className="text-center py-8">
            <Play className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No tutorials found matching your criteria.</p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
          ⚠️ <strong>Disclaimer:</strong> These tutorials are for educational purposes only. 
          Always seek professional medical training and certification for emergency situations.
        </div>
      </CardContent>
    </Card>
  );
}