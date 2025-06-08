import Hero from "@/components/hero"
import { SparklesCore } from "@/components/sparkles"
import { LoadingScreen } from "@/components/loading-screen"
import { FeaturedContent } from "@/components/featured-content"
import { TeamSection } from "@/components/team-section"
import { TeamFooter } from "@/components/team-footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a1a2e] antialiased bg-grid-white/[0.02] relative">
      <LoadingScreen />

      {/* Ambient background with moving particles */}
      <div className="h-full w-full absolute inset-0 z-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      <div className="relative z-10">
        <Hero />
        <FeaturedContent />
        <TeamSection />
      </div>

      <TeamFooter />
    </main>
  )
}
