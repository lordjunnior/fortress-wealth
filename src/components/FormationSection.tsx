import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { formationLevels } from "@/lib/constants";
import { Shield } from "lucide-react";

const pillarRoutes = ["/economia", "/bitcoin", "/saida", "/filosofia"];

const FormationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();

  return (
    <div className="mb-16">
      <div className="flex items-center gap-3 mb-8" ref={ref}>
        <Shield className="w-5 h-5 text-gold" />
        <h3 className="text-xl font-semibold">Níveis de Formação</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {formationLevels.map((level, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
            className="card-wealth flex flex-col cursor-pointer hover:border-gold/30 transition-colors"
            onClick={() => navigate(pillarRoutes[i])}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-2xl font-bold text-gold">{level.level}</span>
              <span className="font-mono text-[9px] tracking-widest text-gold bg-gold/10 px-2 py-0.5 rounded">
                {level.badge}
              </span>
            </div>
            <h4 className="font-semibold text-sm mb-2">{level.name}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed flex-1">{level.desc}</p>
            <div className="mt-4 h-1.5 bg-secondary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: `${25 * (i + 1)}%` } : {}}
                transition={{ duration: 1, delay: 0.3 + i * 0.15 }}
                className="h-full gradient-gold rounded-full"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FormationSection;
