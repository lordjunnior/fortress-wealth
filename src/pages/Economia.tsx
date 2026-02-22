import PillarLayout from "@/components/PillarLayout";
import { pillars } from "@/lib/pillars";

const Economia = () => {
  const pillar = pillars.find((p) => p.slug === "economia")!;
  return <PillarLayout pillar={pillar} />;
};

export default Economia;
