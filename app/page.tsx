import Hero from "@/components/Hero";
import About from "@/components/About";
import Certifications from "@/components/Certifications";
import Sidebar from "@/components/Sidebar";
import MobileDock from "@/components/MobileDock";
import ProjectCard from "@/components/ProjectCard";
import SideProjectList from "@/components/SideProjectList";
import FloatingCTA from "@/components/FloatingCTA";
import Footer from "@/components/Footer";

const projects = [
  {
    title: "Python CLI Port Scanner",
    description: "A command-line port scanner utilizing argparse for robust parameter handling and socket programming for network interaction. Demonstrates core networking concepts and CLI tool development.",
    tags: ["Python", "Networking", "CLI", "Socket"],
    images: ["#2d2d2d"],
    link: "https://github.com/IiamSAINT/Python-CLI-for-Port-Scanning"
  },
  {
    title: "React Productivity Suite",
    description: "A feature-rich React application for task management with priority controls and dynamic state management. showcases frontend proficiency and component architecture.",
    tags: ["React", "JavaScript", "CSS", "State Management"],
    images: ["#333333"],
    link: "https://github.com/IiamSAINT/todo-app"
  },
  {
    title: "Telegram Finance Bot",
    description: "An automated bot for financial tracking and alerts, integrating with Telegram APIs for seamless user interaction via chat interfaces.",
    tags: ["Python", "Telegram API", "Automation", "Finance"],
    images: ["#1a1a1a"],
    link: "https://github.com/IiamSAINT/Telegram_Finance_Bot"
  }
];

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
      {/* Sidebar Navigation (Desktop) */}
      <Sidebar />

      {/* Mobile Navigation Dock */}
      <MobileDock />

      {/* Floating CTA */}
      <FloatingCTA />

      {/* Main Content Area */}
      <div className="px-6 md:px-0 md:pl-28 md:pr-16 max-w-5xl mx-auto space-y-20 md:space-y-32 pb-32 md:pb-20">

        {/* Helper to center hero vertically relative to viewport but with scroll space */}
        <section id="home">
          <Hero />
        </section>

        {/* About Section */}
        <About />

        {/* Certifications Section */}
        <Certifications />

        {/* Selected Work */}
        <section id="work" className="space-y-12 px-2 md:px-4 scroll-mt-24">
          <h3 className="text-xl font-medium pl-2 text-gray-500">Selected Work</h3>
          <div className="space-y-12 md:space-y-20">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </section>

        {/* Side Projects */}
        <section id="side-projects" className="scroll-mt-24">
          <SideProjectList />
        </section>

        {/* Footer */}
        <section id="contact" className="scroll-mt-24">
          <Footer />
        </section>
      </div>
    </main>
  );
}
