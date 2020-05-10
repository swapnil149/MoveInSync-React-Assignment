import React from "react";
import { renderTableData, renderTableHeader } from "./util";

// class TableElement extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: carAttributes
//     };
//   }

//   handleRemove = event => {
//     const data = this.state.data;
//     const index = event.target.name;
//     data.splice(index, 1);
//     data.forEach((val, index) => (val.id = index + 1));
//     this.props.handleQueryData();
//     this.setState({ data });
//   };

//   handleSort = event => {
//     const data = this.state.data;
//     const name = event.target.name;
//     const key = event.target.id;
//     if (key === "header1") {
//       sortCarNoData(data, name);
//     } else if (key === "header2") {
//       sortColorData(data, name);
//     } else if (key === "header3") {
//       sortSlotNoData(data, name);
//     } else if (key === "header4") {
//       sortDateData(data, name);
//     }
//     this.setState({ data });
//   };

//   createNewEntry(licenseNo, newColor) {
//     const data = this.state.data;
//     const slotArray = data.map(val => val.slotNo);
//     console.log(slotArray);
//   }
//   render() {
//     return (
//       <div className="table">
//         <table className="car">
//           <tbody>
//             <tr>{renderTableHeader(data, handleSort)}</tr>
//             {renderTableData(data, handleRemove)}
//           </tbody>
//         </table>
//       </div>
//     );
//   }
// }

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
        <h1>No car entries to display</h1>
      )}
    </div>
  );
};
export default TableElement;
