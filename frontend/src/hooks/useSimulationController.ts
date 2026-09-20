import { useEffect, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";
import { api } from "../api";
import { scenarioInteractions } from "../config/scenarios";
import type { Risk, Scenario, SimulationEvent, View } from "../types";

export function useSimulationController() {
  const [view, setView] = useState<View>("landing");
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [selected, setSelected] = useState<Scenario | null>(null);
  const [activeControls, setActiveControls] = useState<string[]>([]);
  const [speed, setSpeed] = useState("normal");
  const [simulationId, setSimulationId] = useState<string | null>(null);
  const [events, setEvents] = useState<SimulationEvent[]>([]);
  const [initialRisk, setInitialRisk] = useState<Risk | null>(null);
  const [residualRisk, setResidualRisk] = useState<Risk | null>(null);
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState("Preparando recuperacion");
  const [attackTriggered, setAttackTriggered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const simulationIdRef = useRef<string | null>(null);

  useEffect(() => {
    api.scenarios()
      .then(setScenarios)
      .catch(() => setError("No se pudo conectar con el backend. Verifica que los contenedores esten activos."));
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [view]);

  useEffect(() => {
    const socket = io({ path: "/socket.io" });
    socketRef.current = socket;

    socket.on("connect", () => {
      if (simulationIdRef.current) socket.emit("simulation:join", simulationIdRef.current);
    });
    socket.on("simulation:event", (event: SimulationEvent) => {
      setEvents((current) => current.some((item) => item.id === event.id) ? current : [...current, event]);
    });
    socket.on("risk:evaluated", (risk: Risk) => setInitialRisk(risk));
    socket.on("recovery:progress", ({ progress: value, message }: { progress: number; message: string }) => {
      setProgress(value);
      setProgressMessage(message);
    });
    socket.on("simulation:completed", ({ risk }: { risk: Risk }) => {
      setResidualRisk(risk);
      setTimeout(() => setView("result"), 450);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    simulationIdRef.current = simulationId;
    if (simulationId && socketRef.current?.connected) socketRef.current.emit("simulation:join", simulationId);
  }, [simulationId]);

  const resetSimulation = () => {
    simulationIdRef.current = null;
    setSimulationId(null);
    setEvents([]);
    setInitialRisk(null);
    setResidualRisk(null);
    setSelectedActions([]);
    setProgress(0);
    setProgressMessage("Preparando recuperacion");
    setAttackTriggered(false);
    setError(null);
  };

  const selectScenario = (scenario: Scenario) => {
    resetSimulation();
    setSelected(scenario);
    setActiveControls([]);
    setView("setup");
  };

  const startSimulation = async () => {
    if (!selected) return;
    setLoading(true);
    setError(null);

    try {
      const simulation = await api.createSimulation(selected.type, activeControls, speed);
      simulationIdRef.current = simulation.id;
      setSimulationId(simulation.id);
      socketRef.current?.emit("simulation:join", simulation.id);
      setView("simulation");
      await new Promise((resolve) => setTimeout(resolve, 150));
      await api.startSimulation(simulation.id);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "No se pudo iniciar la simulacion");
      setView("setup");
    } finally {
      setLoading(false);
    }
  };

  const triggerAttack = async (input?: string) => {
    if (!simulationId || !selected || attackTriggered) return;
    setAttackTriggered(true);
    setError(null);

    try {
      await api.triggerSimulation(simulationId, scenarioInteractions[selected.type], input);
    } catch (cause) {
      setAttackTriggered(false);
      setError(cause instanceof Error ? cause.message : "No se pudo ejecutar la interaccion");
    }
  };

  const applyActions = async () => {
    if (!simulationId || selectedActions.length === 0) return;
    setLoading(true);
    setError(null);

    try {
      const response = await api.applyActions(simulationId, selectedActions);
      setResidualRisk(response.residualRisk);
      setView("recovery");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "No se pudieron aplicar las acciones");
    } finally {
      setLoading(false);
    }
  };

  const openReport = async () => {
    if (!simulationId) return;
    setLoading(true);

    try {
      await api.report(simulationId);
      setView("report");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "No se pudo generar el informe");
    } finally {
      setLoading(false);
    }
  };

  return {
    view,
    setView,
    scenarios,
    selected,
    activeControls,
    setActiveControls,
    speed,
    setSpeed,
    events,
    initialRisk,
    residualRisk,
    selectedActions,
    setSelectedActions,
    progress,
    progressMessage,
    attackTriggered,
    loading,
    error,
    resetSimulation,
    selectScenario,
    startSimulation,
    triggerAttack,
    applyActions,
    openReport
  };
}
