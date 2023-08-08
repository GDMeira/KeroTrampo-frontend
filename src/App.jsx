import { useState } from 'react'
import AuthContext from './contexts/AuthContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(0);

  return (
    <AuthContext.Provider value={{ user, setUser}}>
      <BrowserRouter>
        <Routes>
          {/* <Route path={pages.home} element={<HomePage />} /> */}
          <p>teste3</p>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
