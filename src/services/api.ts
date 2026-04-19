import content from "@/data/content.json";

export type Product = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export type HeroContent = typeof content["hero"];
export type FeaturesContent = typeof content["featuresSection"];
export type Content = typeof content;

function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

function randomDelay() {
  return delay(1000 + Math.random() * 500);
}

function maybeFail() {
  if (Math.random() < 0.2) {
    throw new Error("Failed to load content. Please try again.");
  }
}

export async function fetchHeroContent(): Promise<HeroContent> {
  await randomDelay();
  maybeFail();
  return content.hero;
}

export async function fetchFeaturesContent(): Promise<FeaturesContent> {
  await randomDelay();
  maybeFail();
  return content.featuresSection;
}

export async function fetchContent(): Promise<Content> {
  await randomDelay();
  maybeFail();
  return content;
}
