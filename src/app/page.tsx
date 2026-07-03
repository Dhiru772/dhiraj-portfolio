import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import BlogPreview from './components/BlogPreview';
import Timeline from './components/Timeline';
import OtherStuffs from './components/OtherStuffs/OtherStuffs';
import Contact from './components/Contact';

export default function Home() {
  return (
    <div className="bg-[#0B0F19] text-[#F9FAFB] min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <BlogPreview />
        <Timeline />
        <OtherStuffs />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="border-t border-[#38BDF8]/20 bg-[#0B0F19] py-8 px-6">
        <div className="max-w-6xl mx-auto text-center text-sm text-[#9CA3AF]">
          <p>© 2024 Dhiraj Sharma. Crafted with precision.</p>
        </div>
      </footer>
    </div>
  );
}
