import React, { useState, useEffect } from "react";
import ProductTable from "../../Components/ProductTable/ProductTable";
import AddNewProduct from "../../Components/AddNewProdcut/AddNewProduct";

export default function Products() {
  const [allProducts, setAllProducts] = useState([]);
  useEffect(() => {
    getAllProducts();
  }, []);
  const getAllProducts = () => {
    fetch("http://localhost:8000/api/products")
      .then((respons) => respons.json())
      .then((products) => setAllProducts(products.reverse()));
  };
  return (
    <>
      <div className="flex flex-col gap-5 p-3">
        <AddNewProduct getAllProducts={getAllProducts} />
        <ProductTable
          getAllProcuts={getAllProducts}
          allProducts={allProducts}
        />
      </div>
    </>
  );
}
