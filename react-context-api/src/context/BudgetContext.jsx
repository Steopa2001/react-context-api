import { createContext, useState, useContext } from "react";

// creo il contesto
const BudgetContext = createContext();

// custom hook per usare il contesto (così non serve richiamare useContext ogni volta)
const useBudget = () => {
  return useContext(BudgetContext);
}

// componente Provider che gestisce lo stato e lo rende disponibile
const BudgetProvider = ({ children }) => {
  const [isBudgetActive, setIsBudgetActive] = useState(false); 
  const [limit, setLimit] = useState(30); 

  // funzione che attiva/disattiva la modalità budget
  const switchBudgetMode = () => {
    setIsBudgetActive(prev => !prev);
  };

  const contextValue = {
    isBudgetActive,
    switchBudgetMode,
    limit,
    setLimit,
  };

  return (
    <BudgetContext.Provider value={contextValue}>
      {children}
    </BudgetContext.Provider>
  );
}


export { useBudget, BudgetProvider };