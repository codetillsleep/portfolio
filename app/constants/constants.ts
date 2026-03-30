import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  Code,
  Code2,
  Server,
  Database,
  GitBranch,
} from "lucide-react";

//contact section constants=>>
const socials = [
  {
    label: "GitHub",
    handle: "@codetillsleep",
    href: "https://github.com/codetillsleep",
    icon: Github,
  },
  {
    label: "LinkedIn",
    handle: "Saksham Sharma",
    href: "https://linkedin.com/in/saksham1864",
    icon: Linkedin,
  },
  {
    label: "LeetCode",
    handle: "@codetillsleep",
    href: "https://leetcode.com/u/codetillsleep/",
    icon: Code,
  },
  {
    label: "Email",
    handle: "saksham1864@email.com",
    href: "mailto:saksham1864@email.com",
    icon: Mail,
  },
];
// About section Constants=>
const skills = [
  {
    category: "Languages",
    icon: Code2,
    items: ["TypeScript", "Python", "C++"],
  },
  {
    category: "Backend",
    icon: Server,
    items: ["Node.js", "FastAPI", "Express", "GraphQL", "REST"],
  },
  {
    category: "Databases",
    icon: Database,
    items: ["MongoDB", "PostgreSQL", "Redis"],
  },
  {
    category: "DevOps & Tools",
    icon: GitBranch,
    items: ["Docker", "Git", "AWS", "Linux", "CI/CD"],
  },
];

const stats = [
  { value: "10+", label: "Projects Built (including hackathons)" },
  { value: "2+", label: "Years Coding" },
  { value: "4th", label: "Semester " },
  { value: "∞", label: "Cups of Coffee" },
];

//project section imports =>>>
const projects = [
  {
    id: "01",
    title: "Backend Optimisation Case Study",
    featured: false,
    description:
      "Real-time data pipeline that ingests, transforms, and visualizes streaming events. Built with event-driven architecture and WebSocket connections for live dashboards.",
    tags: ["Typescript", "Redis", "MongoDB", "Node & cache", "Docker", "JEST"],
    // github: "https://github.com/codetillsleep/notesapp2.0",
    // live: "https://10gpa.in",
    image: "/projects/UDS.png",
  },
  {
    id: "02",
    title: "10gpa",
    featured: false,
    description:
      "Real-time data pipeline that ingests, transforms, and visualizes streaming events. Built with event-driven architecture and WebSocket connections for live dashboards.",
    tags: ["Typescript", "Redis", "Next.js", "Express", "MongoDB"],
    github: "https://github.com/codetillsleep/notesapp2.0",
    live: "https://10gpa.in",
    image: "/projects/project-one.png",
  },
  {
    id: "03",
    title: "Nexus",
    featured: false,
    description:
      "Real-time data pipeline that ingests, transforms, and visualizes streaming events. Built with event-driven architecture and WebSocket connections for live dashboards.",
    tags: ["JavaScript", "React", "Express", "MongoDB", "WebSockets"],
    github: "https://github.com/yourusername/project-three",

    image: "/projects/image.png",
  },
];

//for navbar constant=>>>
const navLinks = [
  { name: "Work", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];
export { stats, skills, socials, projects, navLinks };
