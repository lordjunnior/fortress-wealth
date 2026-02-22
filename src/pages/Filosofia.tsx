import PillarLayout from "@/components/PillarLayout";
import { pillars } from "@/lib/pillars";

const Filosofia = () => {
  const pillar = pillars.find((p) => p.slug === "filosofia")!;
  return <PillarLayout pillar={pillar} />;
};

export default Filosofia;
