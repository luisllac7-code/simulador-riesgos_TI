import { Pulse } from "@phosphor-icons/react";
import { motion } from "motion/react";

type ServiceNodeProps = {
  icon: typeof Pulse;
  label: string;
  state: string;
};

export function ServiceNode({ icon: Icon, label, state }: ServiceNodeProps) {
  const stateLabel = state === "ok" ? "Operativo" : state === "warning" ? "Degradado" : state === "danger" ? "Afectado" : "En espera";
  return <motion.div layout className={`service-node ${state}`}><Icon size={26} weight="duotone" /><div><strong>{label}</strong><span>{stateLabel}</span></div></motion.div>;
}
