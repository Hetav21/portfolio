import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { Experience } from '@/components/experience';
import { Certifications } from '@/components/certifications';
import { Projects } from '@/components/projects';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Certifications />
      <Projects />
    </>
  );
}
