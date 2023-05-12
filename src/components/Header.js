import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/authActions';
import { searchReviews } from '../actions/searchActions';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';
import i18n from '../i18n';
import { FiSun, FiMoon } from 'react-icons/fi';
import  './appName.css';

const Header = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const searchResults = useSelector((state) => state.searchReviews.reviews);
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    setThemeAttribute(theme);
  }, [theme]);
  

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('selectedLanguage', lng);
  };

  const setThemeAttribute = (theme) => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-bs-theme');
    }
  };

  const handleThemeChange = (theme) => {
    setTheme(theme);
    localStorage.setItem('theme', theme);
    setThemeAttribute(theme);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchReviews(query));
  };

  const printUserinfo = () => {
    console.log(user);
    console.log(user.id);
  };

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);

  return (
      <div className="header">
          <header
              className="p-3 header-theme header-bg header-text"
              style={{
                  backgroundColor: theme === 'light' ? 'var(--bg-color)' : 'var(--bg-color-dark)',
                  color: theme === 'light' ? 'var(--text-color)' : 'var(--text-color-dark)',
              }}
          >
          <div className="d-flex justify-content-between align-items-center w-100">
          <div className="app-name">
              <h3>Express Critic</h3>
          </div>
          {user ? (
              <div className="d-flex align-items-center">
                  <img
                      src={user.picture}
                      alt={user.username}
                      className="rounded-circle me-2"
                      width="40"
                      height="40"
                  />
                  <span className="me-3">{user.username}</span>
                  <button className="btn btn-outline-light" onClick={handleLogout}>
                      {t('logout')}
                  </button>
                  <Dropdown>
                      <Dropdown.Toggle className="btn btn-outline-light me-3" variant="outline-light" id="dropdown-basic">
                          {t('language')}
                        </Dropdown.Toggle>
                      <Dropdown.Menu>
                          <Dropdown.Item onClick={() => handleLanguageChange('en')}>English</Dropdown.Item>
                          <Dropdown.Item onClick={() => handleLanguageChange('ru')}>Русский</Dropdown.Item>
                          <Dropdown.Item onClick={() => handleLanguageChange('es')}>Español</Dropdown.Item>
                      </Dropdown.Menu>
                  </Dropdown>
                <button
                    className="btn btn-outline-light me-3"
                    onClick={() => handleThemeChange(theme === 'light' ? 'dark' : 'light')}
                  >
                    {theme === 'light' ? <FiSun /> : <FiMoon />}
                  </button>
              </div>
          ) : (
              <p>{t('login')}</p>
          )}
          </div>
          <form className="d-flex mt-2" onSubmit={handleSearch}>
              <input
                  className="form-control me-2"
                  type="search"
                  placeholder={t('searchPlaceholder')}
                  aria-label="Search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
              />
              <button className="btn btn-outline-light" type="submit">
                  {t('search')}
              </button>
          </form>
        </header>
      </div>
  );
};

export default Header;
