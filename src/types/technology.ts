export interface TechnologyItem {
  id: string;
  name: string;
  description: string;
  category:
    | 'LLM & AI Models'
    | 'ML Frameworks'
    | 'Data Engineering'
    | 'Development Tools'
    | 'Cloud & Infrastructure';
  icon: string;
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export type TechnologyCategory =
  | 'LLM & AI Models'
  | 'ML Frameworks'
  | 'Data Engineering'
  | 'Development Tools'
  | 'Cloud & Infrastructure'
  | 'All';
