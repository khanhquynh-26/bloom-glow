import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import ProductSearch from '../components/product/ProductSearch';
import ProductFilter from '../components/product/ProductFilter';
import ProductSort from '../components/product/ProductSort';
import ProductList from '../components/product/ProductList';
import Loading from '../components/common/Loading';
import Pagination from '../components/common/Pagination';

import productsService from '../services/products.service';
import categoriesService from '../services/categories.service';

import type { Product, ProductQuery, Category } from '../types';

const PAGE_SIZE = 12;

function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [keyword, setKeyword] = useState(
    searchParams.get('keyword') || '',
  );

  const [categoryId, setCategoryId] = useState<number | undefined>(
    searchParams.get('categoryId')
      ? Number(searchParams.get('categoryId'))
      : undefined,
  );

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadCategories = useCallback(async () => {
    try {
      const response = await categoriesService.getAll();
      setCategories(response);
    } catch (err) {
      console.error('Không thể tải danh mục:', err);
    }
  }, []);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      let sortBy = 'createdAt';
      let sortOrder: 'ASC' | 'DESC' = 'DESC';

      switch (sort) {
        case 'name-asc':
          sortBy = 'name';
          sortOrder = 'ASC';
          break;

        case 'name-desc':
          sortBy = 'name';
          sortOrder = 'DESC';
          break;

        case 'price-asc':
          sortBy = 'price';
          sortOrder = 'ASC';
          break;

        case 'price-desc':
          sortBy = 'price';
          sortOrder = 'DESC';
          break;

        default:
          sortBy = 'createdAt';
          sortOrder = 'DESC';
      }

      const query: ProductQuery = {
        keyword: keyword.trim() || undefined,
        categoryId,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
        status: 'active',
        page,
        limit: PAGE_SIZE,
        sortBy,
        sortOrder,
      };

      const response = await productsService.getAll(query);

      setProducts(response.data);
      setTotalProducts(response.total);
      setTotalPages(Math.max(response.totalPages, 1));
    } catch (err) {
      console.error('Không thể tải sản phẩm:', err);
      setError('Không thể tải danh sách sản phẩm. Vui lòng thử lại.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [keyword, categoryId, minPrice, maxPrice, sort, page]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadProducts();
    }, 300);

    return () => window.clearTimeout(timer);
  }, [loadProducts]);

  useEffect(() => {
    const nextParams = new URLSearchParams();

    if (keyword.trim()) {
      nextParams.set('keyword', keyword.trim());
    }

    if (categoryId !== undefined) {
      nextParams.set('categoryId', String(categoryId));
    }

    setSearchParams(nextParams, { replace: true });
  }, [keyword, categoryId, setSearchParams]);

  const handleResetFilters = () => {
    setKeyword('');
    setCategoryId(undefined);
    setMinPrice('');
    setMaxPrice('');
    setSort('newest');
    setPage(1);
  };

  const handleCategoryChange = (value: number | undefined) => {
    setCategoryId(value);
    setPage(1);
  };

  const handleKeywordChange = (value: string) => {
    setKeyword(value);
    setPage(1);
  };

  const handleMinPriceChange = (value: string) => {
    setMinPrice(value);
    setPage(1);
  };

  const handleMaxPriceChange = (value: string) => {
    setMaxPrice(value);
    setPage(1);
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    setPage(1);
  };

  return (
    <main className="products-page">
      <section className="products-page-banner">
        <span>THE BLOOM & GLOW COLLECTION</span>
        <h1>Our Products</h1>
        <p>
          Khám phá những món quà nhỏ xinh được tạo nên từ hoa,
          hương thơm và sự tinh tế.
        </p>
      </section>

      <div className="container products-page-container">
        <div className="products-page-heading">
          <div>
            <span className="home-eyebrow">DISCOVER SOMETHING BEAUTIFUL</span>
            <h2>Tất cả sản phẩm</h2>
            <p>{totalProducts} sản phẩm</p>
          </div>

          <ProductSort
            value={sort}
            onChange={handleSortChange}
          />
        </div>

        <div className="products-page-search">
          <ProductSearch
            value={keyword}
            onChange={handleKeywordChange}
          />
        </div>

        <div className="products-page-content">
          <ProductFilter
            categories={categories}
            categoryId={categoryId}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onCategoryChange={handleCategoryChange}
            onMinPriceChange={handleMinPriceChange}
            onMaxPriceChange={handleMaxPriceChange}
            onReset={handleResetFilters}
          />

          <section className="products-page-results">
            {loading ? (
              <Loading />
            ) : error ? (
              <div className="products-page-error">
                <p>{error}</p>
                <button type="button" onClick={loadProducts}>
                  Thử lại
                </button>
              </div>
            ) : (
              <>
                <ProductList products={products} />

                {products.length > 0 && (
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                  />
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default ProductsPage;