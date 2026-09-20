import type { CSSProperties } from "react";
import { CheckCircle, Pulse } from "@phosphor-icons/react";
import { motion } from "motion/react";

export function RecoveryPage({ progress, message }: { progress: number; message: string }) {
  return (
    <div className="recovery-view">
      <div className="recovery-orbit">
        <motion.div className="recovery-progress" style={{ "--progress": `${progress * 3.6}deg` } as CSSProperties}><span>{progress}%</span></motion.div>
        {[0, 1, 2].map((item) => <motion.i key={item} animate={{ rotate: 360 }} transition={{ duration: 3 + item, repeat: Infinity, ease: "linear" }} />)}
      </div>
      <span className="eyebrow"><Pulse /> Recuperacion en curso</span><h2>{message}</h2><p>El motor aplica las medidas seleccionadas y verifica el estado de los servicios.</p>
      <div className="recovery-steps"><span className={progress >= 20 ? "done" : ""}><CheckCircle weight="fill" /> Contencion aplicada</span><span className={progress >= 55 ? "done" : ""}><CheckCircle weight="fill" /> Sesiones y servicios verificados</span><span className={progress >= 82 ? "done" : ""}><CheckCircle weight="fill" /> Integridad validada</span><span className={progress >= 100 ? "done" : ""}><CheckCircle weight="fill" /> Servicio recuperado</span></div>
    </div>
  );
}
