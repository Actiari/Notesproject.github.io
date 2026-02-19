
import { TraineeProfile, JobSpecification, CourseLink } from './types';

export const COMPANY_PROFILE = {
  name: "Hot Beans Web",
  tagline: "Brewing Excellence in Every Pixel",
  about: "At Hot Beans Web, we don't just build websites; we craft digital ecosystems that empower businesses to thrive in a connected world. Founded with a vision to merge creative artistry with technical precision, we've grown into a leading hub for innovation and mentorship in the tech industry.",
  values: [
    { title: "Innovation First", description: "We push the boundaries of what's possible with modern frameworks and AI-driven solutions.", icon: "fa-bolt-lightning" },
    { title: "Radial Mentorship", description: "Knowledge flows in every direction. Juniors learn from seniors, and seniors stay fresh from junior perspectives.", icon: "fa-seedling" },
    { title: "Code Craftsmanship", description: "Clean, performant, and accessible code isn't a goal—it's our baseline.", icon: "fa-gem" }
  ]
};

export const TRAINEES: TraineeProfile[] = [
  {
    id: "1",
    name: "Alex Rivera",
    role: "Junior Frontend Engineer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=500&auto=format&fit=crop",
    bio: "Alex transitioned from hospitality to tech, mastering React in record time. Now leads our internal UI library project.",
    quote: "Hot Beans Web saw my potential when others only saw my past experience. The growth trajectory here is vertical."
  },
  {
    id: "2",
    name: "Sarah Chen",
    role: "Trainee Systems Architect",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=500&auto=format&fit=crop",
    bio: "Sarah's background in mathematics helps her tackle our most complex database challenges with ease and elegance.",
    quote: "Every week feels like a masterclass. I'm building infrastructure that handles millions of requests already."
  },
  {
    id: "3",
    name: "Jordan Smith",
    role: "UX Strategy Intern",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&h=500&auto=format&fit=crop",
    bio: "Jordan bridges the gap between raw data and human-centric design, ensuring our apps feel intuitive.",
    quote: "Design at Hot Beans isn't about making things pretty; it's about solving problems people didn't know they had."
  }
];

export const JOBS: JobSpecification[] = [
  {
    id: "jr-frontend",
    title: "Junior Frontend Engineer",
    department: "Frontend",
    type: "Full-time",
    description: "Join our core UI team building highly interactive dashboards for global SaaS clients.",
    requirements: [
      "Proficiency in React, TypeScript, and Tailwind CSS",
      "Experience with state management (Redux/Zustand)",
      "Understanding of web accessibility (WCAG 2.1)"
    ],
    qualifications: ["Portfolio showcasing at least 2 complex React projects"]
  },
  {
    id: "trainee-fullstack",
    title: "Trainee Full-Stack Developer",
    department: "Engineering",
    type: "Graduate/Junior",
    description: "A hybrid role focusing on Next.js frontend and Node.js backend services.",
    requirements: [
      "Solid JS fundamentals",
      "Familiarity with SQL and NoSQL databases",
      "Eagerness to learn cloud deployment (AWS/Vercel)"
    ],
    qualifications: ["Computer Science degree or Bootcamp certification"]
  },
  {
    id: "ux-designer",
    title: "Junior UX/UI Designer",
    department: "Design",
    type: "Full-time",
    description: "Work directly with clients to translate business requirements into beautiful, functional interfaces.",
    requirements: [
      "Mastery of Figma and design systems",
      "Basic understanding of HTML/CSS constraints",
      "Strong prototyping skills"
    ],
    qualifications: ["Design portfolio with case studies"]
  },
  {
    id: "backend-intern",
    title: "Backend Engineering Intern",
    department: "Backend",
    type: "Internship",
    description: "Help optimize our API response times and explore microservices architecture.",
    requirements: [
      "Interest in Python or Go",
      "Understanding of RESTful principles",
      "Basic Git knowledge"
    ],
    qualifications: ["Current university student or self-taught with projects"]
  },
  {
    id: "qa-engineer",
    title: "Trainee QA Automation Engineer",
    department: "Engineering",
    type: "Full-time",
    description: "Ensure the reliability of our codebases through automated testing suites.",
    requirements: [
      "Familiarity with Cypress or Playwright",
      "Detail-oriented mindset",
      "Basic JavaScript knowledge"
    ],
    qualifications: ["Strong analytical skills"]
  }
];

export const COURSES: CourseLink[] = [
  {
    title: "Full Stack Open",
    provider: "University of Helsinki",
    url: "https://fullstackopen.com/en/",
    description: "The most comprehensive free course on modern web development with React and Node."
  },
  {
    title: "Frontend Masters",
    provider: "Frontend Masters",
    url: "https://frontendmasters.com",
    description: "Deep-dive workshops from the industry's best engineers on advanced JS and CSS."
  },
  {
    title: "Google UX Design",
    provider: "Coursera",
    url: "https://www.coursera.org/professional-certificates/google-ux-design",
    description: "Foundational training for those looking to break into product design."
  },
  {
    title: "Epic React",
    provider: "Kent C. Dodds",
    url: "https://epicreact.dev",
    description: "The gold standard for becoming a professional React engineer."
  }
];
