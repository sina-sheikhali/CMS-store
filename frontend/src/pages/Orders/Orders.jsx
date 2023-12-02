import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import ErrorBox from "../../Components/ErrorBox/ErrorBox";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import { HiMiniTrash } from "react-icons/hi2";

export default function Orders() {
  const [allOrders, setAllOrders] = useState([]);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowRejectModal, setIsShowRejectModal] = useState(false);
  const [isShowAcceptModal, setIsShowAcceptModal] = useState(false);
  const [orderID, setOrderID] = useState();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const columns = [
    { field: "id", headerName: "#", width: 50, headerAlign: "center" },
    {
      field: "productID",
      headerName: "نام محصول",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "userID",
      headerName: "سفارش دهنده",
      width: 150,
      headerAlign: "center",
    },
    { field: "date", headerName: "تاریخ", width: 100, headerAlign: "center" },
    { field: "hour", headerName: "ساعت", width: 100, headerAlign: "center" },
    { field: "count", headerName: "تعداد", width: 70, headerAlign: "center" },
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
    {
      field: "isActive",
      headerName: "وضعیت",
      width: 150,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <>
            {params.row.isActive === 0 ? (
              <span className="px-3 py-1 rounded-md text-sm font-bold text-white bg-orangeColor">
                رد شده
              </span>
            ) : (
              <span className="px-3 py-1 rounded-md text-sm font-bold text-white bg-greenColor">
                تایید شده
              </span>
            )}
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "عملیات",
      width: 200,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="flex justify-center gap-3 w-full my-2">
            <button
              className="p-2  rounded-md bg-redColor text-white text-lg hover:bg-[#fc424ae6] transition-colors"
              onClick={() => {
                setIsShowDeleteModal(true);
                setOrderID(params.row.id);
              }}
            >
              <HiMiniTrash />
            </button>
            {params.row.isActive === 0 ? (
              <button
                className="p-2 w-10 rounded-md font-bold bg-blueColor text-white hover:bg-[#0090e7e6] transition-colors"
                onClick={() => {
                  setIsShowAcceptModal(true);
                  setOrderID(params.row.id);
                }}
              >
                تایید
              </button>
            ) : (
              <button
                className="p-2 w-10 rounded-md font-bold  bg-blueColor text-white hover:bg-[#0090e7e6] transition-colors"
                onClick={() => {
                  setIsShowRejectModal(true);
                  setOrderID(params.row.id);
                }}
              >
                رد
              </button>
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getAllOrders();
  }, []);
  const getAllOrders = () => {
    fetch("http://localhost:8000/api/orders/")
      .then((respons) => respons.json())
      .then((orders) => {
        setAllOrders(orders);
      });
  };

  const submitActionDeleteModal = () => {
    fetch(`http://localhost:8000/api/orders/${orderID}`, {
      method: "DELETE",
    })
      .then((respons) => respons.json())
      .then((result) => {
        setIsShowDeleteModal(false);
        getAllOrders();
      });
  };

  const submitOrder = () => {
    fetch(`http://localhost:8000/api/orders/active-order/${orderID}/1`, {
      method: "PUT",
    })
      .then((respons) => respons.json())
      .then((result) => {
        setIsShowAcceptModal(false);
        getAllOrders();
      });
  };
  const rejectOrder = () => {
    fetch(`http://localhost:8000/api/orders/active-order/${orderID}/0`, {
      method: "PUT",
    })
      .then((respons) => respons.json())
      .then((result) => {
        setIsShowRejectModal(false);
        getAllOrders();
      });
  };
  const closeDeleteModal = () => setIsShowDeleteModal(false);
  const closeAcceptModal = () => setIsShowAcceptModal(false);
  const closeRejectModal = () => setIsShowRejectModal(false);

  return (
    <div className="flex flex-col gap-5 p-3">
      {allOrders.length ? (
        <DataGrid
          getRowHeight={() => "auto"}
          sx={{
            fontFamily: "Vazir",
            color: "#6c7293",
            border: "1px solid #2c2e33",

            "& .MuiDataGrid-cell": {
              justifyContent: "center",
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
            "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
              borderBottom: "1px solid #2c2e33",
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
          rows={allOrders}
          columns={columns}
          className="bg-grayColor"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        ></DataGrid>
      ) : (
        <ErrorBox msg={"هیچ کامنتی یافت نشد!"} />
      )}

      {isShowDeleteModal && (
        <DeleteModal
          title={"آیا از حذف این سفارش اطمینان دارید؟"}
          cancelAction={closeDeleteModal}
          submitAction={submitActionDeleteModal}
        ></DeleteModal>
      )}

      {isShowAcceptModal && (
        <DeleteModal
          title={"آیا از انجام این عملیات اطمینان دارید؟"}
          cancelAction={closeAcceptModal}
          submitAction={submitOrder}
        ></DeleteModal>
      )}
      {isShowRejectModal && (
        <DeleteModal
          title={"آیا از انجام این عملیات اطمینان دارید؟"}
          cancelAction={closeRejectModal}
          submitAction={rejectOrder}
        ></DeleteModal>
      )}
    </div>
  );
}
