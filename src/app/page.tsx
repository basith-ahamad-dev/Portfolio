import { About } from "@/components/sections/About";
import { Certificates } from "@/components/sections/Certificates";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Process } from "@/components/sections/Process";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Skills } from "@/components/sections/Skills";
import { StatsManifesto } from "@/components/sections/StatsManifesto";
import { WorkReel } from "@/components/sections/WorkReel";
import { TigerTearReveal } from "@/components/ui/TigerTearReveal";

export default function Home() {
  return (
    <main id="main">
      <TigerTearReveal />
      <StatsManifesto />
      <About />
      <Services />
      <Skills />
      <Projects />
      <WorkReel />
      <Experience />
      <Process />
      <Education />
      <Certificates />
      <Contact />
    </main>
  );
}
