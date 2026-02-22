import PillarLayout from "@/components/PillarLayout";
import { pillars } from "@/lib/pillars";

const Bitcoin = () => {
  const pillar = pillars.find((p) => p.slug === "bitcoin")!;
  return <PillarLayout pillar={pillar} />;
};

export default Bitcoin;
