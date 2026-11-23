import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

import HomePage from '../pages/HomePage';
import ProductsPage from '../pages/ProductsPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import CartPage from '../pages/CartPage';
import CollectionsPage from '../pages/CollectionsPage';
import CollectionDetailPage from '../pages/CollectionDetailPage';
import WishlistPage from '../pages/WishlistPage';
import NotFoundPage from '../pages/NotFoundPage';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />
<Route
  path="/products"
  element={
    <MainLayout>
      <ProductsPage />
    </MainLayout>
  }
/>  
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

        <Route
          path="/cart"
          element={
            <MainLayout>
              <CartPage />
            </MainLayout>
          }
        />

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

        <Route
          path="/wishlist"
          element={
            <MainLayout>
              <WishlistPage />
            </MainLayout>
          }
        />

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