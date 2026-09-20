import { ArrowRight, CheckCircle, FileText, Gauge, ShieldCheck } from "@phosphor-icons/react";
import { Metric } from "../components/Metric";
import { RiskCard } from "../components/RiskCard";
import { SectionHeading } from "../components/SectionHeading";
import type { Risk } from "../types";

type ResultsPageProps = {
  initial: Risk;
  residual: Risk;
  actions: number;
  onReport: () => void;
  onRepeat: () => void;
};

export function ResultsPage({ initial, residual, actions, onReport, onRepeat }: ResultsPageProps) {
  const reduction = Math.max(0, Math.round((1 - residual.score / initial.score) * 100));

  return (
    <>
      <SectionHeading eyebrow="Comparacion" title="Antes y despues" text="Las mismas reglas se aplicaron al riesgo inicial y al riesgo residual." />
      <div className="result-hero"><CheckCircle size={42} weight="fill" /><div><span>Simulacion completada</span><h3>El servicio fue recuperado y validado</h3></div><strong>{reduction}%<small>reduccion del riesgo</small></strong></div>
      <div className="comparison"><RiskCard title="Riesgo inicial" risk={initial} /><div className="comparison-arrow"><ArrowRight /></div><RiskCard title="Riesgo residual" risk={residual} residual /></div>
      <div className="result-metrics"><Metric icon={ShieldCheck} value={String(actions)} label="Medidas aplicadas" /><Metric icon={Gauge} value={`${initial.score} → ${residual.score}`} label="Puntuacion" /><Metric icon={CheckCircle} value="1.1" label="Version validada" /></div>
      <div className="footer-action"><button className="button secondary" onClick={onRepeat}>Repetir escenario</button><button className="button" onClick={onReport}>Ver informe completo <FileText /></button></div>
    </>
  );
}
