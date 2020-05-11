import React from "react";
import { renderTableData, renderTableHeader } from "./util";

const TableElement = props => {
  const { data, handleSort, handleRemove, shouldRowBeHide } = props;
  const rows = renderTableData(data, handleRemove, shouldRowBeHide);

  return (
    <div className="table">
      {rows && rows.length ? (
        <table className="car">
          <tbody>
            <tr>{renderTableHeader(data, handleSort)}</tr>
            {rows}
          </tbody>
        </table>
      ) : (
        <div>
          <h1>No car entries to display</h1>
          <h3>Please park a new car</h3>
        </div>
      )}
    </div>
  );
};
export default TableElement;
