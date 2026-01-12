# FoodFacts(React + Vite)

A modern Food Product Explorer web application built using React, Vite, Infinite Scroll, and OpenFoodFacts API.
This project allows users to explore food products, search by name, filter by category, scan/search by barcode, and view detailed nutritional information.

# 🚀 Project Overview

This application fetches food product data from the OpenFoodFacts public API and presents it in a clean, responsive UI with features commonly used in real-world e-commerce and food-tech applications.

* It demonstrates:
* API integration
* Infinite scrolling
* Search & filtering
* Client-side sorting
* Dynamic routing
* Modular frontend architecture

# 🚀 Project Overview

This application fetches food product data from the OpenFoodFacts public API and presents it in a clean, responsive UI with features commonly used in real-world e-commerce and food-tech applications.

* It demonstrates:
* API integration
* Infinite scrolling
* Search & filtering
* Client-side sorting
* Dynamic routing
* Modular frontend architecture

# 🎯 Key Features
# 1.Infinite Scroll Product Listing

* Products load page-by-page as the user scrolls
* Improves performance and user experience
* Avoids loading all data at once

# 2. Search Products by Name

* Search food items using keywords
* Automatically resets pagination
* Works seamlessly with infinite scrolling

# 3. Barcode-Based Product Search

* Fetches a single product using barcode
* Useful for food scanning apps
* Stops infinite scroll for single result

# 4. Category Filtering

* Filter food products by category
* Clears search state automatically
* Re-fetches products correctly

# 5. Client-Side Sorting

Sort products by:
* Name (A–Z, Z–A)
* Nutrition grade
* Sorting happens without extra API calls

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
* React	                       Frontend UI
* Vite	                       Fast build & dev server
* Axios	                       API requests
* React Router DOM	           Routing
* Infinite Scroll Component	   Lazy loading
* Tailwind CSS	               Styling
* OpenFoodFacts API	           Food data

# 📂 Project Structure
```js
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
```
# Important & Famous Code Patterns (With Notes)

# 1.Infinite Scroll Logic (Very Important)
```js
InfiniteScroll
  dataLength={products.length}
  next={() => setPage(prev => prev + 1)}
  hasMore={hasMore}
```
* This is a real-world pagination pattern
* Used in Instagram, Amazon, YouTube feeds
* Avoids performance issues

# 2.Reset Pagination on Filter Change
```js
useEffect(() => {
  setProducts([]);
  setPage(1);
  setHasMore(true);
}, [query, category]);
```

* Prevents stale page data
* Common bug in infinite-scroll apps
* Interviewers LOVE this logic

# 3.API Layer Abstraction 
```js
export const fetchProducts = async (page, category) => {
  return axios.get(...);
};
```
* Separates UI & business logic
* Makes code reusable & testable
* Industry-standard practice

# 4.Barcode Search API Call
```js
export const getProductByBarcode = async (barcode) => {
  return axios.get(
    `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
  );
};
```
* Demonstrates REST API usage
* Shows real-world use case (food scanning apps)

# 5.Client-Side Sorting
```js
sorted.sort((a, b) =>
  (a.product_name || "").localeCompare(b.product_name || "")
);
```
* Reduces backend dependency
* Improves UI responsiveness
* Common frontend optimization

# Dynamic Routing with React Router
 ```js
 const { barcode } = useParams();
```
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
```js
npm install
npm run dev
```
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



