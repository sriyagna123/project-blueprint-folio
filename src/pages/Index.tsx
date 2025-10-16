import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import CategoryFilter from "@/components/CategoryFilter";
import { Loader2, LogOut, Code2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Session } from "@supabase/supabase-js";

interface Project {
  id: string;
  title: string;
  description: string;
  detailed_description: string;
  project_type: string;
  difficulty: string;
  category: string;
  tech_stack: string[];
  learning_outcomes: string[];
  estimated_duration: string;
  prerequisites?: string[];
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Project[];
    },
  });

  const miniProjects = projects?.filter((p) => p.project_type === "mini") || [];
  const majorProjects = projects?.filter((p) => p.project_type === "major") || [];

  const categories = Array.from(new Set(projects?.map((p) => p.category) || []));

  const filterProjects = (projectList: Project[]) => {
    return projectList.filter((project) => {
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tech_stack.some((tech) =>
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === null || project.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  };

  const filteredMiniProjects = filterProjects(miniProjects);
  const filteredMajorProjects = filterProjects(majorProjects);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You have been signed out successfully.",
    });
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse delay-500" />
        </div>
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-md relative">
            <div className="bg-card/90 backdrop-blur-xl border-2 border-primary/30 rounded-3xl shadow-2xl p-8 space-y-6">
              <div className="text-center space-y-4">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <Code2 className="h-16 w-16 text-primary animate-pulse" />
                    <Sparkles className="h-6 w-6 text-secondary absolute -top-2 -right-2 animate-bounce" />
                  </div>
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Student Project Ideas Hub
                </h1>
                <p className="text-lg text-muted-foreground">
                  Discover amazing project ideas across multiple categories
                </p>
                <p className="text-sm text-muted-foreground/80">
                  Sign in to explore detailed project ideas for mini and major projects
                </p>
              </div>
              <Button
                onClick={() => navigate("/auth")}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-lg py-6"
              >
                Sign In to Explore Projects
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>
      <div className="absolute top-4 right-4 z-10">
        <Button
          onClick={handleSignOut}
          variant="outline"
          className="gap-2"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
      <div className="relative z-10">
        <Hero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <div className="mb-8">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        <Tabs defaultValue="mini" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="mini" className="text-lg">
              Mini Projects ({filteredMiniProjects.length})
            </TabsTrigger>
            <TabsTrigger value="major" className="text-lg">
              Major Projects ({filteredMajorProjects.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mini">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredMiniProjects.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground">
                  No mini projects found matching your criteria.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMiniProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={() => handleProjectClick(project)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="major">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredMajorProjects.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground">
                  No major projects found matching your criteria.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMajorProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={() => handleProjectClick(project)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <ProjectModal
        project={selectedProject}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
};

export default Index;
