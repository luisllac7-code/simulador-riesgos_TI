import { Pulse } from "@phosphor-icons/react";

type MetricProps = {
  icon: typeof Pulse;
  value: string;
  label: string;
};

export function Metric({ icon: Icon, value, label }: MetricProps) {
  return <article className="metric"><Icon size={22} /><div><strong>{value}</strong><span>{label}</span></div></article>;
}
