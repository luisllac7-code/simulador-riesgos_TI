import { Gauge, HardDrives } from "@phosphor-icons/react";
import { motion } from "motion/react";

type DdosScenarioProps = {
  latest: string;
  count: number;
  triggered: boolean;
  onTrigger: () => void;
};

export function DdosScenario({ latest, count, triggered, onTrigger }: DdosScenarioProps) {
  const down = ["SERVICE_DOWN", "ALERT_TRIGGERED"].includes(latest);
  const load = Math.min(98, 28 + count * 17);

  return (
    <section className="simulation-canvas ddos-canvas">
      <div className="traffic-map">
        {triggered && Array.from({ length: 10 }).map((_, index) => <motion.span key={index} className="packet" style={{ top: `${10 + (index % 5) * 17}%`, left: `${4 + (index % 3) * 12}%` }} animate={{ x: [0, 250], opacity: [0, 1, 0] }} transition={{ duration: 1.4, delay: index * 0.12, repeat: Infinity }} />)}
        <motion.div className={`server-target ${down ? "danger" : ""}`} animate={down ? { rotate: [-1, 1, -1] } : undefined} transition={{ repeat: Infinity, duration: 0.18 }}><HardDrives size={54} /><span>Servidor web</span></motion.div>
        <div className="traffic-value"><span>Trafico entrante</span><strong>{triggered ? 220 + count * 258 : 50} req/s</strong><small>Linea base: 50 req/s</small></div>
      </div>
      <div className="server-gauge">
        <Gauge size={28} /><span>Uso de CPU</span><strong>{triggered ? load : 28}%</strong><div><i style={{ width: `${triggered ? load : 28}%` }} /></div>
        <b>{down ? "Servicio no disponible" : load > 70 ? "Servidor degradado" : "Operativo"}</b>
        <button className="attack-trigger" onClick={onTrigger} disabled={triggered}>{triggered ? "Trafico elevado" : "Elevar trafico"}</button>
      </div>
    </section>
  );
}
