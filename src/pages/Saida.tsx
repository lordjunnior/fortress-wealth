import PillarLayout from "@/components/PillarLayout";
import { pillars } from "@/lib/pillars";

const Saida = () => {
  const pillar = pillars.find((p) => p.slug === "saida")!;
  return <PillarLayout pillar={pillar} />;
};

export default Saida;
