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
    title: "10gpa",
    featured: false,
    description:
      "Academic resource platform built for underserved university branches — centralizes notes, PYQs, university-authorized syllabi, and curated video playlists in one place. Fills the gap left by existing platforms that ignore niche engineering branches.",
    tags: ["Typescript", "Next.js", "Express", "MongoDB", "Redis"],
    github: "https://github.com/codetillsleep/notesapp2.0",
    live: "https://10gpa.in",
    image: "/projects/project-one.png",
  },
  {
    id: "02",
    title: "Nexus",
    featured: false,
    description:
      "Real-time chat application with instant messaging, user authentication, and persistent chat history. Built on a WebSocket-driven architecture with a clean dark UI — designed for low-latency communication.",
    tags: ["JavaScript", "React", "Express", "MongoDB", "WebSockets"],
    github: "https://github.com/codetillsleep/Nexus",
    live: "Not Deployed",
    image: "/projects/image.png",
  },
];

//for navbar constant=>>>
const navLinks = [
  { name: "Work", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];
const ResumeLink =
  "https://drive.google.com/file/d/1jbZzhGhAlniB9DqF8dc12DQ4E_boBnc4/view?usp=sharing";
export { stats, skills, socials, projects, navLinks, ResumeLink };
