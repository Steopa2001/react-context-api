import { createContext, useState, useContext } from "react";

// creo il contesto
const BudgetContext = createContext();

// custom hook per usare il contesto (così non serve richiamare useContext ogni volta)
const useBudget = () => {
  return useContext(BudgetContext);
};

// componente Provider che gestisce lo stato e lo rende disponibile
const BudgetProvider = ({ children }) => {
  const [budgetMode, setBudgetMode] = useState(false);
  const [budgetLimit, setBudgetLimit] = useState(30);

  // funzione che attiva/disattiva la modalità budget
  const switchBudgetMode = () => {
    setBudgetMode((prev) => !prev);
  };

  const contextValue = {
    budgetMode,
    switchBudgetMode,
    budgetLimit,
    setBudgetLimit,
  };

  return (
    <BudgetContext.Provider value={contextValue}>
      {children}
    </BudgetContext.Provider>
  );
};

export { useBudget, BudgetProvider };
