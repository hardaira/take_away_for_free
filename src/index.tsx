import { createRoot } from 'react-dom/client';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { App } from './App';
import { HomePage } from './pages/HomePage';
// import { PhonesPage } from './pages/PhonesPage';
import { AllCategoriesPage } from './pages/AllCategoriesPage';
// import { TabletsPage } from './pages/TabletsPage';
// import { AccessoriesPage } from './pages/AccessoriesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { FavoritesPage } from './pages/FavoritesPage';
// import { CartPage } from './pages/CartPage';
import { FormPage } from './pages/FormPage';
import { ProfilePage } from './pages/ProfilePage';
import { ChangePassword } from './pages/ChangePassword';
import { ChangeEmail } from './pages/ChangeEmail';
import { PostsPage } from './pages/PostsPage';
import { InformationPage } from './pages/InformationPage';
import { LoginPage } from './pages/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { ActivationPage } from './pages/ActivationPage';
import { ActivationFailed } from './pages/ActivationFailed';
import { ResetPassword } from './pages/ResetPassword';
import { ResetUserPassword } from './pages/ResetUserPassword';
import { MenuPage } from './pages/MenuPage';
import { ProductPage } from './pages/ProductPage';
import { TestPage } from './pages/TestPage';
// import { ProductInformationPage } from './pages/ProductInformationPage';
// import ScrollToTop from './components/ScrollToTop';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Provider store={store}>
    <Router>
      {/* <ScrollToTop /> */}
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="/events/:city" element={<AllCategoriesPage />} />
          {/* <Route path="home" element={<Navigate to="/" replace />} /> */}
          {/* <Route path="phones">
            <Route index element={<PhonesPage />} />
            <Route path=":itemId" element={<ProductInformationPage />} />
          </Route> */}
          {/* <Route path="tablets">
            <Route index element={<TabletsPage />} />
            <Route path=":itemId" element={<ProductInformationPage />} />
          </Route> */}
          {/* <Route path="accessories">
            <Route index element={<AccessoriesPage />} />
            <Route path=":itemId" element={<ProductInformationPage />} />
          </Route> */}
          {/* <Route path="add-post" element={<InformationPage />} /> */}

          <Route path="form" element={<InformationPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="profile" element={<ProfilePage />}>
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="change-email" element={<ChangeEmail />} />
            <Route path="add-post" element={<FormPage />} />
            <Route path="my-posts" element={<PostsPage />} />
          </Route>
          <Route path="menu" element={<MenuPage />} />
          <Route path="registration" element={<RegistrationPage />} />
          <Route path="activation" element={<ActivationPage />} />
          <Route path="activation-failed" element={<ActivationFailed />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route
            path="reset-password/resetToken"
            element={<ResetUserPassword />}
          />
          <Route path="login" element={<LoginPage />} />
          <Route path="test-page" element={<TestPage />} />

          {/* <Route path="cart" element={<CartPage />} /> */}
          <Route path="product/:productId" element={<ProductPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  </Provider>,
);
