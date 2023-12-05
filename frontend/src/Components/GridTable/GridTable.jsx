import React from "react";
import { DataGrid } from "@mui/x-data-grid";
export default function GridTable({ rowData, columnData }) {
  return (
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
      rows={rowData}
      columns={columnData}
      className="bg-grayColor"
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
      }}
      checkboxSelection
      disableRowSelectionOnClick
    ></DataGrid>
  );
}
