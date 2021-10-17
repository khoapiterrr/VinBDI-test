import heartBlack from 'assets/img/heart-black.png';
import heartBlue from 'assets/img/heart-if.png';
import imgSearchBlack from 'assets/img/image-search-black.png';
import imgSearch from 'assets/img/image-search.png';
import logo from 'assets/img/logo.png';
import clx from 'classnames';
import Favorite from 'Components/Favorite';
import Search from 'Components/Search';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [tabActive, setTabActive] = React.useState<number>(0);
  const countFavorites = localStorage.getItem('favorites')?.split(',')?.length;
  const handleChangeTab = (tab: number) => {
    if (tab === tabActive) return;
    setTabActive(tab);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
      </header>
      <div className='main'>
        <div className='d-flex tabs'>
          <button
            className={clx('tab-item', { active: tabActive === 0 })}
            onClick={() => handleChangeTab(0)}>
            <img
              src={tabActive === 0 ? imgSearch : imgSearchBlack}
              alt='search'
            />
            <span>Search</span>
          </button>
          <button
            className={clx('tab-item', { active: tabActive === 1 })}
            onClick={() => handleChangeTab(1)}>
            <img src={tabActive === 1 ? heartBlue : heartBlack} alt='search' />
            <span>Favorite ({countFavorites})</span>
          </button>
        </div>
        <div className='container'>
          {tabActive === 0 ? <Search /> : tabActive === 1 ? <Favorite /> : null}
        </div>
      </div>
      <footer className='footer'>Gallereasy POC web app - VinBDI</footer>

      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
