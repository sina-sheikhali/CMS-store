import React, { useState } from "react";

export default function AddNewProduct({ getAllProducts }) {
  const [newProductTitle, setNewProductTitle] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductCount, setNewProductCount] = useState("");
  const [newProductImg, setNewProductImg] = useState("");
  const [newProductPopularity, setNewProdcutPopularity] = useState("");
  const [newProductSale, setNewProdcutSale] = useState("");
  const [newProdcutColors, setNewProductColors] = useState("");

  const newProductInfos = {
    title: newProductTitle,
    price: newProductPrice,
    count: newProductCount,
    img: newProductImg,
    popularity: newProductPopularity,
    sale: newProductSale,
    colors: newProdcutColors,
  };

  const emptyProducts = () => {
    setNewProductTitle("");
    setNewProductPrice("");
    setNewProductImg("");
    setNewProductCount("");
    setNewProdcutSale("");
    setNewProdcutPopularity("");
    setNewProductColors("");
  };
  const addNewProduct = (event) => {
    event.preventDefault();

    fetch("http://localhost:8000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProductInfos),
    })
      .then((respons) => respons.json())
      .then((result) => {
        getAllProducts();
        emptyProducts();
      });
  };
  return (
    <div className="bg-grayColor p-3">
      <form className="grid grid-cols-2 gap-4 p-1 rounded-md">
        <div className="flex flex-col gap-y-3 text-white">
          <label htmlFor="1" className="">
            عنوان
          </label>
          <input
            id="1"
            type="text"
            placeholder="نام محصول"
            value={newProductTitle}
            onChange={(event) => setNewProductTitle(event.target.value)}
            className="border border-solid border-[#2c2e33] h-9 text-sm p-3 bg-[#2A3038] rounded-sm focus-within:text-lightGray focus-within:border-[#37633f] text-white transition-colors w-full"
          />
        </div>
        <div className="flex flex-col gap-y-3 text-white">
          <label htmlFor="1" className="">
            قیمت
          </label>
          <input
            id="1"
            type="text"
            placeholder="قیمت محصول"
            value={newProductPrice}
            onChange={(event) => setNewProductPrice(event.target.value)}
            className="border border-solid border-[#2c2e33] h-9 text-sm p-3 bg-[#2A3038] rounded-sm focus-within:text-lightGray focus-within:border-[#37633f] text-white transition-colors w-full"
          />
        </div>
        <div className="flex flex-col gap-y-3 text-white">
          <label htmlFor="1" className="">
            موجودی
          </label>
          <input
            id="1"
            type="text"
            placeholder="موجودی محصول"
            value={newProductCount}
            onChange={(event) => setNewProductCount(event.target.value)}
            className="border border-solid border-[#2c2e33] h-9 text-sm p-3 bg-[#2A3038] rounded-sm focus-within:text-lightGray focus-within:border-[#37633f] text-white transition-colors w-full"
          />
        </div>
        <div className="flex flex-col gap-y-3 text-white">
          <label htmlFor="1" className="">
            تصویر
          </label>
          <input
            id="1"
            type="text"
            placeholder="آدرس تصویر محصول"
            value={newProductImg}
            onChange={(event) => setNewProductImg(event.target.value)}
            className="border border-solid border-[#2c2e33] h-9 text-sm p-3 bg-[#2A3038] rounded-sm focus-within:text-lightGray focus-within:border-[#37633f] text-white transition-colors w-full"
          />
        </div>
        <div className="flex flex-col gap-y-3 text-white">
          <label htmlFor="1" className="">
            میزان محبوبیت
          </label>
          <input
            id="1"
            type="text"
            placeholder="میزان محبوبیت محصول"
            value={newProductPopularity}
            onChange={(event) => setNewProdcutPopularity(event.target.value)}
            className="border border-solid border-[#2c2e33] h-9 text-sm p-3 bg-[#2A3038] rounded-sm focus-within:text-lightGray focus-within:border-[#37633f] text-white transition-colors w-full"
          />
        </div>
        <div className="flex flex-col gap-y-3 text-white">
          <label htmlFor="1" className="">
            فروش کل
          </label>
          <input
            id="1"
            type="text"
            placeholder="میزان فروش محصول"
            value={newProductSale}
            onChange={(event) => setNewProdcutSale(event.target.value)}
            className="border border-solid border-[#2c2e33] h-9 text-sm p-3 bg-[#2A3038] rounded-sm focus-within:text-lightGray focus-within:border-[#37633f] text-white transition-colors w-full"
          />
        </div>
        <div className="flex flex-col gap-y-3 text-white">
          <label htmlFor="1" className="">
            رنگ بندی
          </label>
          <input
            id="1"
            type="text"
            placeholder="تعداد رنگ بندی"
            value={newProdcutColors}
            onChange={(event) => setNewProductColors(event.target.value)}
            className="border border-solid border-[#2c2e33] h-9 text-sm p-3 bg-[#2A3038] rounded-sm focus-within:text-lightGray focus-within:border-[#37633f] text-white transition-colors w-full"
          />
        </div>
        <div className="p-1 flex justify-end mt-12">
          <button
            className="my-5 ml-5 bg-blueColor text-white transition-colors px-3 py-2 rounded-md font-bold text-lg hover:bg-[#0090e7d0]"
            onClick={addNewProduct}
          >
            ثبت محصول
          </button>
        </div>
      </form>
    </div>
  );
}
