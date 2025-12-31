import React from "react";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";

import {
  fetchProducts,
  searchProductsByName,
  getProductByBarcode,
} from "../services/api";

import SearchBar from "../components/Searchbar";
import CategoryFilter from "../components/CategoryFilter";
import SortFilter from "../components/SortFilter";
import ProductList from "../components/ProductList";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");

  // 🔑 separate loading states
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState("");

  /* ---------------- INITIAL LOAD (CACHE FIRST) ---------------- */
  useEffect(() => {
    const cached = sessionStorage.getItem("products");

    if (cached) {
      setProducts(JSON.parse(cached));
      setInitialLoading(false);
    } else {
      loadProducts(1, "", true);
    }
  }, []);

  /* ---------------- FETCH PRODUCTS ---------------- */
  const loadProducts = async (pageNo, cat = category, cache = false) => {
    try {
      pageNo === 1
        ? setInitialLoading(true)
        : setLoadingMore(true);

      setError("");

      const data = await fetchProducts(pageNo, cat);

      if (!data.length) {
        setHasMore(false);
        return;
      }

      setProducts((prev) => {
        const updated =
          pageNo === 1 ? data : [...prev, ...data];

        // ✅ cache ONLY first page
        if (cache && pageNo === 1) {
          sessionStorage.setItem(
            "products",
            JSON.stringify(data)
          );
        }

        return updated;
      });
    } catch {
      setError("Failed to load products");
    } finally {
      pageNo === 1
        ? setInitialLoading(false)
        : setLoadingMore(false);
    }
  };

  /* ---------------- INFINITE SCROLL ---------------- */
  useEffect(() => {
    if (
      initialLoading ||
      loadingMore ||
      !hasMore ||
      query
    )
      return;

    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300;

      if (nearBottom) {
        const nextPage = page + 1;
        setPage(nextPage);
        loadProducts(nextPage);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, [page, loadingMore, hasMore, query, initialLoading]);

  /* ---------------- SEARCH ---------------- */
  const handleSearch = async () => {
    if (!query.trim()) {
      setPage(1);
      setHasMore(true);
      loadProducts(1, category);
      return;
    }

    try {
      setInitialLoading(true);
      setError("");

      const data = isNaN(query)
        ? await searchProductsByName(query, 1)
        : await getProductByBarcode(query);

      setProducts(data);
      setHasMore(false);

      if (!data.length) setError("No products found");
    } catch {
      setError("Search failed");
    } finally {
      setInitialLoading(false);
    }
  };

  /* ---------------- CATEGORY ---------------- */
  const handleCategory = (cat) => {
    setCategory(cat);
    setPage(1);
    setHasMore(true);
    loadProducts(1, cat);
  };

  /* ---------------- SORT ---------------- */
  const handleSort = (type) => {
    const sorted = [...products];

    if (type === "az") {
      sorted.sort((a, b) =>
        (a.product_name || "").localeCompare(
          b.product_name || ""
        )
      );
    }

    if (type === "za") {
      sorted.sort((a, b) =>
        (b.product_name || "").localeCompare(
          a.product_name || ""
        )
      );
    }

    if (type === "nutri") {
      sorted.sort((a, b) =>
        (a.nutrition_grades || "").localeCompare(
          b.nutrition_grades || ""
        )
      );
    }

    setProducts(sorted);
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="container mx-auto p-4">
      {/* Hero */}

      <div className="text-center mb-10">
        
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
          Discover Food Products
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Explore thousands of food products, check nutrition facts,
          and make informed choices for a healthier lifestyle.
        </p>
      </div>

      {/* Search */}
      <SearchBar
        value={query}
        setValue={setQuery}
        onSearch={handleSearch}
      />

      {/* Filters */}
      <div className="flex gap-4 my-4">
        <Link to="/" className="inline-flex items-center gap-3 group"></Link>
        <CategoryFilter onSelect={handleCategory} />
        <SortFilter onSort={handleSort} />
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-500 text-center">{error}</p>
      )}

      {/* Products */}
      <ProductList
        products={products}
        loading={initialLoading}
      />

      {/* Bottom Loader (ONLY infinite scroll) */}
      {loadingMore && (
        <p className="text-center mt-6 text-gray-500">
          Loading more products...
        </p>
      )}

      {!hasMore && !query && (
        <p className="text-center mt-6 text-gray-400">
          You’ve reached the end 🎉
        </p>
      )}
    </div>
  );
};

export default Home;
