# Phase 1: Data Model Specification

**Feature**: AI Engineer Portfolio Landing Page
**Date**: 2026-01-26
**Status**: Complete

## Overview

This document defines all data structures, TypeScript interfaces, validation rules, and state transitions for the AI engineer portfolio landing page. All types enforce strict null-safety and include comprehensive validation.

---

## 1. Portfolio Project Entity

### TypeScript Interface

```typescript
/**
 * Represents a portfolio project showcased on the landing page.
 * Projects demonstrate AI engineering expertise and real-world outcomes.
 */
interface PortfolioProject {
  /** Unique identifier (kebab-case slug) */
  id: string;

  /** Project title (2-60 characters) */
  title: string;

  /** Brief project description (20-200 characters for card preview) */
  description: string;

  /** Detailed project description (200-1000 characters for modal/detail view) */
  longDescription: string;

  /** Technologies/frameworks used (minimum 1, maximum 10) */
  technologies: string[];

  /** Path to project screenshot/preview image (WebP/AVIF optimized) */
  imageUrl: string;

  /** Optional live project URL */
  liveUrl?: string;

  /** Optional GitHub repository URL */
  githubUrl?: string;

  /** Quantifiable outcomes/achievements (minimum 1, maximum 5) */
  outcomes: ProjectOutcome[];

  /** Whether project appears in featured section */
  featured: boolean;

  /** Project category for filtering */
  category: ProjectCategory;

  /** Project completion date (for sorting) */
  completedAt: Date;

  /** Display order (lower numbers appear first) */
  sortOrder: number;

  /** Optional case study or blog post URL */
  caseStudyUrl?: string;
}

/**
 * Quantifiable project outcome with metric and value
 */
interface ProjectOutcome {
  /** Metric label (e.g., "Performance Improvement", "Cost Reduction") */
  metric: string;

  /** Metric value (e.g., "40%", "3x faster", "$50K saved") */
  value: string;

  /** Optional icon identifier (Lucide icon name) */
  icon?: string;
}

/**
 * Project categories for filtering and organization
 */
type ProjectCategory =
  | 'AI Automation'
  | 'LLM Application'
  | 'Machine Learning'
  | 'Data Engineering'
  | 'Full Stack AI';

/**
 * Project display state (for UI interactions)
 */
interface ProjectDisplayState {
  /** Currently selected project for modal/detail view */
  selectedProject: PortfolioProject | null;

  /** Active filter category (null = all projects) */
  activeFilter: ProjectCategory | null;

  /** Search query for filtering by title/description */
  searchQuery: string;

  /** Loading state during data fetch */
  isLoading: boolean;

  /** Error state if data fetch fails */
  error: string | null;
}
```

### Validation Schema (Zod)

```typescript
import { z } from 'zod';

const projectOutcomeSchema = z.object({
  metric: z.string().min(2).max(50),
  value: z.string().min(1).max(20),
  icon: z.string().optional()
});

const projectCategorySchema = z.enum([
  'AI Automation',
  'LLM Application',
  'Machine Learning',
  'Data Engineering',
  'Full Stack AI'
]);

export const portfolioProjectSchema = z.object({
  id: z.string()
    .min(3)
    .max(50)
    .regex(/^[a-z0-9-]+$/, 'ID must be kebab-case'),

  title: z.string()
    .min(2, 'Title must be at least 2 characters')
    .max(60, 'Title must be at most 60 characters'),

  description: z.string()
    .min(20, 'Description must be at least 20 characters')
    .max(200, 'Description must be at most 200 characters'),

  longDescription: z.string()
    .min(200, 'Long description must be at least 200 characters')
    .max(1000, 'Long description must be at most 1000 characters'),

  technologies: z.array(z.string())
    .min(1, 'At least one technology required')
    .max(10, 'Maximum 10 technologies allowed'),

  imageUrl: z.string().url('Must be valid URL'),

  liveUrl: z.string().url('Must be valid URL').optional(),

  githubUrl: z.string()
    .url('Must be valid URL')
    .regex(/github\.com/, 'Must be GitHub URL')
    .optional(),

  outcomes: z.array(projectOutcomeSchema)
    .min(1, 'At least one outcome required')
    .max(5, 'Maximum 5 outcomes allowed'),

  featured: z.boolean(),

  category: projectCategorySchema,

  completedAt: z.coerce.date(),

  sortOrder: z.number().int().min(0),

  caseStudyUrl: z.string().url('Must be valid URL').optional()
});

export type PortfolioProject = z.infer<typeof portfolioProjectSchema>;
export type ProjectOutcome = z.infer<typeof projectOutcomeSchema>;
export type ProjectCategory = z.infer<typeof projectCategorySchema>;
```

### State Transitions

```typescript
/**
 * Project display state machine
 */
type ProjectAction =
  | { type: 'SELECT_PROJECT'; payload: PortfolioProject }
  | { type: 'CLOSE_PROJECT' }
  | { type: 'SET_FILTER'; payload: ProjectCategory | null }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: PortfolioProject[] }
  | { type: 'FETCH_ERROR'; payload: string };

function projectReducer(
  state: ProjectDisplayState,
  action: ProjectAction
): ProjectDisplayState {
  switch (action.type) {
    case 'SELECT_PROJECT':
      return { ...state, selectedProject: action.payload };

    case 'CLOSE_PROJECT':
      return { ...state, selectedProject: null };

    case 'SET_FILTER':
      return { ...state, activeFilter: action.payload, selectedProject: null };

    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload, selectedProject: null };

    case 'FETCH_START':
      return { ...state, isLoading: true, error: null };

    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, projects: action.payload };

    case 'FETCH_ERROR':
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
}
```

### Example Data

```typescript
// src/data/portfolio.json
const portfolioProjects: PortfolioProject[] = [
  {
    id: 'ai-content-generator',
    title: 'AI Content Generation Pipeline',
    description: 'End-to-end LLM-powered content creation system with quality validation and multi-model orchestration.',
    longDescription: 'Built a production-grade content generation pipeline leveraging Claude 3.5 and GPT-4 with automatic quality validation, brand voice consistency checks, and multi-stage review workflows. The system processes 1000+ content pieces per week with 95% acceptance rate, reducing content production costs by 60% while maintaining premium quality standards.',
    technologies: ['Claude API', 'Python', 'FastAPI', 'React', 'PostgreSQL', 'Redis'],
    imageUrl: '/images/portfolio/ai-content-generator.webp',
    liveUrl: 'https://example.com/case-study',
    githubUrl: 'https://github.com/username/ai-content-pipeline',
    outcomes: [
      { metric: 'Cost Reduction', value: '60%', icon: 'TrendingDown' },
      { metric: 'Content Volume', value: '1000+/week', icon: 'FileText' },
      { metric: 'Acceptance Rate', value: '95%', icon: 'CheckCircle' }
    ],
    featured: true,
    category: 'LLM Application',
    completedAt: new Date('2026-01-15'),
    sortOrder: 1,
    caseStudyUrl: 'https://blog.example.com/ai-content-pipeline'
  },
  {
    id: 'predictive-maintenance-ml',
    title: 'Predictive Maintenance System',
    description: 'Machine learning model predicting equipment failures 7 days in advance with 87% accuracy.',
    longDescription: 'Developed and deployed a time-series ML model using gradient boosting and LSTM networks to predict industrial equipment failures. The system analyzes 50+ sensor metrics in real-time, providing maintenance teams with 7-day advance warnings. Achieved 87% prediction accuracy, reducing unplanned downtime by 40% and maintenance costs by $200K annually.',
    technologies: ['PyTorch', 'Scikit-learn', 'Pandas', 'Docker', 'AWS SageMaker', 'Grafana'],
    imageUrl: '/images/portfolio/predictive-maintenance.webp',
    outcomes: [
      { metric: 'Prediction Accuracy', value: '87%', icon: 'Target' },
      { metric: 'Downtime Reduction', value: '40%', icon: 'TrendingDown' },
      { metric: 'Annual Savings', value: '$200K', icon: 'DollarSign' }
    ],
    featured: true,
    category: 'Machine Learning',
    completedAt: new Date('2025-11-20'),
    sortOrder: 2
  },
  {
    id: 'automated-data-pipeline',
    title: 'Real-Time Data Pipeline',
    description: 'Scalable ETL pipeline processing 10M+ events daily with sub-second latency.',
    longDescription: 'Architected and implemented a real-time data pipeline using Apache Kafka, Spark, and Delta Lake to process customer behavioral data at scale. The system handles 10M+ events per day with P99 latency under 500ms, enabling real-time personalization and analytics. Built comprehensive monitoring and alerting with 99.9% uptime SLA.',
    technologies: ['Apache Kafka', 'Spark', 'Delta Lake', 'Python', 'Kubernetes', 'Terraform'],
    imageUrl: '/images/portfolio/data-pipeline.webp',
    liveUrl: 'https://example.com/tech-overview',
    outcomes: [
      { metric: 'Events Processed', value: '10M+/day', icon: 'Activity' },
      { metric: 'P99 Latency', value: '<500ms', icon: 'Zap' },
      { metric: 'Uptime SLA', value: '99.9%', icon: 'Shield' }
    ],
    featured: false,
    category: 'Data Engineering',
    completedAt: new Date('2025-09-10'),
    sortOrder: 3
  }
];
```

---

## 2. Technology Item Entity

### TypeScript Interface

```typescript
/**
 * Represents a technology/tool showcased in the tech showcase section.
 * Demonstrates breadth of AI engineering expertise.
 */
interface TechnologyItem {
  /** Unique identifier (kebab-case slug) */
  id: string;

  /** Technology name (e.g., "Claude 3.5 Sonnet", "PyTorch") */
  name: string;

  /** Technology category for filtering */
  category: TechnologyCategory;

  /** Brief description of proficiency/use case (50-150 characters) */
  description: string;

  /** Path to technology logo/icon (SVG preferred) */
  iconUrl: string;

  /** Proficiency level (1-5 scale) */
  proficiencyLevel: 1 | 2 | 3 | 4 | 5;

  /** Years of experience (optional, for display) */
  yearsExperience?: number;

  /** Related technologies (IDs of other TechnologyItems) */
  relatedTechnologies: string[];

  /** Display order within category */
  sortOrder: number;

  /** Whether to highlight in showcase */
  featured: boolean;

  /** Optional link to official documentation/website */
  officialUrl?: string;
}

/**
 * Technology categories for organization and filtering
 */
type TechnologyCategory =
  | 'LLM & AI Models'
  | 'ML Frameworks'
  | 'Data Engineering'
  | 'Web Development'
  | 'Cloud & DevOps'
  | 'Tools & Platforms';

/**
 * Technology showcase display state
 */
interface TechnologyDisplayState {
  /** Active filter category (null = all technologies) */
  activeCategory: TechnologyCategory | null;

  /** Currently hovered technology (for preview/tooltip) */
  hoveredTechnology: TechnologyItem | null;

  /** Search query for filtering by name/description */
  searchQuery: string;
}
```

### Validation Schema (Zod)

```typescript
import { z } from 'zod';

const technologyCategorySchema = z.enum([
  'LLM & AI Models',
  'ML Frameworks',
  'Data Engineering',
  'Web Development',
  'Cloud & DevOps',
  'Tools & Platforms'
]);

export const technologyItemSchema = z.object({
  id: z.string()
    .min(2)
    .max(50)
    .regex(/^[a-z0-9-]+$/, 'ID must be kebab-case'),

  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),

  category: technologyCategorySchema,

  description: z.string()
    .min(50, 'Description must be at least 50 characters')
    .max(150, 'Description must be at most 150 characters'),

  iconUrl: z.string().url('Must be valid URL'),

  proficiencyLevel: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5)
  ]),

  yearsExperience: z.number().int().min(0).max(20).optional(),

  relatedTechnologies: z.array(z.string()),

  sortOrder: z.number().int().min(0),

  featured: z.boolean(),

  officialUrl: z.string().url('Must be valid URL').optional()
});

export type TechnologyItem = z.infer<typeof technologyItemSchema>;
export type TechnologyCategory = z.infer<typeof technologyCategorySchema>;
```

### Proficiency Level Mapping

```typescript
/**
 * Maps numeric proficiency levels to human-readable labels
 */
const proficiencyLabels: Record<TechnologyItem['proficiencyLevel'], string> = {
  1: 'Beginner',
  2: 'Intermediate',
  3: 'Advanced',
  4: 'Expert',
  5: 'Master'
};

/**
 * Visual representation (star rating)
 */
function renderProficiencyStars(level: TechnologyItem['proficiencyLevel']): string {
  return '★'.repeat(level) + '☆'.repeat(5 - level);
}
```

### State Transitions

```typescript
/**
 * Technology showcase state machine
 */
type TechnologyAction =
  | { type: 'SET_CATEGORY'; payload: TechnologyCategory | null }
  | { type: 'HOVER_TECHNOLOGY'; payload: TechnologyItem | null }
  | { type: 'SET_SEARCH'; payload: string };

function technologyReducer(
  state: TechnologyDisplayState,
  action: TechnologyAction
): TechnologyDisplayState {
  switch (action.type) {
    case 'SET_CATEGORY':
      return { ...state, activeCategory: action.payload };

    case 'HOVER_TECHNOLOGY':
      return { ...state, hoveredTechnology: action.payload };

    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };

    default:
      return state;
  }
}
```

### Example Data

```typescript
// src/data/technologies.json
const technologyItems: TechnologyItem[] = [
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    category: 'LLM & AI Models',
    description: 'Production-grade LLM applications with advanced reasoning, function calling, and long-context processing.',
    iconUrl: '/images/tech-logos/anthropic.svg',
    proficiencyLevel: 5,
    yearsExperience: 2,
    relatedTechnologies: ['anthropic-sdk', 'langchain'],
    sortOrder: 1,
    featured: true,
    officialUrl: 'https://www.anthropic.com/claude'
  },
  {
    id: 'pytorch',
    name: 'PyTorch',
    category: 'ML Frameworks',
    description: 'Deep learning framework for training custom neural networks, fine-tuning models, and research.',
    iconUrl: '/images/tech-logos/pytorch.svg',
    proficiencyLevel: 4,
    yearsExperience: 4,
    relatedTechnologies: ['tensorflow', 'scikit-learn', 'huggingface'],
    sortOrder: 2,
    featured: true,
    officialUrl: 'https://pytorch.org'
  },
  {
    id: 'apache-spark',
    name: 'Apache Spark',
    category: 'Data Engineering',
    description: 'Large-scale data processing with PySpark for ETL pipelines, feature engineering, and batch ML.',
    iconUrl: '/images/tech-logos/spark.svg',
    proficiencyLevel: 4,
    yearsExperience: 3,
    relatedTechnologies: ['kafka', 'delta-lake', 'databricks'],
    sortOrder: 1,
    featured: true,
    officialUrl: 'https://spark.apache.org'
  },
  {
    id: 'react',
    name: 'React',
    category: 'Web Development',
    description: 'Building interactive AI-powered UIs with hooks, context, and modern React patterns.',
    iconUrl: '/images/tech-logos/react.svg',
    proficiencyLevel: 5,
    yearsExperience: 5,
    relatedTechnologies: ['nextjs', 'typescript', 'tailwindcss'],
    sortOrder: 1,
    featured: true,
    officialUrl: 'https://react.dev'
  },
  {
    id: 'aws',
    name: 'AWS',
    category: 'Cloud & DevOps',
    description: 'Cloud infrastructure with SageMaker, Lambda, ECS, S3, and RDS for scalable AI deployments.',
    iconUrl: '/images/tech-logos/aws.svg',
    proficiencyLevel: 4,
    yearsExperience: 4,
    relatedTechnologies: ['docker', 'kubernetes', 'terraform'],
    sortOrder: 1,
    featured: true,
    officialUrl: 'https://aws.amazon.com'
  },
  {
    id: 'langchain',
    name: 'LangChain',
    category: 'Tools & Platforms',
    description: 'Orchestrating complex LLM workflows with chains, agents, and retrieval-augmented generation.',
    iconUrl: '/images/tech-logos/langchain.svg',
    proficiencyLevel: 5,
    yearsExperience: 2,
    relatedTechnologies: ['claude-3-5-sonnet', 'openai', 'chromadb'],
    sortOrder: 1,
    featured: true,
    officialUrl: 'https://www.langchain.com'
  }
];
```

---

## 3. Contact Submission Entity

### TypeScript Interface

```typescript
/**
 * Represents a contact form submission from the landing page.
 * Captures visitor inquiries and contact information.
 */
interface ContactSubmission {
  /** Auto-generated UUID */
  id: string;

  /** Sender's full name (2-100 characters) */
  name: string;

  /** Sender's email address (validated) */
  email: string;

  /** Message content (20-2000 characters) */
  message: string;

  /** Type of inquiry (optional, for routing/prioritization) */
  inquiryType?: InquiryType;

  /** Submission timestamp (ISO 8601 format) */
  timestamp: Date;

  /** IP address of sender (for spam detection) */
  ipAddress: string;

  /** User agent string (for analytics/debugging) */
  userAgent: string;

  /** Submission status for tracking */
  status: SubmissionStatus;

  /** Optional error message if submission failed */
  errorMessage?: string;

  /** Whether email was successfully delivered */
  emailDelivered: boolean;

  /** Optional follow-up notes (for CRM integration) */
  notes?: string;
}

/**
 * Inquiry types for categorization
 */
type InquiryType =
  | 'consultation'    // Paid consultation request
  | 'project'         // Project collaboration opportunity
  | 'general';        // General inquiry/question

/**
 * Submission status for tracking lifecycle
 */
type SubmissionStatus =
  | 'pending'         // Initial state before submission
  | 'validating'      // Client-side validation in progress
  | 'submitting'      // API request in flight
  | 'success'         // Successfully submitted and email sent
  | 'error';          // Submission or email delivery failed

/**
 * Form display state
 */
interface ContactFormState {
  /** Current form field values */
  formData: Partial<Pick<ContactSubmission, 'name' | 'email' | 'message' | 'inquiryType'>>;

  /** Submission status */
  status: SubmissionStatus;

  /** Field-level validation errors */
  errors: Partial<Record<keyof ContactSubmission, string>>;

  /** Global form error message */
  errorMessage: string | null;

  /** Success message after submission */
  successMessage: string | null;

  /** Whether form has been successfully submitted */
  submitted: boolean;
}
```

### Validation Schema (Zod)

```typescript
import { z } from 'zod';

const inquiryTypeSchema = z.enum(['consultation', 'project', 'general']);

export const contactSubmissionSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name must only contain letters, spaces, hyphens, and apostrophes'),

  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .max(255, 'Email must be at most 255 characters')
    .toLowerCase()
    .trim(),

  message: z.string()
    .min(20, 'Message must be at least 20 characters')
    .max(2000, 'Message must be at most 2000 characters')
    .trim(),

  inquiryType: inquiryTypeSchema.optional()
});

// Client-side submission payload
export type ContactFormData = z.infer<typeof contactSubmissionSchema>;

// Server-side full entity (includes metadata)
export const contactSubmissionEntitySchema = contactSubmissionSchema.extend({
  id: z.string().uuid(),
  timestamp: z.coerce.date(),
  ipAddress: z.string().ip(),
  userAgent: z.string(),
  status: z.enum(['pending', 'validating', 'submitting', 'success', 'error']),
  errorMessage: z.string().optional(),
  emailDelivered: z.boolean(),
  notes: z.string().optional()
});

export type ContactSubmission = z.infer<typeof contactSubmissionEntitySchema>;
export type InquiryType = z.infer<typeof inquiryTypeSchema>;
```

### Real-Time Validation Rules

```typescript
/**
 * Field-level validation rules for real-time feedback
 */
const validationRules = {
  name: {
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z\s'-]+$/,
    errorMessages: {
      required: 'Name is required',
      minLength: 'Name must be at least 2 characters',
      maxLength: 'Name is too long (max 100 characters)',
      pattern: 'Name must only contain letters, spaces, hyphens, and apostrophes'
    }
  },

  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    maxLength: 255,
    errorMessages: {
      required: 'Email is required',
      pattern: 'Please enter a valid email address',
      maxLength: 'Email is too long'
    }
  },

  message: {
    minLength: 20,
    maxLength: 2000,
    errorMessages: {
      required: 'Message is required',
      minLength: 'Message must be at least 20 characters',
      maxLength: 'Message is too long (max 2000 characters)'
    }
  }
};
```

### State Transitions

```typescript
/**
 * Contact form state machine
 */
type ContactFormAction =
  | { type: 'UPDATE_FIELD'; field: keyof ContactFormData; value: string }
  | { type: 'VALIDATE_FIELD'; field: keyof ContactFormData }
  | { type: 'SET_STATUS'; status: SubmissionStatus }
  | { type: 'SET_ERROR'; field?: keyof ContactFormData; message: string }
  | { type: 'CLEAR_ERROR'; field?: keyof ContactFormData }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS'; message: string }
  | { type: 'SUBMIT_ERROR'; message: string }
  | { type: 'RESET_FORM' };

function contactFormReducer(
  state: ContactFormState,
  action: ContactFormAction
): ContactFormState {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        formData: { ...state.formData, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: undefined }
      };

    case 'VALIDATE_FIELD':
      // Validation logic here
      return state;

    case 'SET_STATUS':
      return { ...state, status: action.status };

    case 'SET_ERROR':
      if (action.field) {
        return {
          ...state,
          errors: { ...state.errors, [action.field]: action.message }
        };
      }
      return { ...state, errorMessage: action.message };

    case 'CLEAR_ERROR':
      if (action.field) {
        const { [action.field]: _, ...remainingErrors } = state.errors;
        return { ...state, errors: remainingErrors };
      }
      return { ...state, errorMessage: null };

    case 'SUBMIT_START':
      return {
        ...state,
        status: 'submitting',
        errorMessage: null,
        successMessage: null
      };

    case 'SUBMIT_SUCCESS':
      return {
        ...state,
        status: 'success',
        submitted: true,
        successMessage: action.message,
        formData: {},
        errors: {}
      };

    case 'SUBMIT_ERROR':
      return {
        ...state,
        status: 'error',
        errorMessage: action.message
      };

    case 'RESET_FORM':
      return {
        formData: {},
        status: 'pending',
        errors: {},
        errorMessage: null,
        successMessage: null,
        submitted: false
      };

    default:
      return state;
  }
}
```

### API Request/Response Types

```typescript
/**
 * POST /api/contact request payload
 */
interface ContactAPIRequest {
  name: string;
  email: string;
  message: string;
  inquiryType?: InquiryType;
}

/**
 * POST /api/contact success response
 */
interface ContactAPISuccessResponse {
  success: true;
  message: string;
  submissionId: string;
}

/**
 * POST /api/contact error response
 */
interface ContactAPIErrorResponse {
  success: false;
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

type ContactAPIResponse = ContactAPISuccessResponse | ContactAPIErrorResponse;
```

### Example Usage

```typescript
// Client-side form submission
async function handleSubmit(data: ContactFormData): Promise<void> {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result: ContactAPIResponse = await response.json();

    if (result.success) {
      // Show success message
      console.log('Submission ID:', result.submissionId);
    } else {
      // Show error message
      console.error('Errors:', result.errors);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
}
```

---

## 4. Shared Types & Utilities

### Animation State Types

```typescript
/**
 * Animation state for scroll-triggered elements
 */
interface AnimationState {
  /** Element is in viewport */
  isVisible: boolean;

  /** Animation has completed */
  hasAnimated: boolean;

  /** Animation is currently playing */
  isAnimating: boolean;
}

/**
 * Scroll position tracking
 */
interface ScrollState {
  /** Current Y scroll position in pixels */
  scrollY: number;

  /** Previous Y scroll position (for direction detection) */
  previousScrollY: number;

  /** Scroll direction */
  scrollDirection: 'up' | 'down' | 'none';

  /** Whether user is at top of page */
  isAtTop: boolean;

  /** Whether user is at bottom of page */
  isAtBottom: boolean;
}
```

### Theme & Style Types

```typescript
/**
 * Glassmorphism card style configuration
 */
interface GlassCardStyle {
  background: string;
  backdropFilter: string;
  border: string;
  boxShadow: string;
}

/**
 * Gradient configuration
 */
interface GradientConfig {
  type: 'linear' | 'radial';
  angle?: number; // For linear gradients
  colors: Array<{
    color: string;
    stop: number; // 0-100
  }>;
}

/**
 * Glow effect configuration
 */
interface GlowEffect {
  color: string;
  blur: number;
  spread: number;
  opacity: number;
}
```

### Utility Functions

```typescript
/**
 * Filter projects by category
 */
function filterProjectsByCategory(
  projects: PortfolioProject[],
  category: ProjectCategory | null
): PortfolioProject[] {
  if (!category) return projects;
  return projects.filter(p => p.category === category);
}

/**
 * Sort projects by sort order and completion date
 */
function sortProjects(projects: PortfolioProject[]): PortfolioProject[] {
  return [...projects].sort((a, b) => {
    if (a.sortOrder !== b.sortOrder) {
      return a.sortOrder - b.sortOrder;
    }
    return b.completedAt.getTime() - a.completedAt.getTime();
  });
}

/**
 * Get featured projects
 */
function getFeaturedProjects(projects: PortfolioProject[]): PortfolioProject[] {
  return projects.filter(p => p.featured);
}

/**
 * Filter technologies by category
 */
function filterTechnologiesByCategory(
  technologies: TechnologyItem[],
  category: TechnologyCategory | null
): TechnologyItem[] {
  if (!category) return technologies;
  return technologies.filter(t => t.category === category);
}

/**
 * Search technologies by query
 */
function searchTechnologies(
  technologies: TechnologyItem[],
  query: string
): TechnologyItem[] {
  if (!query) return technologies;
  const lowerQuery = query.toLowerCase();
  return technologies.filter(
    t => t.name.toLowerCase().includes(lowerQuery) ||
         t.description.toLowerCase().includes(lowerQuery)
  );
}
```

---

## Summary

This data model specification provides:

1. **PortfolioProject**: Complete project entity with validation, categories, outcomes, and state management
2. **TechnologyItem**: Technology showcase entity with proficiency levels, categories, and relationships
3. **ContactSubmission**: Contact form entity with comprehensive validation, status tracking, and error handling
4. **Shared Types**: Animation states, style configurations, and utility functions

All entities include:
- TypeScript interfaces with strict null-safety
- Zod validation schemas for runtime type checking
- State machines for UI interactions
- Example data for reference
- Utility functions for common operations

**Status**: Data model complete, ready for API contract definition.
