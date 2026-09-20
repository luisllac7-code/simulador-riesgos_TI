import type { Scenario, ScenarioType } from "./types";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({ message: "Error de comunicacion" }));
    throw new Error(body.message ?? "Error de comunicacion");
  }
  return response.json();
}

export const api = {
  scenarios: () => request<Scenario[]>("/api/scenarios"),
  createSimulation: (scenarioType: ScenarioType, controls: string[], speed: string) =>
    request<{ id: string }>("/api/simulations", {
      method: "POST",
      body: JSON.stringify({ scenarioType, controls, speed })
    }),
  startSimulation: (id: string) =>
    request(`/api/simulations/${id}/start`, { method: "POST" }),
  triggerSimulation: (id: string, interaction: string, input?: string) =>
    request(`/api/simulations/${id}/interactions`, {
      method: "POST",
      body: JSON.stringify({ interaction, input })
    }),
  applyActions: (id: string, actions: string[]) =>
    request<{ residualRisk: import("./types").Risk }>(`/api/simulations/${id}/actions`, {
      method: "POST",
      body: JSON.stringify({ actions })
    }),
  report: (id: string) => request<Record<string, unknown>>(`/api/simulations/${id}/report`)
};
