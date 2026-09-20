import { ArrowRight, Check, ShieldWarning } from "@phosphor-icons/react";
import { RiskMatrix } from "../components/RiskMatrix";
import { SectionHeading } from "../components/SectionHeading";
import type { Risk, Scenario } from "../types";

type RiskPageProps = {
  risk: Risk;
  scenario: Scenario;
  onContinue: () => void;
};

export function RiskPage({ risk, scenario, onContinue }: RiskPageProps) {
  return (
    <>
      <SectionHeading eyebrow="Evaluacion automatica" title="Resultado del ataque" text="El sistema calculo el nivel de riesgo a partir de la configuracion y el efecto observado." />
      <div className="risk-layout">
        <section className="risk-summary">
          <div className="alert-title"><ShieldWarning size={32} weight="fill" /><div><span>Alerta activa</span><h3>{scenario.name}</h3></div><b>{risk.priority}</b></div>
          <div className="risk-equation"><span>{risk.probability}<small>Probabilidad (1–4)</small></span><b>×</b><span>{risk.impact}<small>Impacto (1–5)</small></span><b>=</b><span className="score">{risk.score}<small>{risk.level}</small></span></div>
          <dl className="impact-list"><Impact label="Confidencialidad" value={risk.confidentiality} /><Impact label="Integridad" value={risk.integrity} /><Impact label="Disponibilidad" value={risk.availability} /></dl>
          <div className="reason-list">{risk.reasons.map((reason) => <p key={reason}><Check />{reason}</p>)}</div>
        </section>
        <RiskMatrix risk={risk} />
      </div>
      <div className="footer-action"><p>La simulacion esta pausada. Selecciona como responder al evento.</p><button className="button" onClick={onContinue}>Tomar acciones <ArrowRight /></button></div>
    </>
  );
}

function Impact({ label, value }: { label: string; value: number }) {
  return <div><dt>{label}</dt><dd><span>{value}/5</span><i><b style={{ width: `${value * 20}%` }} /></i></dd></div>;
}
