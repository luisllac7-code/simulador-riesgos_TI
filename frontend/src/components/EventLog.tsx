import { Clock, Pulse } from "@phosphor-icons/react";
import { motion } from "motion/react";
import type { SimulationEvent } from "../types";

export function EventLog({ events }: { events: SimulationEvent[] }) {
  return (
    <aside className="event-log">
      <div className="panel-title"><Pulse size={20} /><div><h3>Bitacora de eventos</h3><p>Sincronizada con el motor</p></div></div>
      <div className="event-list">
        {events.length === 0 && <div className="empty-state"><Clock /><span>Esperando el primer evento</span></div>}
        {events.map((event, index) => (
          <motion.article key={event.id} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}>
            <i className={event.severity} />
            <time>00:{String(Math.round(event.elapsedMs / 1000)).padStart(2, "0")}</time>
            <div><strong>{event.title}</strong><p>{event.detail}</p></div>
            {index === events.length - 1 && <span className="current">Actual</span>}
          </motion.article>
        ))}
      </div>
    </aside>
  );
}
