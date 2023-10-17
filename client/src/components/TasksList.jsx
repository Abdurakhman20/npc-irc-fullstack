import { useState, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import loadingGif from "../assets/images/loading.gif";
import NewTaskForm from "../components/NewTaskForm";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Button from "./UI/Button";

const TasksList = () => {
  const gridRef = useRef();
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [paginationPageSize, setPaginationPageSize] = useState(25);
  const [paginationCurrentPage, setPaginationCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const columnDefs = [
    {
      field: "id",
      cellRenderer: "loading",
    },
    { field: "title" },
    { field: "description" },
    { field: "status" },
    { field: "end_date" },
    { field: "user_id" },
  ];

  const defaultColDef = useMemo(() => ({ sortable: true, filter: true }), []);

  const datasource = {
    getRows(params) {
      //console.log(JSON.stringify(params, null, 1));
      const { startRow, endRow } = params;
      const pageSize = endRow - startRow;
      const offset = startRow;
      let url = `http://localhost:3030/api/task/getAll?limit=${pageSize}&offset=${offset}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          params.successCallback(data.tasks, data.totalRows.count);
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

  const onPaginationPageChanged = (page) => {
    setPaginationCurrentPage(page);
  };

  const onRowSelected = (params) => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    const { id } = selectedRows[0];
    setSelectedTaskId(id);
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
  const deleteSelectedTask = async () => {
    if (!selectedTaskId) {
      alert("Select task please!");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3030/api/task/delete/${selectedTaskId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      console.log(data);
      alert("The task was successfully deleted!");
      gridRef.current.api.refreshInfiniteCache();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <h2>All Tasks</h2>
      <div className="buttons">
        <Button
          onClick={() => {
            setIsFormOpen(!isFormOpen);
            setIsUpdate(false);
          }}
        >
          Add
        </Button>
        <Button
          onClick={() => {
            setIsFormOpen(!isFormOpen);
            setIsUpdate(true);
          }}
        >
          Update
        </Button>
        <Button onClick={deleteSelectedTask}>Delete</Button>
      </div>
      {isFormOpen && (
        <NewTaskForm
          formType={isUpdate ? "update" : "create"}
          isOpen={isFormOpen}
          setIsOpen={setIsFormOpen}
          gridRef={gridRef}
        />
      )}
      <AgGridReact
        ref={gridRef}
        rowSelection={"single"}
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
        onRowSelected={onRowSelected}
        rowModelType="infinite"
      />
    </>
  );
};

export default TasksList;
