import { useProductContext } from "@/context/ProductContext";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";

// Define your CategoryItem component
const CategoryItem = ({ category }: { category: string }) => {
  const [active, setActive] = React.useState(false);
  const { filterProductsByCategory, selectedCategory } = useProductContext();

  const handleClick = () => {
    if (active) {
      // remove current category from selectedCategory
      console.log(
        "newSelectedCategory: ",
        selectedCategory.filter((item: string) => item !== category)
      );

      filterProductsByCategory(
        selectedCategory.filter((item: string) => item !== category)
      );
    } else {
      // add current category to selectedCategory
      // console.log("newSelectedCategory: ", [...selectedCategory, category]);
      filterProductsByCategory([...selectedCategory, category]);
    }
    setActive(!active);
  };

  return (
    <List disablePadding>
      <ListItemButton
        onClick={handleClick}
        className={`${active ? "bg-gray-500" : "bg-none"}`}
      >
        <ListItemText primary={category} className="uppercase" />
      </ListItemButton>
    </List>
  );
};

function CategoryFilter() {
  const [categories, setCategories] = useState<string[]>([]); // Use string[] for categories

  useEffect(() => {
    // Make an API request to fetch category data

    if (!categories.length) {
      fetch("https://fakestoreapi.com/products/categories")
        .then((response) => response.json())
        .then((data) => {
          setCategories(data);
          console.log("data: ", data);
        })
        .catch((error) => console.error("Error fetching categories: ", error));
    }
  }, [categories]); // Include categories in the dependency array

  return (
    <div className="border border-black rounded-[2%] p-6 min-w-[10vw]">
      <Typography variant="h5">Category</Typography>
      {categories.map((category: string, index: number) => (
        <CategoryItem key={index} category={category} />
      ))}
    </div>
  );
}

export default CategoryFilter;