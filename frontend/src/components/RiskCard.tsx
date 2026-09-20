import type { Risk } from "../types";

type RiskCardProps = {
  title: string;
  risk: Risk;
  residual?: boolean;
};

export function RiskCard({ title, risk, residual = false }: RiskCardProps) {
  return <section className={`risk-card ${residual ? "residual" : ""}`}><span>{title}</span><strong>{risk.score}</strong><h3>{risk.level}</h3><dl><div><dt>Probabilidad</dt><dd>{risk.probability}/4</dd></div><div><dt>Impacto</dt><dd>{risk.impact}/5</dd></div><div><dt>Prioridad</dt><dd>{risk.priority}</dd></div></dl></section>;
}
