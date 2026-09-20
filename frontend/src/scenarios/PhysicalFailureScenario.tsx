import { ArrowRight, Lightning } from "@phosphor-icons/react";
import { motion } from "motion/react";

type PhysicalFailureScenarioProps = {
  latest: string;
  triggered: boolean;
  onTrigger: () => void;
};

export function PhysicalFailureScenario({ latest, triggered, onTrigger }: PhysicalFailureScenarioProps) {
  const powerLost = latest !== "WAITING";
  const down = ["UPS_DEPLETED", "SERVICES_INTERRUPTED", "ALERT_TRIGGERED"].includes(latest);

  return (
    <section className="simulation-canvas physical-canvas">
      <div className="server-room">
        {[0, 1, 2].map((rack) => <div className={`rack ${down && rack < 2 ? "off" : ""}`} key={rack}>{Array.from({ length: 7 }).map((_, light) => <i key={light} />)}</div>)}
        <motion.button aria-label="Simular corte electrico" className={`power-symbol ${powerLost ? "danger" : ""}`} onClick={onTrigger} disabled={triggered} animate={powerLost ? { scale: [1, 1.12, 1] } : undefined} transition={{ repeat: Infinity, duration: 1 }}>
          <Lightning size={48} weight="fill" /><small>{triggered ? "Corte activo" : "Cortar energia"}</small>
        </motion.button>
      </div>
      <div className="power-flow"><div><span>Red electrica</span><strong>{powerLost ? "Interrumpida" : "Disponible"}</strong></div><ArrowRight /><div><span>UPS</span><strong>{down ? "Agotada" : powerLost ? "Activa" : "En espera"}</strong></div><ArrowRight /><div><span>Servidor</span><strong>{down ? "Sin energia" : "Operativo"}</strong></div></div>
    </section>
  );
}
