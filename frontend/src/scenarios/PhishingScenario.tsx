import { EnvelopeSimple, XCircle } from "@phosphor-icons/react";
import { motion } from "motion/react";

type PhishingScenarioProps = {
  latest: string;
  triggered: boolean;
  onTrigger: () => void;
};

export function PhishingScenario({ latest, triggered, onTrigger }: PhishingScenarioProps) {
  const compromised = ["CREDENTIALS_EXPOSED", "ALERT_TRIGGERED"].includes(latest);

  return (
    <section className="simulation-canvas phishing-canvas">
      <div className="mail-list">
        <strong>Bandeja de entrada</strong>
        <div className="mail-item active"><EnvelopeSimple /><span><b>soporte@seguridad-empresa.com</b><small>Verificacion urgente de su cuenta</small></span></div>
        <div className="mail-item"><span className="avatar">RH</span><span><b>Recursos Humanos</b><small>Reunion semanal</small></span></div>
        <div className="mail-item"><span className="avatar">U</span><span><b>Universidad</b><small>Reporte de matricula</small></span></div>
      </div>
      <motion.article className="email-preview" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
        <span className={`mail-badge ${compromised ? "danger" : "warning"}`}>{compromised ? "Cuenta comprometida" : "Sospechoso"}</span>
        <h3>Verificacion urgente de su cuenta</h3>
        <p className="sender">soporte@seguridad-empresa.com</p>
        <p>Su cuenta sera suspendida. Ingresa al siguiente enlace para validar tus datos.</p>
        <motion.button onClick={onTrigger} disabled={triggered} animate={!triggered ? { scale: [1, 1.03, 1] } : undefined} transition={{ repeat: Infinity, duration: 1.8 }}>{triggered ? "Enlace abierto" : "Validar cuenta"}</motion.button>
        {compromised && <div className="compromise-alert"><XCircle weight="fill" /> Se detecto un acceso no autorizado</div>}
      </motion.article>
    </section>
  );
}
