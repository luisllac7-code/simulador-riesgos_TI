import { ArrowRight, Database, DesktopTower, EnvelopeSimple, Gauge, Globe, HardDrives, LockKey, Pulse, ShieldCheck, UsersThree } from "@phosphor-icons/react";
import { Metric } from "../components/Metric";
import { SectionHeading } from "../components/SectionHeading";
import { ServiceNode } from "../components/ServiceNode";
import type { SimulationEvent } from "../types";

const statusFromEvents = (events: SimulationEvent[]) => {
  const codes = new Set(events.map((event) => event.code));
  return {
    mail: codes.has("CREDENTIALS_EXPOSED") ? "danger" : codes.has("EMAIL_RECEIVED") ? "warning" : "ok",
    portal: codes.has("SERVICE_DOWN") || codes.has("SERVICES_INTERRUPTED") ? "danger" : codes.has("THRESHOLD_EXCEEDED") ? "warning" : "ok",
    database: codes.has("DATABASE_ACCESSED") || codes.has("SERVICES_INTERRUPTED") ? "danger" : "ok",
    server: codes.has("CPU_SATURATED") || codes.has("UPS_DEPLETED") ? "danger" : codes.has("TRAFFIC_RISING") || codes.has("POWER_LOST") ? "warning" : "ok"
  };
};

type DashboardPageProps = { onStart: () => void; events: SimulationEvent[] };

export function DashboardPage({ onStart, events }: DashboardPageProps) {
  const status = statusFromEvents(events);

  return (
    <>
      <div className="title-row"><SectionHeading eyebrow="Infraestructura" title="Estado de los servicios TI" text="Visualiza las dependencias antes de ejecutar una simulacion." /><button className="button" onClick={onStart}>Nueva simulacion <ArrowRight /></button></div>
      <div className="metric-grid"><Metric icon={Pulse} value="99.8%" label="Disponibilidad" /><Metric icon={LockKey} value="100%" label="Integridad" /><Metric icon={UsersThree} value="0" label="Cuentas comprometidas" /><Metric icon={Gauge} value="32%" label="Uso de CPU" /></div>
      <section className="infra-panel">
        <div className="infra-line top"><ServiceNode icon={UsersThree} label="Empleados" state="ok" /><ServiceNode icon={EnvelopeSimple} label="Correo" state={status.mail} /></div>
        <div className="infra-line middle"><ServiceNode icon={Globe} label="Internet" state="ok" /><span className="connector" /><ServiceNode icon={DesktopTower} label="Portal web" state={status.portal} /><span className="connector" /><ServiceNode icon={Database} label="Base de datos" state={status.database} /></div>
        <div className="infra-line bottom"><ServiceNode icon={HardDrives} label="Servidor" state={status.server} /><ServiceNode icon={HardDrives} label="Servidor de respaldo" state="standby" /></div>
      </section>
      <div className="notice"><ShieldCheck size={24} /><div><strong>Preparado para simular</strong><p>Los cambios solo afectan activos y datos ficticios de esta demostracion.</p></div></div>
    </>
  );
}
