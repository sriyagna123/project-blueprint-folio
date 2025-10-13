import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  category: string;
  tech_stack: string[];
  estimated_duration: string;
}

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const difficultyColors = {
  beginner: "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400",
  intermediate: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400",
  advanced: "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400",
};

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  return (
    <Card 
      className="cursor-pointer transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 bg-gradient-to-br from-card to-muted/30"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <CardTitle className="text-xl">{project.title}</CardTitle>
          <Badge className={difficultyColors[project.difficulty as keyof typeof difficultyColors]}>
            {project.difficulty}
          </Badge>
        </div>
        <CardDescription className="text-base">{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span className="font-medium">{project.category}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{project.estimated_duration}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tech_stack.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.tech_stack.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{project.tech_stack.length - 4} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
