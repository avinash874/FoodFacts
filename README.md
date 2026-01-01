# FoodFacts(React + Vite)

A modern Food Product Explorer web application built using React, Vite, Infinite Scroll, and OpenFoodFacts API.
This project allows users to explore food products, search by name, filter by category, scan/search by barcode, and view detailed nutritional information.

# 🚀 Project Overview

This application fetches food product data from the OpenFoodFacts public API and presents it in a clean, responsive UI with features commonly used in real-world e-commerce and food-tech applications.

1.It demonstrates:
2.API integration
3.Infinite scrolling
4.Search & filtering
5.Client-side sorting
6.Dynamic routing
7.Modular frontend architecture

# 🚀 Project Overview

This application fetches food product data from the OpenFoodFacts public API and presents it in a clean, responsive UI with features commonly used in real-world e-commerce and food-tech applications.

1.It demonstrates:
2.API integration
3.Infinite scrolling
4.Search & filtering
5.Client-side sorting
6.Dynamic routing
7.Modular frontend architecture

# 🎯 Key Features
# 1.Infinite Scroll Product Listing

1.Products load page-by-page as the user scrolls
2.Improves performance and user experience
3.Avoids loading all data at once

# 2. Search Products by Name

1.Search food items using keywords
2.Automatically resets pagination
3.Works seamlessly with infinite scrolling

# 3. Barcode-Based Product Search

1.Fetches a single product using barcode
2.Useful for food scanning apps
3.Stops infinite scroll for single result

# 4. Category Filtering

1.Filter food products by category
2.Clears search state automatically
3.Re-fetches products correctly

# 5. Client-Side Sorting

Sort products by:
1.Name (A–Z, Z–A)
2.Nutrition grade
3.Sorting happens without extra API calls

# 6. Product Detail Page

* Dynamic route using barcode
* Displays:
* Ingredients
* Energy
* Fat, Carbs, Protein
* Labels
* Uses React Router

# 7. Responsive UI

* Fully responsive layout
* Works on mobile, tablet, and desktop
* Styled using Tailwind CSS

# 🛠️ Tech Stack
# Technology	                Usage
React	                       Frontend UI
Vite	                       Fast build & dev server
Axios	                       API requests
React Router DOM	           Routing
Infinite Scroll Component	   Lazy loading
Tailwind CSS	               Styling
OpenFoodFacts API	           Food data

# 📂 Project Structure

src/
│── components/
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│
│── pages/
│   ├── Home.jsx
│   ├── ProductDetail.jsx
│
│── services/
│   ├── api.js
│
│── App.jsx
│── main.jsx

# Important & Famous Code Patterns (With Notes)

# 1.Infinite Scroll Logic (Very Important)

<InfiniteScroll
  dataLength={products.length}
  next={() => setPage(prev => prev + 1)}
  hasMore={hasMore}
>

* This is a real-world pagination pattern
* Used in Instagram, Amazon, YouTube feeds
* Avoids performance issues

# 2.Reset Pagination on Filter Change

useEffect(() => {
  setProducts([]);
  setPage(1);
  setHasMore(true);
}, [query, category]);


* Prevents stale page data
* Common bug in infinite-scroll apps
* Interviewers LOVE this logic

# 3.API Layer Abstraction 

export const fetchProducts = async (page, category) => {
  return axios.get(...);
};

* Separates UI & business logic
* Makes code reusable & testable
* Industry-standard practice

# 4.Barcode Search API Call

export const getProductByBarcode = async (barcode) => {
  return axios.get(
    `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
  );
};

* Demonstrates REST API usage
* Shows real-world use case (food scanning apps)

# 5.Client-Side Sorting

sorted.sort((a, b) =>
  (a.product_name || "").localeCompare(b.product_name || "")
);

* Reduces backend dependency
* Improves UI responsiveness
* Common frontend optimization

# Dynamic Routing with React Router
 
 const { barcode } = useParams();

* Used in almost every real-world React app
* Enables SEO-friendly URLs
* Essential interview topic

# What You Learn From This Project

* How infinite scrolling works internally
* How to manage pagination state correctly
* How to structure React apps professionally
* How to integrate third-party APIs
* How to avoid common React bugs
* How real production frontend apps are built

# Future Improvements

* Debounced search input
* Skeleton loaders
* Error handling UI
* Barcode scanner using camera
* Redux / Context API
* Server-side pagination optimization

# How to Run the Project
npm install
npm run dev

# API Used

OpenFoodFacts API
Base URL: https://world.openfoodfacts.org/

Get products by category:
https://world.openfoodfacts.org/category/{category}.json

Search products by name:
https://world.openfoodfacts.org/cgi/search.pl?search_terms={name}&json=true

Get product details by barcode:
https://world.openfoodfacts.org/api/v0/product/{barcode}.json

Example Query:
https://world.openfoodfacts.org/api/v0/product/737628064502.
json (retrieves detailed product information for a specific product by barcode)



