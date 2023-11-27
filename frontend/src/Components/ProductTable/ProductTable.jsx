import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import ErrorBox from "../ErrorBox/ErrorBox";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import DetailsModal from "../DetailsModal/DetailsModal";
import EditModal from "../EditModal/EditModal";
import { HiMiniInformationCircle } from "react-icons/hi2";
import { HiMiniTrash } from "react-icons/hi2";
import { FaEdit } from "react-icons/fa";
export default function ProductTable({ getAllProcuts, allProducts }) {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowDetailsModal, setIShowDetailsModal] = useState(false);
  const [isShowEditModal, setIShowEditModal] = useState(false);
  const [productID, setProductID] = useState();
  const [mainProcutInfos, setMainProductInfos] = useState();
  const [productNewTitle, setProductNewTitle] = useState();
  const [productNewPrice, setProductNewPrice] = useState();
  const [productNewCount, setProductNewCount] = useState();
  const [productNewPopularity, setProductNewPopularity] = useState();
  const [productNewColors, setProductNewColors] = useState();
  const [productNewSale, setProductNewSale] = useState();
  const [productNewImg, setProductNewImg] = useState();

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const columns = [
    { field: "id", headerName: "#", width: 50, headerAlign: "center" },
    {
      field: "img",
      headerName: "تصویر",
      width: 150,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="w-full flex justify-center items-center">
            <img
              src={params.row.img}
              alt="image"
              className="w-full object-cover rounded-lg my-2"
            />
          </div>
        );
      },
    },
    {
      field: "title",
      headerName: "عنوان ",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "price",
      headerName: "قیمت",
      width: 120,

      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="overflow-hidden whitespace-nowrap text-ellipsis">
            <span>
              {new Intl.NumberFormat("en-US").format(params.row.price)}
            </span>
            <span className="text-xs">تومان</span>
          </div>
        );
      },
    },
    { field: "count", headerName: "موجودی", width: 100, headerAlign: "center" },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="flex justify-around w-full my-2">
            <button
              className="p-2  rounded-md bg-blueColor text-white text-lg hover:bg-[#0090e7e6]"
              onClick={() => {
                setIShowDetailsModal(true);
                setMainProductInfos(params.row);
              }}
            >
              <HiMiniInformationCircle />
            </button>
            <button
              className="p-2 rounded-md bg-orangeColor text-white text-lg hover:bg-[#ffab00e6] transition-colors"
              onClick={() => {
                setIShowEditModal(true);
                setProductID(params.row.id);
                setProductNewTitle(params.row.title);
                setProductNewPrice(params.row.price);
                setProductNewCount(params.row.count);
                setProductNewSale(params.row.sale);
                setProductNewPopularity(params.row.popularity);
                setProductNewColors(params.row.colors);
                setProductNewImg(params.row.img);
              }}
            >
              <FaEdit />
            </button>
            <button
              className="p-2  rounded-md bg-redColor text-white text-lg hover:bg-[#fc424ae6] transition-colors"
              onClick={() => {
                setIsShowDeleteModal(true);
                setProductID(params.row.id);
              }}
            >
              <HiMiniTrash />
            </button>
          </div>
        );
      },
    },
  ];

  const submitActionDeleteModal = () => {
    fetch(`http://localhost:8000/api/products/${productID}`, {
      method: "DELETE",
    })
      .then((respons) => respons.json())
      .then((result) => {
        setIsShowDeleteModal(false);
        getAllProcuts();
      })
      .catch((err) => {});
  };
  const cancleActionDeleteModal = () => {
    setIsShowDeleteModal(false);
  };
  const closeDetailsModal = () => {
    setIShowDetailsModal(false);
  };
  const closeEditModal = () => {
    setIShowEditModal(false);
  };
  const updateProductInfos = (event) => {
    event.preventDefault();

    const productNewInfos = {
      title: productNewTitle,
      price: productNewPrice,
      count: productNewCount,
      img: productNewImg,
      popularity: productNewPopularity,
      colors: productNewColors,
      sale: productNewSale,
    };

    fetch(`http://localhost:8000/api/products/${productID}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productNewInfos),
    })
      .then((respons) => respons.json())
      .then((result) => {
        getAllProcuts();
        setIShowEditModal(false);
      });
  };

  return (
    <>
      {allProducts.length ? (
        <DataGrid
          getRowHeight={() => "auto"}
          sx={{
            fontFamily: "Vazir",
            color: "#6c7293",

            "& .MuiDataGrid-cell ,": {
              border: "1px solid #2c2e33",
              justifyContent: "center",
            },
            "& .MuiDataGrid-root": {
              border: "2px solid #2c2e33",
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: "1px solid #2c2e33",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "1px solid #2c2e33",

              direction: "rtl",
            },

            "& .MuiToolbar-root": {
              direction: "rtl",
              color: "white",
            },
            "& .MuiTablePagination-actions": {
              direction: "ltr",
            },
            "& .MuiTablePagination-displayedRows": {
              direction: "ltr",
            },
            "& .MuiButtonBase-root": {
              color: "white",
            },
          }}
          rows={allProducts}
          columns={columns}
          className="bg-grayColor"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        ></DataGrid>
      ) : (
        <ErrorBox msg={"هیچ محصولی یافت نشد"} />
      )}
      {isShowDeleteModal && (
        <DeleteModal
          submitAction={submitActionDeleteModal}
          cancelAction={cancleActionDeleteModal}
        />
      )}
      {isShowDetailsModal && (
        <DetailsModal onClose={closeDetailsModal}>
          <table className="border-collapse table border-spacing-[2px]  border-gray-500 w-full">
            <thead>
              <tr className="table-row">
                <th className="px-8 py-4 text-xl align-bottom font-bold whitespace-nowrap  leading-4">
                  رنگ بندی
                </th>
                <th className="px-8 py-4 text-xl align-bottom font-bold whitespace-nowrap  leading-4">
                  محبوبیت
                </th>
                <th className="px-8 py-4 text-xl align-bottom font-bold whitespace-nowrap  leading-4">
                  فروش
                </th>
              </tr>
            </thead>
            <tbody className="">
              <tr className="table-row text-lightGray">
                <td className=" px-8 py-4  align-middle  table-cell font-bold whitespace-nowrap  leading-4 text-center">
                  <span>{mainProcutInfos.colors}</span>
                </td>
                <td className=" px-8 py-4  align-middle  table-cell font-bold whitespace-nowrap  leading-4 text-center">
                  <span>{mainProcutInfos.popularity}%</span>
                </td>
                <td className=" px-8 py-4  align-middle  table-cell font-bold whitespace-nowrap  leading-4 text-center">
                  <span>
                    {new Intl.NumberFormat("en-US").format(
                      mainProcutInfos.sale
                    )}
                    تومان
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </DetailsModal>
      )}
      {isShowEditModal && (
        <EditModal onClose={closeEditModal} onSubmit={updateProductInfos}>
          <div className="flex flex-col gap-4">
            <div
              className="flex flex-col gap-y-1 text-white
            "
            >
              <label htmlFor="1" className="text-sm">
                عنوان
              </label>
              <input
                id="1"
                type="text"
                value={productNewTitle}
                onChange={(event) => setProductNewTitle(event.target.value)}
                placeholder="مقدار جدید را وارد کنید"
                className="border border-solid border-[#2c2e33] h-9 text-sm p-3 bg-[#2A3038] rounded-sm focus-within:text-lightGray focus-within:border-[#37633f] text-white transition-colors w-full"
              />
            </div>
            <div
              className="flex flex-col gap-y-1 text-white
            "
            >
              <label htmlFor="1" className="text-sm">
                قیمت
              </label>
              <input
                id="1"
                type="text"
                value={productNewPrice}
                onChange={(event) => setProductNewPrice(event.target.value)}
                placeholder="مقدار جدید را وارد کنید"
                className="border border-solid border-[#2c2e33] h-9 text-sm p-3 bg-[#2A3038] rounded-sm focus-within:text-lightGray focus-within:border-[#37633f] text-white transition-colors w-full"
              />
            </div>
            <div
              className="flex flex-col gap-y-1 text-white
            "
            >
              <label htmlFor="1" className="text-sm">
                موجودی
              </label>
              <input
                id="1"
                type="text"
                value={productNewCount}
                onChange={(event) => setProductNewCount(event.target.value)}
                placeholder="مقدار جدید را وارد کنید"
                className="border border-solid border-[#2c2e33] h-9 text-sm p-3 bg-[#2A3038] rounded-sm focus-within:text-lightGray focus-within:border-[#37633f] text-white transition-colors w-full"
              />
            </div>
            <div
              className="flex flex-col gap-y-1 text-white
            "
            >
              <label htmlFor="1" className="text-sm">
                تصویر
              </label>
              <input
                id="1"
                type="text"
                value={productNewImg}
                onChange={(event) => setProductNewImg(event.target.value)}
                placeholder="مقدار جدید را وارد کنید"
                className="border border-solid border-[#2c2e33] h-9 text-sm p-3 bg-[#2A3038] rounded-sm focus-within:text-lightGray focus-within:border-[#37633f] text-white transition-colors w-full"
              />
            </div>
            <div
              className="flex flex-col gap-y-1 text-white
            "
            >
              <label htmlFor="1" className="text-sm">
                میزان محبوبیت
              </label>
              <input
                id="1"
                type="text"
                value={productNewPopularity}
                onChange={(event) =>
                  setProductNewPopularity(event.target.value)
                }
                placeholder="مقدار جدید را وارد کنید"
                className="border border-solid border-[#2c2e33] h-9 text-sm p-3 bg-[#2A3038] rounded-sm focus-within:text-lightGray focus-within:border-[#37633f] text-white transition-colors w-full"
              />
            </div>
            <div
              className="flex flex-col gap-y-1 text-white
            "
            >
              <label htmlFor="1" className="text-sm">
                فروش کل
              </label>
              <input
                id="1"
                type="text"
                value={productNewSale}
                onChange={(event) => setProductNewSale(event.target.value)}
                placeholder="مقدار جدید را وارد کنید"
                className="border border-solid border-[#2c2e33] h-9 text-sm p-3 bg-[#2A3038] rounded-sm focus-within:text-lightGray focus-within:border-[#37633f] text-white transition-colors w-full"
              />
            </div>
            <div
              className="flex flex-col gap-y-1 text-white
            "
            >
              <label htmlFor="1" className="text-sm">
                رنگ بندی
              </label>
              <input
                id="1"
                type="text"
                value={productNewColors}
                onChange={(event) => setProductNewColors(event.target.value)}
                placeholder="مقدار جدید را وارد کنید"
                className="border border-solid border-[#2c2e33] h-9 text-sm p-3 bg-[#2A3038] rounded-sm focus-within:text-lightGray focus-within:border-[#37633f] text-white transition-colors w-full"
              />
            </div>
          </div>
        </EditModal>
      )}
    </>
  );
}
