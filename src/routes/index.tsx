import { createFileRoute } from "@tanstack/react-router";
import { useContent } from "@/hooks/useContent";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { LandingSkeleton } from "@/components/sections/LandingSkeleton";
import { ErrorState } from "@/components/sections/ErrorState";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Grafterr — Restaurant technology & payments platform" },
      {
        name: "description",
        content:
          "Grafterr is an end-to-end restaurant technology and payments platform — POS, self-service kiosks, kitchen displays, online ordering and payments.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const state = useContent();

  if (state.status === "loading") {
    return (
      <main
        style={{
          opacity: 0,
          animation: "fade-in 0.3s ease 0.1s forwards",
        }}
      >
        <LandingSkeleton />
      </main>
    );
  }

  if (state.status === "error") {
    return (
      <main>
        <ErrorState message={state.error} onRetry={state.retry} />
      </main>
    );
  }

  return (
    <main
      style={{
        opacity: 0,
        animation: "fade-in 0.4s ease forwards",
      }}
    >
      <HeroSection hero={state.data.hero} />
      <FeaturesSection features={state.data.featuresSection} />
    </main>
  );
}
