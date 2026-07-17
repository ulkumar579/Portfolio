import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SectionHeader from "../shared/SectionHeader";
import ProjectCard from "./ProjectCard";
import ProjectDetail from "./ProjectDetail";
import { projects } from "@/data/portfolio";

export default function Projects() {
  const [active, setActive] = useState(null);
  return (
    <section id="projects" className="relative px-4 py-20 sm:px-6 md:px-16 md:py-28 lg:px-28 lg:py-32">
      <SectionHeader code="// 03_MODULES" title="Projects Data-Module" sub="[N=03]" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} onOpen={setActive} />
        ))}
      </div>
      <AnimatePresence>
        {active && <ProjectDetail project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}