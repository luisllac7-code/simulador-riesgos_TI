import { ArrowRight, Flask, Gauge, Pulse, ShieldCheck } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { Brand } from "../components/Brand";

export function LandingPage({ onStart }: { onStart: () => void }) {
  const reduceMotion = useReducedMotion();

  return (
    <main className="landing">
      <header className="landing-nav">
        <Brand />
        <nav aria-label="Navegacion principal"><a href="#simulador">Simulador</a><a href="#metodo">Metodo</a><a href="#seguridad">Seguridad</a></nav>
        <button className="button button-small" onClick={onStart}>Iniciar <ArrowRight /></button>
      </header>
      <section className="hero" id="simulador">
        <div className="hero-copy">
          <p className="eyebrow"><Pulse weight="bold" /> Aprende, simula, protege</p>
          <h1>Simula el ataque.<br /><span>Decide la respuesta.</span></h1>
          <p className="hero-text">Explora incidentes ficticios, observa su efecto sobre los servicios y reduce el riesgo con decisiones justificadas.</p>
          <div className="hero-actions"><button className="button" onClick={onStart}>Comenzar simulacion <ArrowRight /></button><span className="safe-note"><ShieldCheck weight="fill" /> Entorno educativo aislado</span></div>
        </div>
        <div className="hero-visual" aria-label="Representacion de una red de servicios conectados">
          <motion.div className="radar-ring ring-one" animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} />
          <motion.div className="radar-ring ring-two" animate={reduceMotion ? undefined : { rotate: -360 }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }} />
          <div className="radar-core"><ShieldCheck size={54} weight="duotone" /><strong>CyberLab TI</strong><span>4 escenarios listos</span></div>
          {[0, 1, 2, 3, 4].map((item) => <motion.i key={item} className={`radar-dot dot-${item}`} animate={reduceMotion ? undefined : { scale: [1, 1.8, 1], opacity: [0.45, 1, 0.45] }} transition={{ duration: 2.2, delay: item * 0.3, repeat: Infinity }} />)}
        </div>
      </section>
      <section className="landing-strip" id="metodo">
        <Feature icon={Flask} title="Escenarios interactivos" text="Ataques representados mediante eventos seguros." />
        <Feature icon={Gauge} title="Riesgo explicable" text="Probabilidad, impacto y justificacion visible." />
        <Feature icon={ShieldCheck} title="Respuesta medible" text="Compara el riesgo inicial con el residual." />
      </section>
    </main>
  );
}

type FeatureProps = { icon: typeof Flask; title: string; text: string };

function Feature({ icon: Icon, title, text }: FeatureProps) {
  return <article><Icon size={24} /><div><strong>{title}</strong><p>{text}</p></div></article>;
}
