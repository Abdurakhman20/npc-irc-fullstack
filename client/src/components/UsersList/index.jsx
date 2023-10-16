import { useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import loadingGif from "../../assets/images/loading.gif";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const UsersList = () => {
  const [paginationPageSize, setPaginationPageSize] = useState(25);
  const [paginationCurrentPage, setPaginationCurrentPage] = useState(1);

  const columnDefs = [
    { field: "id", cellRenderer: "loading" },
    { field: "name" },
    { field: "age" },
    { field: "email" },
    { field: "role" },
  ];
  const defaultColDef = useMemo(() => ({ sortable: true, filter: true }), []);
  const datasource = {
    getRows(params) {
      console.log(JSON.stringify(params, null, 1));
      const { startRow, endRow } = params;
      const pageSize = endRow - startRow;
      const offset = startRow;
      let url = `http://localhost:3030/api/user/getAll?limit=${pageSize}&offset=${offset}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          params.successCallback(data.users, data.totalRows.count);
        })
        .catch((error) => {
          console.error(error);
          params.failCallback();
        });
    },
  };
  const onGridReady = (params) => {
    params.api.setDatasource(datasource);
  };
  const components = {
    loading: (params) => {
      if (params.value !== undefined) {
        return params.value;
      } else {
        return <img src={loadingGif} />;
      }
    },
  };
  const onPaginationPageChanged = (page) => {
    setPaginationCurrentPage(page);
  };
  return (
    <>
      <h2>USERS</h2>
      <AgGridReact
        pagination={true}
        paginationPageSize={paginationPageSize}
        paginationNumberFormatter={(params) => params.value.toLocaleString()}
        onGridReady={onGridReady}
        onPaginationChanged={onPaginationPageChanged}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        suppressScrollOnNewData={true}
        components={components}
        cacheBlockSize={10}
        rowModelType="infinite"
      />
    </>
  );
};

export default UsersList;
