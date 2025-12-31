import axios from "axios";

const BASE_URL = "https://world.openfoodfacts.org";

export const fetchProducts = async (page = 1, category = "") => {
  try {
    if (category) {
      const res = await axios.get(
        `${BASE_URL}/category/${category}.json`,
        { params: { page, page_size: 20 } }
      );
      return res.data.products || [];
    }

    const res = await axios.get(
      `${BASE_URL}/cgi/search.pl`,
      {
        params: {
          search_simple: 1,
          action: "process",
          json: 1,
          page,
          page_size: 20,
        },
      }
    );

    return res.data.products || [];
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const searchProductsByName = async (name, page = 1) => {
  const res = await axios.get(
    `${BASE_URL}/cgi/search.pl`,
    {
      params: {
        search_terms: name,
        search_simple: 1,
        action: "process",
        json: 1,
        page,
        page_size: 20,
      },
    }
  );
  return res.data.products || [];
};

export const getProductByBarcode = async (barcode) => {
  const res = await axios.get(
    `${BASE_URL}/api/v0/product/${barcode}.json`
  );
  return res.data.product
    ? [res.data.product]
    : [];
};
