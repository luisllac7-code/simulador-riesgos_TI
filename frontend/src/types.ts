export type ScenarioType = "PHISHING" | "SQL_INJECTION" | "DDOS" | "PHYSICAL_FAILURE";

export type Control = { code: string; label: string; reduction: number };
export type ActionOption = { code: string; label: string; description: string; effectiveness: number };

export type Scenario = {
  type: ScenarioType;
  name: string;
  shortName: string;
  description: string;
  targetService: string;
  baseProbability: number;
  baseImpact: number;
  dimensions: { confidentiality: number; integrity: number; availability: number };
  controls: Control[];
  actions: ActionOption[];
};

export type SimulationEvent = {
  id: string;
  code: string;
  title: string;
  detail: string;
  severity: "warning" | "danger" | "critical";
  elapsedMs: number;
};

export type Risk = {
  probability: number;
  impact: number;
  score: number;
  level: string;
  priority: string;
  confidentiality: number;
  integrity: number;
  availability: number;
  reasons: string[];
};

export type View = "landing" | "dashboard" | "scenarios" | "setup" | "simulation" | "risk" | "actions" | "recovery" | "result" | "report";

