import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Hero = ({ searchQuery, onSearchChange }: HeroProps) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent py-20 px-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTEydi0xMmgxMnYxMnptMCAxMmgtMTJ2MTJoMTJ2LTEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
          Student Project Ideas Hub
        </h1>
        <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8">
          Discover detailed project ideas for mini and major projects
        </p>
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search projects by title, category, or technology..."
            className="pl-12 py-6 text-lg bg-card border-0 shadow-lg"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
