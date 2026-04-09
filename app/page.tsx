import { Hero } from "@/components/sections/Hero";
import { OpeningStatement } from "@/components/sections/OpeningStatement";
import { ImageBreak } from "@/components/sections/ImageBreak";
import { Sphere } from "@/components/sections/Sphere";
import { InlineCta } from "@/components/sections/InlineCta";
import { ServicesScroll } from "@/components/sections/ServicesScroll";
import { Experience } from "@/components/sections/Experience";
import { MonogramScroll } from "@/components/sections/MonogramScroll";
import { Clientele } from "@/components/sections/Clientele";
import { GlobalReach } from "@/components/sections/GlobalReach";
import { DiscretionStatement } from "@/components/sections/DiscretionStatement";
import { EnquiryCta } from "@/components/sections/EnquiryCta";
import { lifestyleImages } from "@/content/images";

export default function Home() {
  return (
    <>
      <Hero />
      <OpeningStatement />
      <ImageBreak
        src={lifestyleImages.hotelChauffeur}
        alt="Chauffeur waiting at the entrance of a grand hotel"
        caption="The Arrival"
      />
      <Sphere />
      <InlineCta
        heading="Let's design your next journey."
        href="/enquiry"
        label="Start Here"
      />
      <ServicesScroll />
      <Experience />
      <MonogramScroll />
      <Clientele />
      <InlineCta
        heading="Shall we talk?"
        subtext="Every relationship begins with a single, confidential exchange."
        href="/enquiry"
        label="Let's Discuss"
        variant="ivory"
      />
      <GlobalReach />
      <DiscretionStatement />
      <EnquiryCta />
    </>
  );
}
