import { ArrowRight, Check, ShieldCheck } from "@phosphor-icons/react";
import { SectionHeading } from "../components/SectionHeading";
import type { Scenario } from "../types";

type ActionsPageProps = {
  scenario: Scenario;
  selected: string[];
  setSelected: (actions: string[]) => void;
  onApply: () => void;
  loading: boolean;
};

export function ActionsPage({ scenario, selected, setSelected, onApply, loading }: ActionsPageProps) {
  const toggle = (code: string) => setSelected(selected.includes(code) ? selected.filter((item) => item !== code) : [...selected, code]);

  return (
    <>
      <SectionHeading eyebrow="Respuesta" title="Selecciona las medidas" text="Combina acciones de contencion, recuperacion y mejora permanente." />
      <div className="action-grid">
        {scenario.actions.map((action) => <button key={action.code} className={`action-card ${selected.includes(action.code) ? "selected" : ""}`} onClick={() => toggle(action.code)}><span className="action-check">{selected.includes(action.code) ? <Check weight="bold" /> : null}</span><ShieldCheck size={30} weight="duotone" /><h3>{action.label}</h3><p>{action.description}</p><span>Eficacia {action.effectiveness}/3</span></button>)}
      </div>
      <div className="footer-action"><p>{selected.length === 0 ? "Selecciona al menos una medida." : `${selected.length} medidas preparadas para ejecutar.`}</p><button className="button" onClick={onApply} disabled={selected.length === 0 || loading}>{loading ? "Aplicando..." : "Ejecutar acciones"}<ArrowRight /></button></div>
    </>
  );
}
