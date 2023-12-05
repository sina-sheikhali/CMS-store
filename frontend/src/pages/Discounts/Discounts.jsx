import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import ErrorBox from "../../Components/ErrorBox/ErrorBox";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import { HiMiniTrash } from "react-icons/hi2";
import GridTable from "../../Components/GridTable/GridTable";

export default function Discounts() {
  const notify = (text, notif) => notif(text);
  const [allDiscounts, setAllDiscounts] = useState([]);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowRejectModal, setIsShowRejectModal] = useState(false);
  const [isShowAcceptModal, setIsShowAcceptModal] = useState(false);
  const [discountID, setDiscountID] = useState();

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
                لغو
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
        notify("کد تخفیف مورد نظر حذف شد", toast.success);
      })
      .catch((err) => {
        setIsShowDeleteModal(false);
        notify("خطایی رخ داده است", toast.error);
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
        notify("کد تخفیف مورد نظر فعال شد", toast.success);
      })
      .catch((err) => {
        setIsShowAcceptModal(false);
        notify("خطایی رخ داده است", toast.error);
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
        notify("کد تخفیف مورد نظر غیرفعال شد", toast.warn);
      })
      .catch((err) => {
        setIsShowRejectModal(false);
        notify("خطایی رخ داده است", toast.error);
      });
  };
  return (
    <div className="flex flex-col gap-5 p-3">
      {allDiscounts.length ? (
        <GridTable rowData={allDiscounts} columnData={columns} />
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
      <ToastContainer rtl="true" autoClose={3000} />
    </div>
  );
}
