import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Recycle, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-green-100">
      {/* Navigation - Minimalist Glassmorphism */}
      <nav className="fixed top-0 w-full z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center">
              {/* Scale logo for mobile */}
              <Image
                src="/logo.png"
                alt="Circular. Logo"
                width={180}    // Maximum intended width
                height={40}    // Corresponding height
                className="w-24 md:w-40 lg:w-40 h-auto" // Responsive widths
                priority
              />
            </div>
          </div>
          <Link
            href="/auth/register-campus"
            className="text-xs md:text-sm font-medium px-4 py-2 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 transition-all active:scale-95"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-28 md:pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-6">
            <Leaf className="w-3 h-3" />
            Sustainability starts at University
          </div>

          {/* Responsive Typography: 4xl on mobile, 7xl on desktop */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter mb-6 md:mb-8 bg-gradient-to-b from-zinc-900 to-zinc-500 bg-clip-text text-transparent leading-[1.1]">
            The campus economy, <br className="hidden md:block" /> made circular.
          </h1>

          <p className="text-base md:text-lg text-zinc-500 max-w-2xl mx-auto mb-10 leading-relaxed px-4">
            A private marketplace for students to trade, lend, and donate items.
            Reduce your footprint, save money, and build a stronger campus community.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
            <Link
              href="/marketplace"
              className="group w-full sm:w-auto px-8 py-4 rounded-2xl bg-green-600 text-white font-semibold hover:bg-green-700 hover:shadow-xl hover:shadow-green-200 transition-all flex items-center justify-center gap-2"
            >
              Explore Items
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/how-it-works"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-zinc-200 font-semibold hover:bg-zinc-50 transition-all text-center"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Minimalist Bento Grid Features */}
        <section className="max-w-6xl mx-auto mt-24 md:mt-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Users className="text-green-600" />}
            title="Verified Students"
            description="Only @edu emails allowed. Trade with confidence within your own campus walls."
          />
          <FeatureCard
            icon={<Recycle className="text-green-600" />}
            title="Zero Waste"
            description="Turn your unwanted dorm gear into someone else's treasure. Keep it out of landfills."
          />
          <FeatureCard
            icon={<Leaf className="text-green-600" />}
            title="Carbon Impact"
            description="Track your contribution to campus sustainability with real-time carbon saving metrics."
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-100 py-12 text-center text-zinc-400 text-xs md:text-sm">
        <p>© 2026 Circular Campus Project. Built for a better future.</p>
      </footer>
    </div>
  );
}

// Sub-component for cleaner code
function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-100 group hover:border-green-200 hover:bg-white hover:shadow-xl hover:shadow-zinc-200/50 transition-all">
      <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-green-50 group-hover:border-green-100 transition-all">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-zinc-500 leading-relaxed text-sm md:text-base">
        {description}
      </p>
    </div>
  );
}