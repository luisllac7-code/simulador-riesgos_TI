import { Warning } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { AppShell } from "./components/AppShell";
import { useSimulationController } from "./hooks/useSimulationController";
import { ActionsPage } from "./pages/ActionsPage";
import { DashboardPage } from "./pages/DashboardPage";
import { LandingPage } from "./pages/LandingPage";
import { RecoveryPage } from "./pages/RecoveryPage";
import { ReportPage } from "./pages/ReportPage";
import { ResultsPage } from "./pages/ResultsPage";
import { RiskPage } from "./pages/RiskPage";
import { ScenarioPickerPage } from "./pages/ScenarioPickerPage";
import { ScenarioSetupPage } from "./pages/ScenarioSetupPage";
import { SimulationPage } from "./pages/SimulationPage";

export default function App() {
  const controller = useSimulationController();

  const renderPage = () => {
    switch (controller.view) {
      case "landing":
        return <LandingPage onStart={() => controller.setView("dashboard")} />;
      case "dashboard":
        return <DashboardPage onStart={() => controller.setView("scenarios")} events={controller.events} />;
      case "scenarios":
        return <ScenarioPickerPage scenarios={controller.scenarios} onSelect={controller.selectScenario} />;
      case "setup":
        return controller.selected ? <ScenarioSetupPage scenario={controller.selected} controls={controller.activeControls} setControls={controller.setActiveControls} speed={controller.speed} setSpeed={controller.setSpeed} onStart={controller.startSimulation} onBack={() => controller.setView("scenarios")} loading={controller.loading} /> : null;
      case "simulation":
        return controller.selected ? <SimulationPage scenario={controller.selected} events={controller.events} attackTriggered={controller.attackTriggered} riskReady={Boolean(controller.initialRisk)} onTrigger={controller.triggerAttack} onNext={() => controller.setView("risk")} /> : null;
      case "risk":
        return controller.initialRisk && controller.selected ? <RiskPage risk={controller.initialRisk} scenario={controller.selected} onContinue={() => controller.setView("actions")} /> : null;
      case "actions":
        return controller.selected ? <ActionsPage scenario={controller.selected} selected={controller.selectedActions} setSelected={controller.setSelectedActions} onApply={controller.applyActions} loading={controller.loading} /> : null;
      case "recovery":
        return <RecoveryPage progress={controller.progress} message={controller.progressMessage} />;
      case "result":
        return controller.initialRisk && controller.residualRisk ? <ResultsPage initial={controller.initialRisk} residual={controller.residualRisk} actions={controller.selectedActions.length} onReport={controller.openReport} onRepeat={() => controller.selected && controller.selectScenario(controller.selected)} /> : null;
      case "report":
        return controller.selected && controller.initialRisk && controller.residualRisk ? <ReportPage scenario={controller.selected} events={controller.events} initial={controller.initialRisk} residual={controller.residualRisk} actions={controller.selectedActions} onBack={() => controller.setView("result")} /> : null;
    }
  };

  if (controller.view === "landing") return renderPage();

  return (
    <AppShell view={controller.view} onNavigate={(next) => {
      if (next === "scenarios") controller.resetSimulation();
      controller.setView(next);
    }}>
      {controller.error && <div className="error-banner"><Warning size={20} weight="fill" />{controller.error}</div>}
      <AnimatePresence mode="wait">
        <motion.main key={controller.view} className="page" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.24 }}>
          {renderPage()}
        </motion.main>
      </AnimatePresence>
    </AppShell>
  );
}
