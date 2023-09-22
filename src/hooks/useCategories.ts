import { useState } from "react";

export function useCategories() {
  const [categories, setCategories] = useState([]);

  if (categories.length === 0) {
    fetch("https://fakestoreapi.com/products/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => console.error("Error fetching categories: ", error));
  }
  return categories;
}
