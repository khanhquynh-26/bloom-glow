
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';

// User pages
import HomePage from '../pages/HomePage';
import ProductsPage from '../pages/ProductsPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import CartPage from '../pages/CartPage';
import CollectionsPage from '../pages/CollectionsPage';
import CollectionDetailPage from '../pages/CollectionDetailPage';
import WishlistPage from '../pages/WishlistPage';
import GiftStudioPage from '../pages/GiftStudioPage';
import SearchPage from '../pages/SearchPage';
import NotFoundPage from '../pages/NotFoundPage';

// Auth pages
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';

// Admin pages
import DashboardPage from '../pages/admin/DashboardPage';
import ProductsAdminPage from '../pages/admin/ProductsAdminPage';
import CategoriesAdminPage from '../pages/admin/CategoriesAdminPage';
import OrdersAdminPage from '../pages/admin/OrdersAdminPage';
import UsersAdminPage from '../pages/admin/UsersAdminPage';
import AnalyticsPage from '../pages/admin/AnalyticsPage';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* USER ROUTES */}

        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />

        {/* Products */}
        <Route
          path="/products"
          element={
            <MainLayout>
              <ProductsPage />
            </MainLayout>
          }
        />

        <Route
          path="/products/:slug"
          element={
            <MainLayout>
              <ProductDetailPage />
            </MainLayout>
          }
        />

        {/* Search */}
        <Route
          path="/search"
          element={
            <MainLayout>
              <SearchPage />
            </MainLayout>
          }
        />

        {/* Gift Studio */}
        <Route
          path="/gift-studio"
          element={
            <MainLayout>
              <GiftStudioPage />
            </MainLayout>
          }
        />

        {/* Cart */}
        <Route
          path="/cart"
          element={
            <MainLayout>
              <CartPage />
            </MainLayout>
          }
        />

        {/* Collections */}
        <Route
          path="/collections"
          element={
            <MainLayout>
              <CollectionsPage />
            </MainLayout>
          }
        />

        <Route
          path="/collections/:slug"
          element={
            <MainLayout>
              <CollectionDetailPage />
            </MainLayout>
          }
        />

        {/* Wishlist */}
        <Route
          path="/wishlist"
          element={
            <MainLayout>
              <WishlistPage />
            </MainLayout>
          }
        />

        {/* AUTH ROUTES */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="products" element={<ProductsAdminPage />} />
          <Route path="categories" element={<CategoriesAdminPage />} />
          <Route path="orders" element={<OrdersAdminPage />} />
          <Route path="users" element={<UsersAdminPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
        </Route>

        {/* NOT FOUND */}
        <Route
          path="*"
          element={
            <MainLayout>
              <NotFoundPage />
            </MainLayout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
