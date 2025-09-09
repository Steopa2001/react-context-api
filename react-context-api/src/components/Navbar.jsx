import { Link } from "react-router-dom";
import { useBudget } from "../context/BudgetContext.jsx";

// barra superiore
const Navbar = () => {
  const { budgetMode, switchBudgetMode } = useBudget();

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container">
        {/* link home */}
        <Link to="/" className="navbar-brand">Mini e commerce</Link>

        {/* bottone toggle */}
        <div className="ms-auto">
          <button
            className={`btn ${budgetMode ? "btn-warning" : "btn-outline-warning"}`}
            onClick={switchBudgetMode}
          >
            {budgetMode ? "Disattiva Modalità Budget" : "Attiva Modalità Budget"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
