import { ArrowRight, Check, Clock, Pause } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { EventLog } from "../components/EventLog";
import { ScenarioCanvas } from "../scenarios/ScenarioCanvas";
import type { Scenario, SimulationEvent } from "../types";

type SimulationPageProps = {
  scenario: Scenario;
  events: SimulationEvent[];
  attackTriggered: boolean;
  riskReady: boolean;
  onTrigger: (input?: string) => void;
  onNext: () => void;
};

export function SimulationPage({ scenario, events, attackTriggered, riskReady, onTrigger, onNext }: SimulationPageProps) {
  const latest = events.at(-1)?.code ?? "WAITING";

  return (
    <>
      <div className="simulation-heading"><div><span className="live-dot" /> {riskReady ? "Simulacion completada" : "Simulacion en curso"}</div><h2>{scenario.name}</h2><span className="timer"><Clock /> 00:{String(Math.max(1, events.length * 4)).padStart(2, "0")}</span></div>
      <div className="simulation-layout"><ScenarioCanvas type={scenario.type} latest={latest} eventCount={events.length} attackTriggered={attackTriggered} onTrigger={onTrigger} /><EventLog events={events} /></div>
      <div className={`playback ${riskReady ? "complete" : ""}`}>
        <button aria-label={riskReady ? "Simulacion completada" : "Pausar"} disabled={riskReady}>{riskReady ? <Check weight="bold" /> : <Pause weight="fill" />}</button>
        <div><span style={{ width: `${Math.min(100, events.length * 20)}%` }} /></div><span>{events.length}/5 eventos</span>
        {riskReady && <motion.button className="next-risk-button" onClick={onNext} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>Siguiente: evaluar riesgo <ArrowRight weight="bold" /></motion.button>}
      </div>
    </>
  );
}
