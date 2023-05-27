import React, { useEffect, useState } from 'react'

// Retriving Recent Search To Local Storage.
const retrieveRecentSearchFromLocalStorage = () => {
  let recentSearch = JSON.parse(localStorage.getItem('recent'));
  console.log(recentSearch);
  if (recentSearch) return recentSearch;
  else return 'Trees';
}

const App = () => {
  
  // Use your Client ID you will get when you register for Unsplash API.  
  let clientID = "EpMXKd3M25D-vueZhxV2Q7SXb6t1p09Nq_WGIBghtaM"; // Here!

  let [searchInput, setSearchInput] = useState(retrieveRecentSearchFromLocalStorage());
  let [searchResults, setSearchResults] = useState([]);
  let [btnsDisablity, setBtnsDisablity] = useState({
    back : true,
    next : false
  })
  let [totalPages, setTotalPages] = useState(1);
  let [pageNo, setPageNo] = useState(1);

  // Fetching API
  const fetchSearchImages = async () => {
    const response = await fetch(`https://api.unsplash.com/search/photos?client_id=${clientID}&query=${searchInput}&per_page=20&page=${pageNo}`);
    const data = await response.json();
    let {total_pages, results} = data;
    setSearchResults(results);
    setTotalPages(total_pages);
    window.scrollTo({top : 0, behavior : 'smooth'});
  }

  // Toggling Next Page
  const toggleNextPage = (type) => {
    if(type === "next") {
      if (totalPages > pageNo) {
        setPageNo((prev) => prev + 1);
        setBtnsDisablity({ back: false, next: false });
      }
      if (totalPages === pageNo + 1) {
        setBtnsDisablity({ back: false, next: true });
      }
    }
    
    else {
      setPageNo((prev) => prev - 1);
      if (totalPages > pageNo - 1) {
        setBtnsDisablity({ back: false, next: false });
      }
      if (pageNo === 2) {
        setBtnsDisablity({ back : true, next : false });
      }
    }
  }

  // Fetching Images for Every Page.
  useEffect(() => {
    fetchSearchImages();
    // eslint-disable-next-line
  }, [pageNo]);

  // Saving Recent Search To Local Storage on Search Input Change.
  useEffect(() => {
    localStorage.setItem('recent', JSON.stringify(searchInput));
  }, [searchInput]);

  return (
    <div className='main__page'>
      <div className="page__center">
        <h1 className='page__head'>Pic Mania <span>, Unsplash API</span></h1>

        {/* Search Box */}
        <div className="search__box">
          <input type="text" value={searchInput} onChange={(e) => {setSearchInput(e.target.value)}} placeholder='Search Images...' onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setPageNo(1);
              setBtnsDisablity({ back: true, next: false });
              fetchSearchImages(e.target.value);
            }
          }} />
          <button type='button' onClick={() => {
            setPageNo(1);
            setBtnsDisablity({ back: true, next: false });
            fetchSearchImages(searchInput);
          }}><ion-icon name='search'></ion-icon></button>
        </div>

        {/* Fetched Images */}
        <div className="images__list">
          <h2 className='list__head'>Images | <span className='page__no'>Page - {pageNo}</span></h2>
          <div className="all__images">
            {
              searchResults?.length ? (
                searchResults.map((result) => {
                  let { id, alt_description, urls, user } = result;
                  let { regular } = urls;
                  let { name } = user;
                  return (
                    <div className='image' id={`image__${id}`} key={id}>
                      <img src={regular} alt={alt_description} className='result__image'/>
                      <p className='result__credit'>Credit - {name}</p>
                    </div>
                  )
                })
              ) : (<p className='empty__list'>No Images Found!</p>)
            }
          </div>
        </div>

        {/* Toggle Buttons */}
        {
          totalPages > 1 ? (
            <div className="toggle__buttons">
              <button disabled={btnsDisablity.back} type='button' onClick={() => {toggleNextPage('back')}}><ion-icon name="chevron-back"></ion-icon> Back</button>
              <button disabled={btnsDisablity.next} type='button' onClick={() => {toggleNextPage('next')}}>Next <ion-icon name="chevron-forward"></ion-icon></button>
            </div>
          ) : <></>
        }

      </div>
    </div>
  )
}

export default App