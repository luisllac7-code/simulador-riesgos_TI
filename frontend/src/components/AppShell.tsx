import type { ReactNode } from "react";
import { FileText, Flask, House, Pulse, ShieldCheck, SquaresFour } from "@phosphor-icons/react";
import type { View } from "../types";
import { Brand } from "./Brand";

const labels: Record<View, string> = {
  landing: "Inicio",
  dashboard: "Dashboard",
  scenarios: "Escenarios",
  setup: "Configuracion",
  simulation: "Simulacion",
  risk: "Evaluacion",
  actions: "Contencion",
  recovery: "Recuperacion",
  result: "Resultados",
  report: "Informe"
};

type AppShellProps = {
  view: View;
  onNavigate: (view: View) => void;
  children: ReactNode;
};

export function AppShell({ view, onNavigate, children }: AppShellProps) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Brand />
        <nav>
          <NavButton active={view === "dashboard"} icon={SquaresFour} label="Dashboard" onClick={() => onNavigate("dashboard")} />
          <NavButton active={["scenarios", "setup"].includes(view)} icon={Flask} label="Escenarios" onClick={() => onNavigate("scenarios")} />
          <NavButton active={["simulation", "risk", "actions", "recovery"].includes(view)} icon={Pulse} label="Simulacion" onClick={() => undefined} disabled />
          <NavButton active={["result", "report"].includes(view)} icon={FileText} label="Resultados" onClick={() => undefined} disabled />
        </nav>
        <div className="sidebar-safe"><ShieldCheck size={20} /><span>Datos ficticios<br />Entorno aislado</span></div>
      </aside>
      <section className="workspace">
        <header className="topbar"><div><span>CyberLab</span><strong>{labels[view]}</strong></div><span className="status-chip"><i /> Sistema operativo</span></header>
        {children}
      </section>
    </div>
  );
}

type NavButtonProps = {
  active: boolean;
  icon: typeof House;
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

function NavButton({ active, icon: Icon, label, onClick, disabled = false }: NavButtonProps) {
  return <button className={`nav-button ${active ? "active" : ""}`} onClick={onClick} disabled={disabled}><Icon size={20} weight={active ? "fill" : "regular"} />{label}</button>;
}
