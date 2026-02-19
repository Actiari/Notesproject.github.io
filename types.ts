
export interface TraineeProfile {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  quote: string;
}

export interface JobSpecification {
  id: string;
  title: string;
  department: string;
  type: string;
  description: string;
  requirements: string[];
  qualifications: string[];
}

export interface CourseLink {
  title: string;
  provider: string;
  url: string;
  description: string;
}

export enum Page {
  Home = 'home',
  Trainees = 'trainees',
  Careers = 'careers',
  Apply = 'apply',
  Courses = 'courses'
}
