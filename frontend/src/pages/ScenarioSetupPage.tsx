import { ArrowLeft, Play, SlidersHorizontal } from "@phosphor-icons/react";
import { SectionHeading } from "../components/SectionHeading";
import { scenarioIcons } from "../config/scenarios";
import type { Scenario } from "../types";

type ScenarioSetupPageProps = {
  scenario: Scenario;
  controls: string[];
  setControls: (value: string[]) => void;
  speed: string;
  setSpeed: (value: string) => void;
  onStart: () => void;
  onBack: () => void;
  loading: boolean;
};

export function ScenarioSetupPage({ scenario, controls, setControls, speed, setSpeed, onStart, onBack, loading }: ScenarioSetupPageProps) {
  const Icon = scenarioIcons[scenario.type];
  const toggle = (code: string) => setControls(controls.includes(code) ? controls.filter((item) => item !== code) : [...controls, code]);

  return (
    <>
      <button className="back-button" onClick={onBack}><ArrowLeft /> Volver</button>
      <SectionHeading eyebrow="Configuracion" title="Configura el escenario" text="Los controles activos modificaran la probabilidad y el impacto calculados." />
      <div className="setup-layout">
        <section className="setup-summary"><span className="scenario-icon large"><Icon size={36} weight="duotone" /></span><div><span>Escenario seleccionado</span><h3>{scenario.name}</h3><p>{scenario.description}</p></div><dl><div><dt>Servicio objetivo</dt><dd>{scenario.targetService}</dd></div><div><dt>Probabilidad base</dt><dd>{scenario.baseProbability}/4</dd></div><div><dt>Impacto base</dt><dd>{scenario.baseImpact}/5</dd></div></dl></section>
        <section className="control-panel">
          <div className="panel-title"><SlidersHorizontal size={22} /><div><h3>Controles preventivos</h3><p>Activa o desactiva defensas antes de comenzar.</p></div></div>
          {scenario.controls.map((control) => <label className="toggle-row" key={control.code}><span><strong>{control.label}</strong><small>Reduccion estimada: {control.reduction} punto{control.reduction > 1 ? "s" : ""}</small></span><input type="checkbox" checked={controls.includes(control.code)} onChange={() => toggle(control.code)} /><i /></label>)}
          <label className="select-row"><span>Velocidad</span><select value={speed} onChange={(event) => setSpeed(event.target.value)}><option value="slow">Lenta</option><option value="normal">Normal</option><option value="fast">Rapida</option></select></label>
          <button className="button full" onClick={onStart} disabled={loading}>{loading ? "Preparando..." : "Iniciar simulacion"}<Play weight="fill" /></button>
        </section>
      </div>
    </>
  );
}
