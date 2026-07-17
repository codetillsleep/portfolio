import {
  Mail,
  Github,
  Linkedin,
  Code,
  Code2,
  Server,
  Database,
  GitBranch,
  Brain,
  Activity,
  Shield,
} from "lucide-react";

// contact section constants=>>
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
    label: "Email",
    handle: "saksham1864@gmail.com",
    href: "mailto:saksham1864@gmail.com",
    icon: Mail,
  },
];

// About section Constants=>
const skills = [
  {
    category: "Agentic AI & LLMs",
    icon: Brain,
    items: [
      "LangChain",
      "LangGraph",
      "Multi-Agent Orchestration",
      "Tool Calling",
      "MCP",
      "RAG Pipelines",
      "Embeddings",
      "Vector Search",
      "Prompt Engineering",
      "Fine-tuning (LoRA/QLoRA)",
    ],
  },
  {
    category: "Observability & Evaluation",
    icon: Activity,
    items: [
      "LangSmith",
      "RAGAS",
      "LLM-as-a-Judge",
      "OpenTelemetry",
      "Prometheus",
      "Grafana",
    ],
  },
  {
    category: "Safety & Guardrails",
    icon: Shield,
    items: [
      "Guardrails AI",
      "Output Filtering",
      "Policy Controls",
      "I/O Validation",
      "Safety Checks",
    ],
  },
  {
    category: "Backend & APIs",
    icon: Code2,
    items: [
      "FastAPI",
      "Node.js",
      "Express.js",
      "REST APIs",
      "Microservices",
      "WebSockets",
    ],
  },
  {
    category: "Data & Pipelines",
    icon: Database,
    items: [
      "Pandas",
      "NumPy",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "ChromaDB",
      "FAISS",
      "pgvector",
    ],
  },
  {
    category: "DevOps & Cloud",
    icon: GitBranch,
    items: [
      "AWS",
      "Docker",
      "CI/CD",
      "MLflow",
      "Git",
      "Serverless",
    ],
  },
];

const stats = [
  { value: "10+", label: "Projects Built (including hackathons)" },
  { value: "2+", label: "Years Coding" },
  { value: "4th", label: "Semester " },
  { value: "∞", label: "Cups of Coffee" },
];

// project section imports =>>>
const projects = [
  {
    id: "01",
    title: "Halcyon Credit: Agentic Underwriting Copilot",
    featured: true,
    description:
      "Designed and built an end-to-end agentic AI platform for automated credit underwriting. Powered by a LangGraph multi-agent orchestration backend, RAG pipelines over financial documents, and automated risk scoring workflows. Implemented observability-first architecture using LangSmith for agent run tracing, tool-call logging, latency metrics, and prompt versioning; designed guardrails and policy controls across prompt, tool, and output layers.",
    tags: ["Next.js", "LangGraph.js", "PostgreSQL", "pgvector", "Docker Compose", "CI/CD", "FastAPI"],
    github: "https://github.com/codetillsleep",
    live: "",
    image: "/projects/project-one.png",
  },
  {
    id: "02",
    title: "Multi-Agent Financial Intelligence System",
    featured: true,
    description:
      "Built a production agentic AI platform for multi-step financial query resolution using LangGraph orchestration, RAG pipelines, tool calling, and memory-based reasoning. Implemented a RAGAS evaluation pipeline measuring faithfulness, answer relevancy, and context recall; integrated output filtering and safety checks.",
    tags: ["LangGraph", "RAGAS", "Pandas", "PostgreSQL", "ChromaDB", "FastAPI"],
    github: "https://github.com/codetillsleep",
    live: "",
    image: "/projects/image.png",
  },
  {
    id: "03",
    title: "AI Voice Interview SaaS Platform",
    featured: false,
    description:
      "Shipped a production SaaS platform automating voice interviews with OpenAI/Anthropic APIs, real-time speech-to-text NLP, guardrail-checked evaluation, and intelligent scoring workflows.",
    tags: ["Next.js", "Node.js", "FastAPI", "OpenAI API", "Anthropic API", "Docker", "CI/CD"],
    github: "https://github.com/codetillsleep",
    live: "",
    image: "/projects/project-one.png",
  },
  {
    id: "04",
    title: "Risk Assessment & Fraud Detection Platform",
    featured: false,
    description:
      "Built an AI-powered KYC and fraud detection engine with classification-based risk scoring, SQL-backed structured data validation pipelines, input/output safety checks, and monitoring dashboards for production reliability.",
    tags: ["FastAPI", "Python", "PostgreSQL", "Pandas", "scikit-learn", "Docker", "AWS"],
    github: "https://github.com/codetillsleep",
    live: "",
    image: "/projects/image.png",
  },
];

// for navbar constant=>>>
const navLinks = [
  { name: "Work", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

const ResumeLink =
  "https://drive.google.com/file/d/1sDY8l1-0wowz97zN8LPn9p73eRepf8Un/view?usp=sharing";

export { stats, skills, socials, projects, navLinks, ResumeLink };
