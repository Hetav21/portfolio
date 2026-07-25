'use client';

import { useState } from 'react';
import {
  FileText,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Briefcase,
  GraduationCap,
  Award,
  Code2,
  Sparkles,
  MapPin,
  Globe,
  Layers,
  ChevronRight,
  Eye,
} from 'lucide-react';

export default function ResumeContent() {
  const [activeTab, setActiveTab] = useState<'html' | 'pdf'>('html');

  return (
    <div className="min-h-screen bg-[#11111b] text-[#cdd6f4] font-sans selection:bg-[#eb6f92] selection:text-white">
      {/* Sticky Header / Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#181825]/90 border-b border-[#313244] px-4 sm:px-8 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#eb6f92] to-[#cba6f7] flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-[#eb6f92]/20">
              H
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Hetav Shah
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#313244] text-[#cba6f7] border border-[#45475a]">
                  Associate AI Engineer
                </span>
              </h1>
              <p className="text-xs text-[#a6adc8] flex items-center gap-2 mt-0.5">
                <MapPin size={12} className="text-[#eb6f92]" /> Ahmedabad, India
                <span className="text-[#45475a]">|</span>
                <Mail size={12} className="text-[#cba6f7]" /> shahhetav2106@gmail.com
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-[#1e1e2e] p-1 rounded-xl border border-[#313244]">
              <button
                onClick={() => setActiveTab('html')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'html'
                    ? 'bg-[#eb6f92] text-white shadow-md'
                    : 'text-[#a6adc8] hover:text-white hover:bg-[#313244]'
                }`}
              >
                <Code2 size={14} />
                HTML Resume
              </button>
              <button
                onClick={() => setActiveTab('pdf')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'pdf'
                    ? 'bg-[#eb6f92] text-white shadow-md'
                    : 'text-[#a6adc8] hover:text-white hover:bg-[#313244]'
                }`}
              >
                <Eye size={14} />
                PDF Preview
              </button>
            </div>

            {/* Direct Download Button */}
            <a
              href="/resume.pdf"
              download="Hetav_Shah_Resume.pdf"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#cba6f7] to-[#eb6f92] text-[#11111b] font-bold text-xs rounded-xl shadow-lg hover:opacity-90 transition-opacity"
            >
              <Download size={14} />
              <span>Download PDF</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8">
        {activeTab === 'pdf' ? (
          /* PDF Embedded View */
          <div className="w-full h-[calc(100vh-140px)] rounded-2xl overflow-hidden border border-[#313244] shadow-2xl bg-[#1e1e2e]">
            <iframe
              src="/resume.pdf"
              className="w-full h-full border-0"
              title="Hetav Shah Resume PDF"
            />
          </div>
        ) : (
          /* Structured HTML Resume Content (Full Indexable DOM) */
          <div className="space-y-10">
            {/* Quick Hero / Social Links */}
            <section className="bg-gradient-to-br from-[#1e1e2e] to-[#181825] rounded-3xl p-6 sm:p-8 border border-[#313244] shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#eb6f92]/5 rounded-full filter blur-3xl pointer-events-none" />
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h2 className="text-3xl font-extrabold text-white tracking-tight">Hetav Shah</h2>
                  <p className="text-lg text-[#cba6f7] font-medium mt-1">
                    Associate AI Engineer &amp; Full Stack Systems Architect
                  </p>
                  <p className="text-sm text-[#a6adc8] mt-3 max-w-2xl leading-relaxed">
                    Specializing in Agentic AI architectures, LLM Integration (OpenSource &amp;
                    Proprietary), RAG Pipelines, Model Context Protocol (MCP), Multi-Agent
                    Orchestration, and scalable full-stack web applications.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://hetav.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#313244] text-xs font-semibold text-white hover:bg-[#45475a] border border-[#45475a] transition-all"
                  >
                    <Globe size={14} className="text-[#89b4fa]" />
                    hetav.dev
                    <ExternalLink size={12} className="opacity-60" />
                  </a>
                  <a
                    href="https://github.com/Hetav21"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#313244] text-xs font-semibold text-white hover:bg-[#45475a] border border-[#45475a] transition-all"
                  >
                    <Github size={14} className="text-[#a6e3a1]" />
                    github.com/Hetav21
                    <ExternalLink size={12} className="opacity-60" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/hetav2106/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#313244] text-xs font-semibold text-white hover:bg-[#45475a] border border-[#45475a] transition-all"
                  >
                    <Linkedin size={14} className="text-[#89dceb]" />
                    LinkedIn
                    <ExternalLink size={12} className="opacity-60" />
                  </a>
                </div>
              </div>
            </section>

            {/* Technical Skills Grid */}
            <section className="bg-[#1e1e2e] rounded-3xl p-6 sm:p-8 border border-[#313244] shadow-lg">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Code2 className="text-[#eb6f92]" size={22} />
                Technical Skills &amp; Competencies
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#181825] border border-[#313244]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#cba6f7]">
                    Agentic AI &amp; LLM Engineering
                  </span>
                  <p className="text-sm text-[#cdd6f4] mt-2 leading-relaxed">
                    LLM Integration (OpenSource LLMs), Agent-to-Agent (A2A), RAG Pipelines, Dense
                    &amp; Sparse Embeddings, Model Context Protocol (MCP), Multi-Agent Orchestration
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#181825] border border-[#313244]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#89b4fa]">
                    Languages &amp; Core Stack
                  </span>
                  <p className="text-sm text-[#cdd6f4] mt-2 leading-relaxed">
                    Python, TypeScript, JavaScript, SQL, Zod, C/C++
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#181825] border border-[#313244]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#a6e3a1]">
                    Web Frameworks &amp; Systems
                  </span>
                  <p className="text-sm text-[#cdd6f4] mt-2 leading-relaxed">
                    React, Next.js, FastAPI, Express.js, Hono, Electron.js, Tailwind CSS
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#181825] border border-[#313244]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#f9e2af]">
                    Data, Cloud &amp; Infrastructure
                  </span>
                  <p className="text-sm text-[#cdd6f4] mt-2 leading-relaxed">
                    PostgreSQL, pgvector, Redis, BM25, Vector Search, AWS, Docker, CI/CD,
                    Cloudflare, NixOS, Git
                  </p>
                </div>
              </div>
            </section>

            {/* Work Experience */}
            <section className="bg-[#1e1e2e] rounded-3xl p-6 sm:p-8 border border-[#313244] shadow-lg">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Briefcase className="text-[#cba6f7]" size={22} />
                Work Experience
              </h2>
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-[#181825] border border-[#313244] relative pl-6 border-l-4 border-l-[#eb6f92]">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">Associate AI Engineer</h3>
                      <p className="text-xs text-[#cba6f7] font-semibold">
                        ProductSquads <span className="text-[#6c7086]">•</span> A2A, LLMs, Agentic
                        RAG, MCP, Agentic AI
                      </p>
                    </div>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#313244] text-[#f9e2af]">
                      Apr 2026 – Present
                    </span>
                  </div>
                  <ul className="space-y-2 text-sm text-[#a6adc8] list-disc list-inside">
                    <li>
                      Won Jury Special Award at Praveg × ProductSquads Codeathon for an
                      A2A-compatible Intelligent Document Processing (IDP) Agent.
                    </li>
                    <li>
                      Productionized the IDP agent on AWS Lambda using GPT-4V for automated OCR,
                      document classification, and metadata extraction.
                    </li>
                    <li>
                      Built a containerized financial data-extraction pipeline (Python, FastAPI)
                      with a taxonomy-mapping engine that reconstructs complex tables into semantic
                      HTML, achieving high recall across 200+ accounting concepts at 90%+
                      field-level accuracy.
                    </li>
                    <li>
                      Implemented server-side persistence across distributed streaming Lambda agents
                      powering the AI Assistant micro-frontend and its BFF.
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-[#181825] border border-[#313244] relative pl-6 border-l-4 border-l-[#a6e3a1]">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">AI Intern</h3>
                      <p className="text-xs text-[#a6e3a1] font-semibold">
                        ProductSquads <span className="text-[#6c7086]">•</span> Python, LangChain,
                        Vector Databases, RAG
                      </p>
                    </div>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#313244] text-[#f9e2af]">
                      Nov 2025 – Apr 2026
                    </span>
                  </div>
                  <ul className="space-y-2 text-sm text-[#a6adc8] list-disc list-inside">
                    <li>
                      Developed custom RAG pipelines and integrated LLMs via Bedrock and vLLM
                      runtimes.
                    </li>
                    <li>
                      Built vector search interfaces with LangChain and custom embedding pipelines.
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-[#181825] border border-[#313244] relative pl-6 border-l-4 border-l-[#89b4fa]">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">Full Stack Intern</h3>
                      <p className="text-xs text-[#89b4fa] font-semibold">
                        Meru Technosoft <span className="text-[#6c7086]">•</span> Electron.js,
                        Microservices, gRPC, TypeScript, React
                      </p>
                    </div>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#313244] text-[#f9e2af]">
                      Jun 2025 – Jul 2025
                    </span>
                  </div>
                  <ul className="space-y-2 text-sm text-[#a6adc8] list-disc list-inside">
                    <li>
                      Engineered a full-stack Tally integration solution with a desktop application
                      and backend microservice, solving Tally&apos;s lack of a cloud-based API for
                      hellobooks.ai.
                    </li>
                    <li>
                      Architected a custom OAuth2-like authentication framework with PKCE for secure
                      communication between web, desktop client, and backend microservices.
                    </li>
                    <li>
                      Established CI/CD pipeline with automated builds and releases; built developer
                      CLI tools for configuration management and real-time diagnostics.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Featured Projects */}
            <section className="bg-[#1e1e2e] rounded-3xl p-6 sm:p-8 border border-[#313244] shadow-lg">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Sparkles className="text-[#f9e2af]" size={22} />
                Featured AI &amp; Engineering Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-[#181825] border border-[#313244] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base font-bold text-white">Deep Research Agent</h3>
                      <a
                        href="https://github.com/Hetav21/deep-research-agent"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#eb6f92] hover:underline text-xs font-semibold flex items-center gap-1"
                      >
                        GitHub <ExternalLink size={12} />
                      </a>
                    </div>
                    <p className="text-xs text-[#cba6f7] mb-3">
                      Autonomous Multi-Agent System, Recursive Research Loops, Chain-of-Thoughts
                    </p>
                    <p className="text-xs text-[#a6adc8] leading-relaxed">
                      Engineered an autonomous multi-agent system using Python and FastAPI
                      performing recursive web research and synthesis using OpenAI Agents SDK to
                      coordinate specialized Query, Search, and Synthesis agents.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#181825] border border-[#313244] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base font-bold text-white">
                        GDPR Compliance Intelligence Platform
                      </h3>
                      <a
                        href="https://github.com/Hetav21/gdpr-rag"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#eb6f92] hover:underline text-xs font-semibold flex items-center gap-1"
                      >
                        GitHub <ExternalLink size={12} />
                      </a>
                    </div>
                    <p className="text-xs text-[#89b4fa] mb-3">
                      Hybrid Retrieval (Dense+Sparse), RRF, Multi-Query Expansion, Multi-Modal ETL
                    </p>
                    <p className="text-xs text-[#a6adc8] leading-relaxed">
                      Architected a Multi-Modal RAG system combining dense vector search (pgvector)
                      + BM25 sparse retrieval with Reciprocal Rank Fusion, utilizing GPT-4o Vision
                      for document ETL and Redis for query scaling.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Education & Certifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="bg-[#1e1e2e] rounded-3xl p-6 sm:p-8 border border-[#313244] shadow-lg">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <GraduationCap className="text-[#89b4fa]" size={20} />
                  Education
                </h2>
                <div className="p-4 rounded-2xl bg-[#181825] border border-[#313244]">
                  <h3 className="text-base font-bold text-white">Adani University</h3>
                  <p className="text-xs text-[#89b4fa]">Ahmedabad, India</p>
                  <p className="text-xs text-[#a6adc8] mt-2 font-medium">
                    B.Tech Computer Science Engineering —{' '}
                    <span className="text-[#a6e3a1]">CGPA: 8.30/10</span>
                  </p>
                  <p className="text-xs text-[#6c7086] mt-1">Expected Graduation: June 2026</p>
                </div>
              </section>

              <section className="bg-[#1e1e2e] rounded-3xl p-6 sm:p-8 border border-[#313244] shadow-lg">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Award className="text-[#a6e3a1]" size={20} />
                  Certifications
                </h2>
                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-[#181825] border border-[#313244]">
                    <h3 className="text-xs font-bold text-white">
                      Introduction to Model Context Protocol &amp; Advanced Topics
                    </h3>
                    <p className="text-xs text-[#a6e3a1]">Issued by Anthropic • Dec 2025</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#181825] border border-[#313244]">
                    <h3 className="text-xs font-bold text-white">
                      AWS Academy Graduate - AWS Academy Cloud Developing
                    </h3>
                    <p className="text-xs text-[#f9e2af]">
                      Issued by Amazon Web Services • Nov 2024
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#313244] py-8 mt-12 text-center text-xs text-[#6c7086]">
        <p>© {new Date().getFullYear()} Hetav Shah. All rights reserved.</p>
        <p className="mt-1">
          Built with Next.js, React, Tailwind CSS, &amp; Typescript. Hosted on Vercel.
        </p>
      </footer>
    </div>
  );
}
