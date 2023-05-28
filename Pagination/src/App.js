import React, { useEffect, useState } from 'react'

const App = () => {

  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [backDisable, setBackDisable] =  useState(true);
  const [nextDisable, setNextDisable] =  useState(false);

  // eslint-disable-next-line
  const [visiblePagination, setVisiblePagination] = useState(5);

  const fetchAPI = async () => {
    setLoading(true);
    let pageLimit = 12;
    const response = await fetch(`https://dummyjson.com/products?limit=${pageLimit}&skip=${pageLimit * (currentPage - 1)}`);
    const data = await response.json();
    let {total, products} = data;
    setTotalPages(Math.ceil(total / pageLimit));
    setProducts(products);
    setLoading(false);
    window.scrollTo({top : 0, behavior : 'smooth'});
  }

  const filterPagination = (clickedEle) => {
    let selectedPage = parseInt(clickedEle.innerHTML);
    if (selectedPage <= totalPages){
      setCurrentPage(selectedPage);
      if (selectedPage > 1) {
        setBackDisable(false);
      }
      
      if (selectedPage >= 1 && selectedPage <= totalPages - 1) {
        setNextDisable(false);
      }
      else if (selectedPage > totalPages - 1) {
        setNextDisable(true);
      }
    }
  }

  useEffect(() => {
    fetchAPI();
    // eslint-disable-next-line
  }, [currentPage]);

  return (
    <div className="app__page">
      <h1>
        Products | <span>Page - {currentPage}</span>
      </h1>

      {/* Products */}
      {loading === true ? (
        <div className="loader__space">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="products__container">
          {products.map(({ id, title, description }) => {
            return (
              <div key={id} className="each__product">
                <p>{id}</p>
                <p>{title}</p>
                <p>{description}</p>
              </div>
            );
          })}
        </div>
      )}


      {/* Pagination */}
      <div className="products__pagination">
        <button
          type="button"
          disabled={backDisable}
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage((val) => val - 1);
              if (currentPage < totalPages + 1) {
                setNextDisable(false);
              }
              if (currentPage === 2) {
                setBackDisable(true);
              }
            }
          }}
        >
          <ion-icon name="chevron-back"></ion-icon>
        </button>
        ...
        {[...Array(visiblePagination)].map((_, index) => {
          return (
            <button
              type="button"
              className={`${
                (currentPage === ((currentPage <= totalPages - 4) && (index + 1 + (currentPage - 1))) || currentPage === (index + totalPages - 4))
                  ? "currentPage"
                  : ""
              }`}
              key={index}
              onClick={function(e) {
                filterPagination(e.target);
              }}
            >
              {currentPage <= totalPages - 4 ? index + 1 + (currentPage - 1) : index + totalPages - 4}
            </button>
          );
        })}
        ...
        <button
          type="button"
          disabled={nextDisable}
          onClick={() => {
            if (currentPage < totalPages) {
              if (currentPage <= totalPages) {
                setCurrentPage((val) => val + 1);
                setBackDisable(false);
                if (currentPage === totalPages - 1) {
                  setNextDisable(true);
                }
              }
            }
          }}
        >
          <ion-icon name="chevron-forward"></ion-icon>
        </button>
      </div>
    </div>
  );
}

export default App