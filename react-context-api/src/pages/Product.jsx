import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useBudget } from "../context/BudgetContext.jsx";

// pagina dettaglio
const Product = () => {
  const { id } = useParams();                 // id rotta
  const { budgetMode, budgetLimit = 30 } = useBudget(); // soglia dinamica o 30
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setError(null);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center py-5">Caricamento...</div>;
  if (error) return <div className="alert alert-danger">Errore: {error}</div>;
  if (!product) return null;

  const overBudget = budgetMode && Number(product.price) > Number(budgetLimit);

  return (
    <article className="row g-4">
      <div className="col-12">
        <Link to="/" className="btn btn-outline-secondary btn-sm">Indietro</Link>
      </div>

      {overBudget && (
        <div className="col-12">
          <div className="alert alert-warning">
            Questo prodotto supera €{budgetLimit} con la modalità budget attiva.
          </div>
        </div>
      )}

      <div className="col-12 col-md-5">
        <div className="border rounded p-3">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid"
            style={{ maxHeight: 360, objectFit: "contain" }}
          />
        </div>
      </div>

      <div className="col-12 col-md-7">
        <h3 className="mb-3">{product.title}</h3>
        <div className="mb-2"><span className="badge bg-secondary">{product.category}</span></div>
        <h4 className="text-primary">EUR {Number(product.price).toFixed(2)}</h4>
        <p className="mt-3">{product.description}</p>
      </div>
    </article>
  );
};

export default Product;
