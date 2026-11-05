import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const QR_URL = "https://qr-code-generator-f83u.onrender.com/";
const FILE_MANAGER_URL =
  "https://github.com/ayush-kumawat-0/terminal-file-manager";

function BrowserPreview({ href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Open QR Code Generator"
      className="project-preview browser-preview group/preview block"
    >
      <div className="preview-bar">
        <span />
        <span />
        <span />
        <div className="preview-address">
          qr-code-generator-f83u.onrender.com
        </div>
      </div>

      <div className="preview-screen">
        <iframe
          title="QR Code Generator preview"
          src={href}
          loading="lazy"
          tabIndex={-1}
        />

        <div className="preview-overlay">
          <span>Open live project ↗</span>
        </div>
      </div>
    </a>
  );
}

function TerminalPreview({ href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Open Terminal File Manager GitHub repository"
      className="project-preview terminal-preview group/preview block"
    >
      <div className="preview-bar">
        <span />
        <span />
        <span />
        <div className="preview-address">terminal-file-manager</div>
      </div>

      <div className="terminal-screen font-mono whitespace-pre">
        <p>
          <b className="text-[#f26a18]">ayush@linux</b>:<span className="text-orange-300">~</span>$ ./File_manager.sh
        </p>

        <div className="terminal-banner mt-3 text-neutral-400">
          <p className="text-neutral-200">TERMINAL FILE MANAGER</p>
          <p>Linux • Bash • File Tools</p>
        </div>

        <p className="mt-3">
          [1] Create File &nbsp;&nbsp; [2] Copy File
        </p>

        <p>
          [3] Delete File &nbsp;&nbsp; [4] Rename File
        </p>

        <p>
          [5] Move File &nbsp;&nbsp;&nbsp;&nbsp; [6] Inspect File
        </p>

        <p className="mt-2">
          [7] Create Directory &nbsp;&nbsp; [8] Check Directory
        </p>

        <p>
          [9] Browse Directory
        </p>

        <p className="mt-2">
          [10] Find Files &nbsp;&nbsp;&nbsp;&nbsp; [11] Search Text
        </p>

        <p>
          [12] Filter by Extension &nbsp; [13] Count Files
        </p>

        <p>
          [14] Directory Statistics
        </p>

        <p className="mt-2 text-neutral-400">
          [15] Exit
        </p>

        <p className="mt-3 text-neutral-400">
          Enter your choice (1-15) :{" "}
          <span className="text-[#f26a18]">_</span>
        </p>
      </div>

      {/* Hover overlay */}
      <div className="preview-overlay">
        <span>Open GitHub Repository ↗</span>
      </div>
    </a>
  );
}


const AWS_DASHBOARD_URL =
  "https://github.com/ayush-kumawat-0/AWS-CLI-Dashboard";

function AWSTerminalPreview({ href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Open AWS Automation Dashboard GitHub repository"
      className="project-preview terminal-preview group/preview block"
    >
      <div className="preview-bar">
        <span />
        <span />
        <span />
        <div className="preview-address">
          aws-cli-python-dashboard
        </div>
      </div>

      <div className="terminal-screen font-mono whitespace-pre">
        <p>
          <b className="text-[#f26a18]">ayush@aws</b>:<span className="text-orange-300">~</span>$ python main.py
        </p>

        <div className="terminal-banner mt-3 text-neutral-400">
          <p className="text-neutral-200">AWS AUTOMATION DASHBOARD</p>
          <p>Python • AWS CLI</p>
        </div>

        <p className="mt-3 text-[#f26a18]">
          Select an AWS Service
        </p>

        <p className="mt-2">
          [1] EC2 Management
          &nbsp;&nbsp; [2] S3 Management
        </p>

        <p>
          [3] IAM Management
          &nbsp;&nbsp; [4] Lambda Functions
        </p>

        <p>
          [5] API Gateway
        </p>

        <p className="mt-2">
          [6] Account Information
        </p>

        <p className="mt-2 text-neutral-400">
          [7] Exit
        </p>

        <p className="mt-3 text-neutral-400">
          ══════════════════════════════════════════════════════════════
        </p>

        <p className="mt-2">
          AWS CLI Status:{" "}
          <span className="text-green-400">● Connected</span>
        </p>

        <p>
          Interface:{" "}
          <span className="text-neutral-300">Python CLI</span>
        </p>

        <p className="mt-3 text-neutral-400">
          Enter your choice (1-7) :{" "}
          <span className="text-[#f26a18]">_</span>
        </p>
      </div>

      <div className="preview-overlay">
        <span>Open GitHub Repository ↗</span>
      </div>
    </a>
  );
}


const projects = [
  {
    num: "01",
    title: "QR Code Generator",
    description:
      "A customizable QR generator built with Python and a web interface, with multiple QR types, styling, logos, preview, download, copy and history features.",
    tags: ["Python", "Flask", "JavaScript", "Pillow", "qrcode"],
    preview: "browser",
    href: QR_URL,
  },
  {
    num: "02",
    title: "Terminal File Manager",
    description:
      "A menu-driven Linux shell project for practising real file-management operations directly from the terminal.",
    tags: ["Linux", "Bash", "Shell Scripting"],
    preview: "terminal",
    href: FILE_MANAGER_URL,
  },
  {
    num: "03",
    title: "AWS Cloud Project",
    description:
      "A cloud project focused on building practical infrastructure and learning how AWS services work together.",
    tags: ["AWS", "EC2", "S3", "IAM"],
    preview: "aws",
    href: AWS_DASHBOARD_URL,
  },
];

export default function Projects() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-reveal", {
        y: 45,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 78%",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="projects"
      className="relative z-10 py-28 sm:py-36 px-5 sm:px-8 lg:px-12 border-t border-neutral-200 dark:border-white/10"
    >
      <div className="max-w-6xl mx-auto">
        <div className="project-reveal grid lg:grid-cols-[.7fr_1.3fr] gap-12 lg:gap-24 mb-16">
          <div>
            <p className="section-kicker">03 / Projects</p>

            <p className="mt-5 text-sm text-neutral-400 leading-6 max-w-xs">
              Projects I built to turn concepts into something I can actually
              run, test and troubleshoot.
            </p>
          </div>

          <h2 className="text-3xl sm:text-5xl tracking-[-0.04em] font-medium">
            Built while learning. Not just listed.
          </h2>
        </div>

        <div className="space-y-16">
          {projects.map((project) => (
            <article
              key={project.title}
              className="project-reveal grid lg:grid-cols-[1.15fr_.85fr] gap-8 lg:gap-12 items-center"
            >
              {project.preview === "aws" ? (
                <AWSTerminalPreview href={project.href} />
              ) : project.preview === "browser" ? (
                <BrowserPreview href={project.href} />
              ) : (
                <TerminalPreview href={project.href} />
              )}

              <div className="lg:py-4">
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-xs font-mono text-[#f26a18]">
                    {project.num}
                  </span>

                  <span className="h-px w-10 bg-neutral-300 dark:bg-white/15" />

                  {project.href && project.preview === "browser" ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs uppercase tracking-widest text-neutral-400 hover:text-[#f26a18] transition-colors"
                    >
                      Live ↗
                    </a>
                  ) : project.href ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs uppercase tracking-widest text-neutral-400 hover:text-[#f26a18] transition-colors"
                    >
                      GitHub ↗
                    </a>
                  ) : null}
                </div>

                <h3 className="text-2xl sm:text-3xl font-medium tracking-tight">
                  {project.title}
                </h3>

                <p className="mt-4 text-[15px] leading-7 text-neutral-500 dark:text-neutral-400">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-xs uppercase tracking-wider text-neutral-400">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}