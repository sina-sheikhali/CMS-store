import React, { useEffect, useState } from "react";
import ErrorBox from "../../Components/ErrorBox/ErrorBox";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import DetailsModal from "../../Components/DetailsModal/DetailsModal";
import EditModal from "../../Components/EditModal/EditModal";
import { DataGrid } from "@mui/x-data-grid";
import { HiMiniInformationCircle } from "react-icons/hi2";
import { HiMiniTrash } from "react-icons/hi2";
import { FaEdit } from "react-icons/fa";
export default function Users() {
  const [allUsers, setAllUsers] = useState([]);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [mainUserInfos, setMainUserInfos] = useState();
  const [userID, setUserID] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [score, setScore] = useState("");
  const [buy, setBuy] = useState("");

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const columns = [
    { field: "id", headerName: "#", width: 50, headerAlign: "center" },
    {
      field: "fullname",
      headerName: "نام و نام خانوادگی",
      width: 200,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <span>
            {params.row.firsname} {params.row.lastname}
          </span>
        );
      },
    },
    {
      field: "username",
      headerName: "نام کاربری",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "password",
      headerName: "رمز عبور",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "phone",
      headerName: "شماره تماس",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "city",
      headerName: "شهر",
      width: 100,
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "ایمیل",
      width: 200,
      headerAlign: "center",
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
              className="p-2  rounded-md bg-blueColor text-white text-lg hover:bg-[#0090e7e6]"
              onClick={() => {
                setIsShowDetailsModal(true);
                setMainUserInfos(params.row);
              }}
            >
              <HiMiniInformationCircle />
            </button>
            <button
              className="p-2 rounded-md bg-orangeColor text-white text-lg hover:bg-[#ffab00e6] transition-colors"
              onClick={() => {
                setIsShowEditModal(true);
                setUserID(params.row.id);
                setFirstName(params.row.firsname);
                setLastName(params.row.lastname);
                setUsername(params.row.username);
                setPassword(params.row.password);
                setPhoneNumber(params.row.phone);
                setCity(params.row.city);
                setEmail(params.row.email);
                setAddress(params.row.address);
                setScore(params.row.score);
                setBuy(params.row.buy);
              }}
            >
              <FaEdit />
            </button>
            <button
              className="p-2  rounded-md bg-redColor text-white text-lg hover:bg-[#fc424ae6] transition-colors"
              onClick={() => {
                setIsShowDeleteModal(true);
                setUserID(params.row.id);
              }}
            >
              <HiMiniTrash />
            </button>
          </div>
        );
      },
    },
  ];

  const closeDeleteModal = () => setIsShowDeleteModal(false);
  const closeDetailsModal = () => setIsShowDetailsModal(false);
  const closeEditModal = () => setIsShowEditModal(false);

  const submitActionDeleteModal = () => {
    fetch(`http://localhost:8000/api/users/${userID}`, { method: "DELETE" })
      .then((respons) => respons.json())
      .then((result) => {
        getAllUsers();
        setIsShowDeleteModal(false);
      });
  };
  const getAllUsers = () => {
    fetch("http://localhost:8000/api/users/")
      .then((respons) => respons.json())
      .then((result) => {
        setAllUsers(result);
      });
  };

  const updateUserInfos = (event) => {
    event.preventDefault();
    const userNewInfos = {
      firsname: firstName,
      lastname: lastName,
      username: username,
      password: password,
      city: city,
      phone: phoneNumber,
      address: address,
      email: email,
      score: score,
      buy: buy,
    };

    fetch(`http://localhost:8000/api/users/${userID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userNewInfos),
    })
      .then((respons) => respons.json())
      .then((result) => {
        getAllUsers();
        setIsShowEditModal(false);
      });
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="flex flex-col gap-5 p-3">
      {allUsers.length ? (
        <DataGrid
          sx={{
            fontFamily: "Vazir",
            color: "#6c7293",
            border: "1px solid #2c2e33",
            "& .MuiDataGrid-cell ,": {
              justifyContent: "center",
            },

            "& .MuiDataGrid-columnHeaders": {
              borderBottom: "1px solid #2c2e33",
            },
            "& .MuiDataGrid-footerContainer": {
              border: "none",
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
          rows={allUsers}
          columns={columns}
          className="bg-grayColor"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        ></DataGrid>
      ) : (
        <ErrorBox msg={"هیچ کاربری یافت نشد!"} />
      )}
      {isShowDeleteModal && (
        <DeleteModal
          title={"آیا از حذف کاربر اطمینان دارید؟"}
          cancelAction={closeDeleteModal}
          submitAction={submitActionDeleteModal}
        ></DeleteModal>
      )}
      {isShowEditModal && (
        <EditModal onClose={closeEditModal} onSubmit={updateUserInfos}>
          <div className="flex flex-col gap-4">
            <div
              className="flex flex-col gap-y-1 text-white
            "
            >
              <label htmlFor="1" className="text-sm">
                نام
              </label>
              <input
                id="1"
                type="text"
                value={firstName}
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
                placeholder="مقدار جدید را وارد کنید"
                className="border border-solid border-[#2c2e33] h-9 text-sm p-3 bg-[#2A3038] rounded-sm focus-within:text-lightGray focus-within:border-[#37633f] text-white transition-colors w-full"
              />
            </div>
            <div
              className="flex flex-col gap-y-1 text-white
            "
            >
              <label htmlFor="1" className="text-sm">
                نام خانوادگی
              </label>
              <input
                id="1"
                type="text"
                value={lastName}
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
                placeholder="مقدار جدید را وارد کنید"
                className="border border-solid border-[#2c2e33] h-9 text-sm p-3 bg-[#2A3038] rounded-sm focus-within:text-lightGray focus-within:border-[#37633f] text-white transition-colors w-full"
              />
            </div>
            <div
              className="flex flex-col gap-y-1 text-white
            "
            >
              <label htmlFor="1" className="text-sm">
                نام کاربری
              </label>
              <input
                id="1"
                type="text"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
                placeholder="مقدار جدید را وارد کنید"
                className="border border-solid border-[#2c2e33] h-9 text-sm p-3 bg-[#2A3038] rounded-sm focus-within:text-lightGray focus-within:border-[#37633f] text-white transition-colors w-full"
              />
            </div>
            <div
              className="flex flex-col gap-y-1 text-white
            "
            >
              <label htmlFor="1" className="text-sm">
                پسورد
              </label>
              <input
                id="1"
                type="text"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                placeholder="مقدار جدید را وارد کنید"
                className="border border-solid border-[#2c2e33] h-9 text-sm p-3 bg-[#2A3038] rounded-sm focus-within:text-lightGray focus-within:border-[#37633f] text-white transition-colors w-full"
              />
            </div>
            <div
              className="flex flex-col gap-y-1 text-white
            "
            >
              <label htmlFor="1" className="text-sm">
                شماره تماس
              </label>
              <input
                id="1"
                type="text"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                placeholder="مقدار جدید را وارد کنید"
                className="border border-solid border-[#2c2e33] h-9 text-sm p-3 bg-[#2A3038] rounded-sm focus-within:text-lightGray focus-within:border-[#37633f] text-white transition-colors w-full"
              />
            </div>
            <div
              className="flex flex-col gap-y-1 text-white
            "
            >
              <label htmlFor="1" className="text-sm">
                شهر
              </label>
              <input
                id="1"
                type="text"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                placeholder="مقدار جدید را وارد کنید"
                className="border border-solid border-[#2c2e33] h-9 text-sm p-3 bg-[#2A3038] rounded-sm focus-within:text-lightGray focus-within:border-[#37633f] text-white transition-colors w-full"
              />
            </div>
            <div
              className="flex flex-col gap-y-1 text-white
            "
            >
              <label htmlFor="1" className="text-sm">
                آدرس
              </label>
              <input
                id="1"
                type="text"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                placeholder="مقدار جدید را وارد کنید"
                className="border border-solid border-[#2c2e33] h-9 text-sm p-3 bg-[#2A3038] rounded-sm focus-within:text-lightGray focus-within:border-[#37633f] text-white transition-colors w-full"
              />
            </div>
            <div
              className="flex flex-col gap-y-1 text-white
            "
            >
              <label htmlFor="1" className="text-sm">
                ایمیل
              </label>
              <input
                id="1"
                type="text"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="مقدار جدید را وارد کنید"
                className="border border-solid border-[#2c2e33] h-9 text-sm p-3 bg-[#2A3038] rounded-sm focus-within:text-lightGray focus-within:border-[#37633f] text-white transition-colors w-full"
              />
            </div>
            <div
              className="flex flex-col gap-y-1 text-white
            "
            >
              <label htmlFor="1" className="text-sm">
                امتیاز
              </label>
              <input
                id="1"
                type="text"
                value={score}
                onChange={(event) => setScore(event.target.value)}
                placeholder="مقدار جدید را وارد کنید"
                className="border border-solid border-[#2c2e33] h-9 text-sm p-3 bg-[#2A3038] rounded-sm focus-within:text-lightGray focus-within:border-[#37633f] text-white transition-colors w-full"
              />
            </div>
            <div
              className="flex flex-col gap-y-1 text-white
            "
            >
              <label htmlFor="1" className="text-sm">
                میزان خرید
              </label>
              <input
                id="1"
                type="text"
                value={buy}
                onChange={(event) => setBuy(event.target.value)}
                placeholder="مقدار جدید را وارد کنید"
                className="border border-solid border-[#2c2e33] h-9 text-sm p-3 bg-[#2A3038] rounded-sm focus-within:text-lightGray focus-within:border-[#37633f] text-white transition-colors w-full"
              />
            </div>
          </div>
        </EditModal>
      )}

      {isShowDetailsModal && (
        <DetailsModal onClose={closeDetailsModal}>
          <table className="border-collapse table border-spacing-[2px]  border-gray-500 w-full">
            <thead>
              <tr className="table-row">
                <th className="px-8 py-4 text-xl align-bottom font-bold whitespace-nowrap  leading-4">
                  شهر
                </th>
                <th className="px-8 py-4 text-xl align-bottom font-bold whitespace-nowrap  leading-4">
                  آدرس
                </th>
                <th className="px-8 py-4 text-xl align-bottom font-bold whitespace-nowrap  leading-4">
                  امتیاز
                </th>
                <th className="px-8 py-4 text-xl align-bottom font-bold whitespace-nowrap  leading-4">
                  میزان خرید
                </th>
              </tr>
            </thead>
            <tbody className="">
              <tr className="table-row text-lightGray">
                <td className=" px-8 py-4  align-middle  table-cell font-bold whitespace-nowrap  leading-4 text-center">
                  <span>{mainUserInfos.city}</span>
                </td>
                <td className=" px-8 py-4  align-middle  table-cell font-bold whitespace-nowrap  leading-4 text-center">
                  <span>{mainUserInfos.address}</span>
                </td>
                <td className=" px-8 py-4  align-middle  table-cell font-bold whitespace-nowrap  leading-4 text-center">
                  <span>{mainUserInfos.score}</span>
                </td>
                <td className=" px-8 py-4  align-middle  table-cell font-bold whitespace-nowrap  leading-4 text-center">
                  <span>
                    {new Intl.NumberFormat("en-US").format(mainUserInfos.buy)}
                    تومان
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </DetailsModal>
      )}
    </div>
  );
}
