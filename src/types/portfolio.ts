export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  category: string;
  outcomes: {
    metric: string;
    value: string;
  }[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}
