import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, FolderCheck, Play, Book, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { CaseMentorTabs } from "@/components/case-mentor/CaseMentorTabs";

const CaseMentor = () => {
  const { toast } = useToast();

  const handleNewCase = () => {
    console.log("Creating new case");
    toast({
      title: "New Case",
      description: "Starting a new case input session",
    });
  };

  const handleSavedCases = () => {
    console.log("Viewing saved cases");
    toast({
      title: "Saved Cases",
      description: "Loading your saved cases",
    });
  };

  const handlePracticeMode = () => {
    console.log("Entering practice mode");
    toast({
      title: "Practice Mode",
      description: "Entering practice mode session",
    });
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header Section */}
      <div className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 border-b pb-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-primary">
            CaseMentor – Your Personalized Case-Based Guide
          </h1>
          <p className="text-muted-foreground">
            Master clinical cases with insights, differentials, and structured learning
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <Button onClick={handleNewCase} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Input New Case
            </Button>
            <Button variant="outline" onClick={handleSavedCases} className="flex items-center gap-2">
              <FolderCheck className="w-4 h-4" />
              View Saved Cases
            </Button>
            <Button variant="secondary" onClick={handlePracticeMode} className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              Practice Mode
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <CaseMentorTabs />

      {/* Sidebar - Optional */}
      <div className="hidden lg:block fixed right-4 top-24 w-64 space-y-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">Quick Links</h3>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <FolderCheck className="w-4 h-4 mr-2" />
                Saved Cases
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Book className="w-4 h-4 mr-2" />
                CaseMentor Guide
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Nelson References
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CaseMentor;