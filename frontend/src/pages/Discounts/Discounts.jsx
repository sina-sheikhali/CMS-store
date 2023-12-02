import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import ErrorBox from "../../Components/ErrorBox/ErrorBox";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import { HiMiniTrash } from "react-icons/hi2";

export default function Discounts() {
  const [allDiscounts, setAllDiscounts] = useState([]);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowRejectModal, setIsShowRejectModal] = useState(false);
  const [isShowAcceptModal, setIsShowAcceptModal] = useState(false);
  const [discountID, setDiscountID] = useState();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const columns = [
    { field: "id", headerName: "#", width: 50, headerAlign: "center" },
    {
      field: "code",
      headerName: "کد تخفیف",
      width: 100,
      headerAlign: "center",
    },
    {
      field: "percent",
      headerName: "درصد تخفیف",
      width: 100,
      headerAlign: "center",
      renderCell: (params) => {
        return <span>{params.row.percent}%</span>;
      },
    },
    {
      field: "productID",
      headerName: "نام محصول",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "adminID",
      headerName: " ادمین",
      width: 150,
      headerAlign: "center",
    },
    { field: "date", headerName: "تاریخ", width: 100, headerAlign: "center" },

    {
      field: "isActive",
      headerName: "وضعیت",
      width: 150,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <>
            {params.row.isActive === 1 ? (
              <span className="flex justify-center py-1 w-16 rounded-md text-sm font-bold text-white bg-greenColor">
                فعال
              </span>
            ) : (
              <span className="flex justify-center py-1 w-16 rounded-md text-sm font-bold text-white bg-orangeColor">
                غیر فعال
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
                setDiscountID(params.row.id);
              }}
            >
              <HiMiniTrash />
            </button>
            {params.row.isActive === 0 ? (
              <button
                className="p-2 w-10 rounded-md font-bold bg-blueColor text-white hover:bg-[#0090e7e6] transition-colors"
                onClick={() => {
                  setIsShowAcceptModal(true);
                  setDiscountID(params.row.id);
                }}
              >
                تایید
              </button>
            ) : (
              <button
                className="p-2 w-10 rounded-md font-bold  bg-blueColor text-white hover:bg-[#0090e7e6] transition-colors"
                onClick={() => {
                  setIsShowRejectModal(true);
                  setDiscountID(params.row.id);
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

  const getAllDiscounts = () => {
    fetch("http://localhost:8000/api/offs/")
      .then((respons) => respons.json())
      .then((discounts) => {
        setAllDiscounts(discounts);
      });
  };
  useEffect(() => {
    getAllDiscounts();
  }, []);

  const closeDeleteModal = () => setIsShowDeleteModal(false);
  const closeAcceptModal = () => setIsShowAcceptModal(false);
  const closeRejectModal = () => setIsShowRejectModal(false);

  const submitActionDeleteModal = () => {
    fetch(`http://localhost:8000/api/offs/${discountID}`, {
      method: "DELETE",
    })
      .then((respons) => respons.json())
      .then((result) => {
        getAllDiscounts();
        setIsShowDeleteModal(false);
      });
  };

  const submitDiscount = () => {
    fetch(`http://localhost:8000/api/offs/active-off/${discountID}/1`, {
      method: "PUT",
    })
      .then((respons) => respons.json())
      .then((result) => {
        getAllDiscounts();
        setIsShowAcceptModal(false);
      });
  };
  const rejectDiscount = () => {
    fetch(`http://localhost:8000/api/offs/active-off/${discountID}/0`, {
      method: "PUT",
    })
      .then((respons) => respons.json())
      .then((result) => {
        getAllDiscounts();
        setIsShowRejectModal(false);
      });
  };
  return (
    <div className="flex flex-col gap-5 p-3">
      {allDiscounts.length ? (
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
          rows={allDiscounts}
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
          title={"آیا از حذف اطمینان دارید؟"}
          cancelAction={closeDeleteModal}
          submitAction={submitActionDeleteModal}
        ></DeleteModal>
      )}

      {isShowAcceptModal && (
        <DeleteModal
          title={"آیا از انجام این عملیات اطمینان دارید؟"}
          cancelAction={closeAcceptModal}
          submitAction={submitDiscount}
        ></DeleteModal>
      )}
      {isShowRejectModal && (
        <DeleteModal
          title={"آیا از انجام این عملیات اطمینان دارید؟"}
          cancelAction={closeRejectModal}
          submitAction={rejectDiscount}
        ></DeleteModal>
      )}
    </div>
  );
}
