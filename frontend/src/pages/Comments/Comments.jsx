import React, { useEffect, useState } from "react";
import ErrorBox from "../../Components/ErrorBox/ErrorBox";
import { DataGrid } from "@mui/x-data-grid";
import { HiMiniTrash } from "react-icons/hi2";
import { FaEdit } from "react-icons/fa";
import DetailsModal from "../../Components/DetailsModal/DetailsModal";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import EditModal from "../../Components/EditModal/EditModal";
export default function Comments() {
  const [allComments, setAllComments] = useState([]);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowAcceptModal, setIsShowAcceptModal] = useState(false);
  const [isShowRejectModal, setIsShowRejectModal] = useState(false);
  const [commentID, setCommentID] = useState(null);
  const [mainCommentBody, setMainCommentBody] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const columns = [
    { field: "id", headerName: "#", width: 50, headerAlign: "center" },
    {
      field: "userID",
      headerName: "نام کاربر",
      width: 100,
      headerAlign: "center",
    },
    {
      field: "productID",
      headerName: "محصول",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "body",
      headerName: "متن",
      width: 100,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <button
            className="p-2 m-2 rounded-md bg-blueColor text-white  hover:bg-[#0090e7e6]"
            onClick={() => {
              setIsShowDetailsModal(true);
              setMainCommentBody(params.row.body);
            }}
          >
            مشاهده
          </button>
        );
      },
    },
    { field: "date", headerName: "تاریخ", width: 100, headerAlign: "center" },
    { field: "hour", headerName: "ساعت", width: 100, headerAlign: "center" },
    {
      field: "action",
      headerName: "عملیات",
      width: 200,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="flex justify-center gap-3 w-full my-2">
            <button
              className="p-2 rounded-md bg-orangeColor text-white text-lg hover:bg-[#ffab00e6] transition-colors"
              onClick={() => {
                setIsShowEditModal(true);
                setMainCommentBody(params.row.body);
                setCommentID(params.row.id);
              }}
            >
              <FaEdit />
            </button>
            <button
              className="p-2  rounded-md bg-redColor text-white text-lg hover:bg-[#fc424ae6] transition-colors"
              onClick={() => {
                setIsShowDeleteModal(true);
                setCommentID(params.row.id);
              }}
            >
              <HiMiniTrash />
            </button>

            {params.row.isAccept == 0 ? (
              <button
                className="p-2  rounded-md bg-purpleColor text-white hover:bg-[#8f5fe8d9] transition-colors"
                onClick={() => {
                  setIsShowAcceptModal(true);
                  setCommentID(params.row.id);
                }}
              >
                تایید
              </button>
            ) : (
              <button
                className="p-2  rounded-md bg-purpleColor text-white hover:bg-[#8f5fe8d9] transition-colors"
                onClick={() => {
                  setIsShowRejectModal(true);
                  setCommentID(params.row.id);
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
    getAllComments();
  }, []);

  const getAllComments = () => {
    fetch("http://localhost:8000/api/comments")
      .then((respons) => respons.json())
      .then((comments) => setAllComments(comments));
  };

  const submitActionDeleteModal = () => {
    fetch(`http://localhost:8000/api/comments/${commentID}`, {
      method: "DELETE",
    })
      .then((respons) => respons.json())
      .then((result) => {
        setIsShowDeleteModal(false);
        getAllComments();
      });
  };
  const updateComment = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8000/api/comments/${commentID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: mainCommentBody,
      }),
    })
      .then((respons) => respons.json())
      .then((result) => {
        getAllComments();
        setIsShowEditModal(false);
      });
  };

  const submitComment = () => {
    fetch(`http://localhost:8000/api/comments/accept/${commentID}`, {
      method: "POST",
    })
      .then((respons) => respons.json())
      .then((result) => {
        setIsShowAcceptModal(false);
        getAllComments();
      });
  };
  const rejectComment = () => {
    fetch(`http://localhost:8000/api/comments/reject/${commentID}`, {
      method: "POST",
    })
      .then((respons) => respons.json())
      .then((result) => {
        setIsShowRejectModal(false);
        getAllComments();
      });
  };
  const closeDetailsModal = () => setIsShowDetailsModal(false);
  const closeDeleteModal = () => setIsShowDeleteModal(false);
  const closeEditModal = () => setIsShowEditModal(false);
  const closeAcceptModal = () => setIsShowAcceptModal(false);
  const closeRejectModal = () => setIsShowRejectModal(false);

  return (
    <div className="flex flex-col gap-5 p-3">
      {allComments.length ? (
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
          rows={allComments}
          columns={columns}
          className="bg-grayColor"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        ></DataGrid>
      ) : (
        <ErrorBox msg={"هیچ کامنتی یافت نشد!"} />
      )}
      {isShowDetailsModal && (
        <DetailsModal onClose={closeDetailsModal}>
          <div className="flex flex-col gap-5  items-center">
            <h1 className="text-xl font-bold">متن</h1>
            <p>{mainCommentBody}</p>
          </div>
        </DetailsModal>
      )}
      {isShowDeleteModal && (
        <DeleteModal
          title={"آیا از حذف اطمینان دارید؟"}
          cancelAction={closeDeleteModal}
          submitAction={submitActionDeleteModal}
        ></DeleteModal>
      )}

      {isShowEditModal && (
        <EditModal onClose={closeEditModal} onSubmit={updateComment}>
          <textarea
            rows={4}
            className="py-2 px-1"
            value={mainCommentBody}
            onChange={(event) => setMainCommentBody(event.target.value)}
          ></textarea>
        </EditModal>
      )}

      {isShowAcceptModal && (
        <DeleteModal
          title={"آیا از انجام این عملیات اطمینان دارید؟"}
          cancelAction={closeAcceptModal}
          submitAction={submitComment}
        ></DeleteModal>
      )}
      {isShowRejectModal && (
        <DeleteModal
          title={"آیا از انجام این عملیات اطمینان دارید؟"}
          cancelAction={closeRejectModal}
          submitAction={rejectComment}
        ></DeleteModal>
      )}
    </div>
  );
}
