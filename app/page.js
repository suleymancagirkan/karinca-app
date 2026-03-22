import Services from "@/components/Services";
import Work from "@/components/Work";
import Process from "@/components/Process";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Services />
      <Work />
      <Process />
      <CTA />
      <Footer />
    </main>
  );
}