import { useMemo } from "react";
import { Gauge } from "@phosphor-icons/react";
import { motion } from "motion/react";
import type { Risk } from "../types";

export function RiskMatrix({ risk }: { risk: Risk }) {
  const cells = useMemo(() => Array.from({ length: 20 }, (_, index) => {
    const row = 4 - Math.floor(index / 5);
    const col = (index % 5) + 1;
    return { row, col, score: row * col };
  }), []);

  return (
    <section className="matrix-panel">
      <div className="panel-title"><Gauge size={22} /><div><h3>Matriz de riesgos</h3><p>Probabilidad (1–4) × Impacto (1–5)</p></div></div>
      <div className="matrix-wrap">
        <span className="axis-y">Probabilidad (1–4)</span>
        <div className="matrix">
          {cells.map((cell) => (
            <div key={`${cell.row}-${cell.col}`} className={`matrix-cell level-${cell.score <= 4 ? 1 : cell.score <= 9 ? 2 : cell.score <= 16 ? 3 : 4}`}>
              {cell.row === risk.probability && cell.col === risk.impact && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}><b>{risk.score}</b></motion.span>}
            </div>
          ))}
        </div>
        <span className="axis-x">Impacto (1–5)</span>
      </div>
      <div className="matrix-legend"><span className="low">Bajo 1–4</span><span className="medium">Moderado 5–9</span><span className="high">Alto 10–16</span><span className="critical">Critico 17–20</span></div>
    </section>
  );
}
