import { ArrowRight } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { SectionHeading } from "../components/SectionHeading";
import { scenarioIcons } from "../config/scenarios";
import type { Scenario } from "../types";

type ScenarioPickerPageProps = {
  scenarios: Scenario[];
  onSelect: (scenario: Scenario) => void;
};

export function ScenarioPickerPage({ scenarios, onSelect }: ScenarioPickerPageProps) {
  return (
    <>
      <SectionHeading eyebrow="Laboratorio" title="Selecciona un escenario" text="Cada escenario utiliza el mismo ciclo de deteccion, evaluacion, respuesta y recuperacion." />
      <div className="scenario-grid">
        {scenarios.map((scenario, index) => {
          const Icon = scenarioIcons[scenario.type];
          return (
            <motion.button key={scenario.type} className="scenario-card" onClick={() => onSelect(scenario)} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.07 }} whileHover={{ y: -4 }}>
              <span className="scenario-icon"><Icon size={30} weight="duotone" /></span><span className="scenario-number">0{index + 1}</span><h3>{scenario.name}</h3><p>{scenario.description}</p><span className="scenario-target">{scenario.targetService}</span><span className="card-arrow"><ArrowRight /></span>
            </motion.button>
          );
        })}
      </div>
    </>
  );
}
