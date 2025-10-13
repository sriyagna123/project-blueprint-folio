import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, BookOpen, Target, Lightbulb, CheckCircle } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  detailed_description: string;
  difficulty: string;
  category: string;
  tech_stack: string[];
  learning_outcomes: string[];
  estimated_duration: string;
  prerequisites?: string[];
}

interface ProjectModalProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const difficultyColors = {
  beginner: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  intermediate: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  advanced: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const ProjectModal = ({ project, open, onOpenChange }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <ScrollArea className="max-h-[80vh] pr-4">
          <DialogHeader>
            <div className="flex items-start justify-between gap-4 mb-2">
              <DialogTitle className="text-2xl">{project.title}</DialogTitle>
              <Badge className={difficultyColors[project.difficulty as keyof typeof difficultyColors]}>
                {project.difficulty}
              </Badge>
            </div>
            <DialogDescription className="text-base">
              {project.description}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                About This Project
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {project.detailed_description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  Category
                </h4>
                <p className="text-muted-foreground">{project.category}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  Duration
                </h4>
                <p className="text-muted-foreground">{project.estimated_duration}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech_stack.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                Learning Outcomes
              </h3>
              <ul className="space-y-2">
                {project.learning_outcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            {project.prerequisites && project.prerequisites.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Prerequisites</h3>
                <ul className="space-y-2">
                  {project.prerequisites.map((prereq, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-muted-foreground mt-1">→</span>
                      <span className="text-muted-foreground">{prereq}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
