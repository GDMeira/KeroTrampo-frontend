import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { pages } from './routes/routes';
import HomePage from './pages/HomePage/HomePage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import MyServicesPage from './pages/MyServicesPage/MyServicesPage';
import CategoriesPage from './pages/CategoriesPage/CategoriesPage';
import ServiceDetail from './pages/ServiceDetail/ServiceDetail';
import EditServicePage from './pages/EditServicePage/EditServicePage';
import CreateServicePage from './pages/CreateServicePage/CreateServicePage';
import SignInPage from './pages/SignInPage/SignInPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={pages.signUp} element={<SignUpPage />} />
        <Route path={pages.signIn} element={<SignInPage />} />
        <Route path={pages.home} element={<HomePage />} />
        <Route path={pages.serviceDetails + ':id'} element={<ServiceDetail />} />
        <Route path={pages.myServices} element={<MyServicesPage />} />
        <Route path={pages.editService + ':id'} element={<EditServicePage />} />
        <Route path={pages.servicesByCategories} element={<CategoriesPage />} />
        <Route path={pages.CreateService} element={<CreateServicePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
