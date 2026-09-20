import { useState } from "react";
import { Database, Warning } from "@phosphor-icons/react";
import { motion } from "motion/react";

type SqlInjectionScenarioProps = {
  latest: string;
  triggered: boolean;
  onTrigger: (input?: string) => void;
};

export function SqlInjectionScenario({ latest, triggered, onTrigger }: SqlInjectionScenarioProps) {
  const [sqlInput, setSqlInput] = useState("admin' OR '1'='1");
  const accessed = ["DATABASE_ACCESSED", "INTEGRITY_AT_RISK", "ALERT_TRIGGERED"].includes(latest);

  return (
    <section className="simulation-canvas sql-canvas">
      <div className="browser-bar"><i /><i /><i /><span>empresa.demo/login</span></div>
      <div className="sql-content">
        <div className="attack-steps"><span className="active">1</span><p>Entrada preparada</p><span className={accessed ? "active" : ""}>2</span><p>Validacion evaluada</p><span className={accessed ? "danger" : ""}>3</span><p>Acceso simulado</p></div>
        <div className="login-form">
          <h3>Iniciar sesion</h3>
          <label>Usuario<input aria-label="Entrada SQL simulada" value={sqlInput} onChange={(event) => setSqlInput(event.target.value)} disabled={triggered} /></label>
          <label>Contrasena<input readOnly type="password" value="demostracion" /></label>
          <div className="field-warning"><Warning weight="fill" /> La entrada nunca se ejecuta en PostgreSQL</div>
          <button onClick={() => onTrigger(sqlInput)} disabled={triggered}>{triggered ? "Prueba en curso" : "Enviar entrada simulada"}</button>
        </div>
        <motion.div className={`database-stack ${accessed ? "compromised" : ""}`} animate={accessed ? { scale: [1, 1.05, 1] } : undefined} transition={{ repeat: Infinity, duration: 1.2 }}>
          <Database size={64} weight="duotone" /><strong>{accessed ? "1,248" : "0"}</strong><span>registros ficticios expuestos</span>
        </motion.div>
      </div>
    </section>
  );
}
