import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useBudget } from "../context/BudgetContext.jsx";

// pagina lista prodotti
export default function Products() {
  const { budgetMode } = useBudget();
  const [items, setItems] = useState([]);       // dati api
  const [loading, setLoading] = useState(true); // stato loading
  const [error, setError] = useState(null);     // testo errore

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then(res => {
        setItems(res.data);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // se budgetMode è attivo filtro i prodotti
  const products = budgetMode
    ? items.filter(p => Number(p.price) <= 30)
    : items;

  // stati ui
  if (loading) return <div className="text-center py-5">Caricamento...</div>;
  if (error) return <div className="alert alert-danger">Errore: {error}</div>;

  return (
    <section>
      <h2 className="mb-3">Prodotti</h2>

      {products.length === 0 ? (
        <div className="alert alert-warning">
          Nessun prodotto per la modalità budget
        </div>
      ) : (
        <div className="row g-3">
          {products.map(p => (
            <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100">
                {/* immagine */}
                <img
                  src={p.image}
                  alt={p.title}
                  className="card-img-top p-3"
                  style={{ height: 180, objectFit: "contain" }}
                />

                {/* contenuto */}
                <div className="card-body d-flex flex-column">
                  <h6 className="card-title mb-2" title={p.title}>
                    {p.title.length > 60
                      ? p.title.slice(0, 60) + "..."
                      : p.title}
                  </h6>

                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <span className="fw-bold">
                      EUR {Number(p.price).toFixed(2)}
                    </span>
                    <Link
                      to={`/product/${p.id}`}
                      className="btn btn-primary btn-sm"
                    >
                      Dettagli
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
