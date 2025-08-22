
interface Tutorial {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  youtubeId?: string;  // optional
  embedUrl?: string;   // optional (for OneDrive or other embeds)
  channel: string;
  views: string;
  category: string;
}

const tutorials: Tutorial[] = [
  {
    id: "1",
    title: "CPR Training: How to Save a Life",
    description: "Complete guide to hands-only CPR and rescue breathing techniques",
    duration: "8:42",
    difficulty: "Beginner",
    embedUrl: "https://1drv.ms/v/c/57e603e612ceabeb/IQRsulDWYJDgS6Yi3j5YTzNhAbyYNFnGLtYv0bzY2OWk4HU", // 👈 your OneDrive embed link
    channel: "American Heart Association",
    views: "2.1M",
    category: "CPR"
  },
  {
  id: "2",
  title: "Fracture and Sprain Management",
  description: "Recognition and initial treatment of bone fractures and sprains",
  duration: "9:18",
  difficulty: "Intermediate",
  embedUrl: "https://1drv.ms/v/c/57e603e612ceabeb/IQQIsZBfaVTlS5SPb2GxuzI_ARAL5FWkBkpvXEFTP8bT4U4",
  channel: "Cleveland Clinic",
  views: "754K",
  category: "Fractures"
},

{
  id: "3",
  title: "Burn Treatment and First Aid",
  description: "How to properly treat different types of burns and prevent infection",
  duration: "6:15",
  difficulty: "Intermediate",
  embedUrl: "https://1drv.ms/v/c/57e603e612ceabeb/IQSCvcXvss3RQafu3DfbaSA1AbOXqOBovCsPXeso7QJpf64",
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
  embedUrl: "https://1drv.ms/v/c/57e603e612ceabeb/IQSNLJo4NWeXTrcQa9S29Z_cAY7i2thOHEZp-aqq3HxEgg4",
  channel: "American Red Cross",
  views: "1.2M",
  category: "Bleeding"
},

{
  id: "5",
  title: "First Aid for Diabetic Emergencies",
  description: "How to recognize and respond to low blood sugar (hypoglycemia) and high blood sugar (hyperglycemia).",
  duration: "6:45",
  difficulty: "Intermediate",
  embedUrl:"https://1drv.ms/v/c/57e603e612ceabeb/IQTXutVmeo90RYJttJO1HaOdAXoAevGWqqS64JswlzRln-E",
  channel: "Diabetes UK",
  views: "650K",
  category: "Diabetes"
},

{
  id: "6",
  title: "First Aid for Asthma Attacks",
  description: "Learn how to assist someone during an asthma attack, including proper inhaler use and emergency steps.",
  duration: "7:12",
  difficulty: "Beginner",
  embedUrl: "https://1drv.ms/v/c/57e603e612ceabeb/IQSpvkpoPuAJTpYPyZwHmUgnAWxex5L4kug_20PfQIlG2Ng",
  channel: "Asthma UK",
  views: "720K",
  category: "Asthma"
},

];

export function FirstAidTutorials() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {tutorials.map((tutorial) => (
        <div
          key={tutorial.id}
          className="border rounded-xl shadow-md bg-background p-4 hover:shadow-lg transition-all"
        >
          <h3 className="font-semibold mb-2">{tutorial.title}</h3>

          {/* 👇 Detect if it's OneDrive or YouTube */}
          <div className="relative aspect-video mb-3">
            {tutorial.embedUrl ? (
              <iframe
                src={tutorial.embedUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                allowFullScreen
                className="rounded-lg"
              />
            ) : tutorial.youtubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${tutorial.youtubeId}`}
                width="100%"
                height="100%"
                allowFullScreen
                className="rounded-lg"
              />
            ) : null}
          </div>

          <p className="text-sm text-muted-foreground mb-2">{tutorial.description}</p>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{tutorial.channel}</span>
            <span>{tutorial.views} views</span>
          </div>
        </div>
      ))}
    </div>
  );
}
