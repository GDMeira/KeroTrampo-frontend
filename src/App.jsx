import { useState } from 'react';
import AuthContext from './contexts/AuthContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { pages } from './routes/routes';
import HomePage from './pages/HomePage/HomePage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import SignInPage from './pages/SignInPage/SignInPage';

function App() {
  const [user, setUser] = useState(0);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path={pages.signUp} element={<SignUpPage />} />
          <Route path={pages.signIn} element={<SignInPage />} />
          <Route path={pages.home} element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
