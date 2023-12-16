import React, { useState, useEffect } from "react";
import ProductTable from "../../Components/ProductTable/ProductTable";
import AddNewProduct from "../../Components/AddNewProdcut/AddNewProduct";
import baseURL from "../../api";
export default function Products() {
  const [allProducts, setAllProducts] = useState([]);
  const [isShowLoader, setIsShowLoader] = useState(true);
  useEffect(() => {
    getAllProducts();
  }, []);
  const getAllProducts = () => {
    fetch(`${baseURL}products`)
      .then((respons) => respons.json())
      .then((products) => {
        setAllProducts(products.reverse());
        setIsShowLoader(false);
      });
  };
  return (
    <>
      <div className="flex flex-col gap-5 p-3">
        <AddNewProduct getAllProducts={getAllProducts} />
        <ProductTable
          getAllProcuts={getAllProducts}
          allProducts={allProducts}
          isShowLoader={isShowLoader}
        />
      </div>
    </>
  );
}
