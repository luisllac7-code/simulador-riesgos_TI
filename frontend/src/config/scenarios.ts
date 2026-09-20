import { Database, EnvelopeSimple, Lightning, Network } from "@phosphor-icons/react";
import type { ScenarioType } from "../types";

export const scenarioIcons: Record<ScenarioType, typeof EnvelopeSimple> = {
  PHISHING: EnvelopeSimple,
  SQL_INJECTION: Database,
  DDOS: Network,
  PHYSICAL_FAILURE: Lightning
};

export const scenarioInteractions: Record<ScenarioType, string> = {
  PHISHING: "OPEN_PHISHING_LINK",
  SQL_INJECTION: "SUBMIT_SQL_INPUT",
  DDOS: "RAISE_TRAFFIC",
  PHYSICAL_FAILURE: "CUT_POWER"
};
