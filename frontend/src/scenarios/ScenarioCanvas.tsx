import type { ScenarioType } from "../types";
import { DdosScenario } from "./DdosScenario";
import { PhishingScenario } from "./PhishingScenario";
import { PhysicalFailureScenario } from "./PhysicalFailureScenario";
import { SqlInjectionScenario } from "./SqlInjectionScenario";

type ScenarioCanvasProps = {
  type: ScenarioType;
  latest: string;
  eventCount: number;
  attackTriggered: boolean;
  onTrigger: (input?: string) => void;
};

export function ScenarioCanvas({ type, latest, eventCount, attackTriggered, onTrigger }: ScenarioCanvasProps) {
  if (type === "PHISHING") return <PhishingScenario latest={latest} triggered={attackTriggered} onTrigger={() => onTrigger()} />;
  if (type === "SQL_INJECTION") return <SqlInjectionScenario latest={latest} triggered={attackTriggered} onTrigger={onTrigger} />;
  if (type === "DDOS") return <DdosScenario latest={latest} count={eventCount} triggered={attackTriggered} onTrigger={() => onTrigger()} />;
  return <PhysicalFailureScenario latest={latest} triggered={attackTriggered} onTrigger={() => onTrigger()} />;
}
