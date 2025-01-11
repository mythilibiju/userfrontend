import React from 'react';

function Navbar({ isLoggedIn, onLogout, onNavigate }) {
  return (
    <nav>
      <h1>Bookstore App</h1>
      <ul>
        {!isLoggedIn && (
          <>
            <li>
              <button onClick={() => onNavigate('login')}>Login</button>
            </li>
            <li>
              <button onClick={() => onNavigate('signup')}>Signup</button>
            </li>
          </>
        )}
        {isLoggedIn && (
          <>
            <li>
              <button onClick={() => onNavigate('home')}>Home</button>
            </li>
            <li>
              <button onClick={onLogout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
