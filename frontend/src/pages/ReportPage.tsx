import { ArrowLeft, CheckCircle, FileText } from "@phosphor-icons/react";
import { Brand } from "../components/Brand";
import type { Risk, Scenario, SimulationEvent } from "../types";

type ReportPageProps = {
  scenario: Scenario;
  events: SimulationEvent[];
  initial: Risk;
  residual: Risk;
  actions: string[];
  onBack: () => void;
};

export function ReportPage({ scenario, events, initial, residual, actions, onBack }: ReportPageProps) {
  return (
    <>
      <div className="report-toolbar"><button className="back-button" onClick={onBack}><ArrowLeft /> Resultados</button><button className="button" onClick={() => window.print()}>Imprimir informe <FileText /></button></div>
      <article className="report">
        <header><Brand /><span>Informe de simulacion</span><h1>{scenario.name}</h1><p>Entorno simulado con activos, trafico, credenciales y datos ficticios.</p></header>
        <section><h2>Resumen ejecutivo</h2><div className="report-summary"><div><span>Servicio evaluado</span><strong>{scenario.targetService}</strong></div><div><span>Riesgo inicial</span><strong>{initial.score} - {initial.level}</strong></div><div><span>Riesgo residual</span><strong>{residual.score} - {residual.level}</strong></div></div></section>
        <section><h2>Bitacora</h2>{events.map((event) => <div className="report-event" key={event.id}><time>00:{String(Math.round(event.elapsedMs / 1000)).padStart(2, "0")}</time><div><strong>{event.title}</strong><p>{event.detail}</p></div></div>)}</section>
        <section><h2>Medidas seleccionadas</h2><div className="report-actions">{scenario.actions.filter((action) => actions.includes(action.code)).map((action) => <span key={action.code}><CheckCircle weight="fill" />{action.label}</span>)}</div></section>
        <footer>CyberLab TI · Informe educativo · Datos ficticios</footer>
      </article>
    </>
  );
}
