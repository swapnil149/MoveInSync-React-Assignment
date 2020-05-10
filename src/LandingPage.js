import React from "react";
import {
  carColor,
  invalidInput,
  showQueryData,
  isValidModalEntry,
  carAttributes,
  sortCarNoData,
  sortColorData,
  sortSlotNoData,
  sortDateData,
  getSlotNo,
  getDate
} from "./util";
import TableElement from "./TableElement";
import Modal from "./Modal";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryData: 0,
      show: false,
      errorInModal: "",
      data: carAttributes,
      carColor: carColor,
      filterStr: "",
      filteredData: null,
      selectColorFilter: "",
      searchFlag: false,
      resetFlag: false
    };
  }
  handleRemove = event => {
    const data = this.state.data;
    const index = event.target.name;
    data.splice(index, 1);
    this.handleQueryData();
    this.setState({ data });
  };

  handleSort = event => {
    const data = this.state.data;
    const name = event.target.name;
    const key = event.target.id;
    if (key === "header1") {
      sortCarNoData(data, name);
    } else if (key === "header2") {
      sortColorData(data, name);
    } else if (key === "header3") {
      sortSlotNoData(data, name);
    } else if (key === "header4") {
      sortDateData(data, name);
    }
    this.setState({ data });
  };

  showModal = () => {
    this.setState({ show: true });
  };

  closeModalWithValidation = (licenseNo, newColor) => {
    const data = this.state.data;
    const slotArray = data.map(val => val.slotNo);
    const newSlotNo = getSlotNo(slotArray);
    const carColor = this.state.carColor;
    const objColor = { value: newColor, label: newColor };
    if (carColor.indexOf(objColor) !== -1) {
      carColor.push(objColor);
    }
    const obj = {
      id: data.length + 1,
      carNo: licenseNo,
      color: newColor,
      slotNo: newSlotNo,
      date: getDate()
    };
    data.push(obj);
    this.setState(() =>
      isValidModalEntry(licenseNo, newColor)
        ? {
            show: false,
            errorInModal: "",
            carColor,
            data
          }
        : {
            show: true,
            errorInModal: invalidInput
          }
    );
  };

  handleQueryData = () => {
    this.setState(prevState => ({ queryData: prevState.queryData + 20 }));
  };

  handleFilterChange = e => {
    this.setState({
      filterStr: e.target.value,
      searchFlag: false,
      resetFlag: false
    });
  };

  handleSelectColor = e => {
    console.log(e.target.value);
    this.setState({
      selectColorFilter: e.target.value,
      searchFlag: false,
      resetFlag: false
    });
  };

  handleSearch = () => {
    this.setState({ searchFlag: true, resetFlag: false });
  };

  handleReset = () => {
    this.setState({
      resetFlag: true,
      searchFlag: false,
      selectColorFilter: "",
      filterStr: ""
    });
  };

  render() {
    const {
      queryData,
      show,
      errorInModal,
      filterStr,
      selectColorFilter
    } = this.state;
    //debugger;
    const data = !this.state.resetFlag
      ? this.state.searchFlag
        ? this.state.data.filter(obj => {
            if (
              filterStr &&
              selectColorFilter &&
              filterStr.length &&
              selectColorFilter.length
            )
              return (
                obj.carNo.includes(this.state.filterStr.toUpperCase()) &&
                obj.color === selectColorFilter
              );
            else if (filterStr && filterStr.length)
              return obj.carNo.includes(this.state.filterStr.toUpperCase());
            else if (selectColorFilter && selectColorFilter.length)
              return obj.color === selectColorFilter;
            return true;
          })
        : this.state.data
      : this.state.data;
    // let data = [];
    // if (this.state.searchFlag) {
    //   data = this.state.data.filter(obj => {
    //     if (
    //       filterStr &&
    //       selectColorFilter &&
    //       filterStr.length &&
    //       selectColorFilter.length
    //     )
    //       return (
    //         obj.carNo.includes(this.state.filterStr.toUpperCase()) &&
    //         obj.color === selectColorFilter
    //       );
    //     else if (filterStr && filterStr.length)
    //       return obj.carNo.includes(this.state.filterStr.toUpperCase());
    //     else if (selectColorFilter && selectColorFilter.length)
    //       return obj.color === selectColorFilter;
    //     return true;
    //   });
    // } else if (!(selectColorFilter && selectColorFilter.length)) {
    //   data = this.state.data;
    // }
    const { totalSlots, availableSlots } = this.props;
    return (
      <>
        <div className="App">
          <div className="header">Automated Parking Lot System</div>
          <div className="main">
            <div className="flexInner1">
              <div>Total Parking Slots : {totalSlots}</div>
              <div className="flexDoubleInner">
                <button onClick={() => showQueryData(queryData)}>
                  Query Data
                </button>
                <button onClick={this.showModal}>Park a Car</button>
              </div>
            </div>
            {show ? (
              <Modal
                closeModalWithValidation={this.closeModalWithValidation}
                errorInModal={errorInModal}
              />
            ) : null}
            <div>Available Parking slots: {totalSlots - availableSlots}</div>
            <div className="flexInner3">
              <div>
                <input
                  name="carNo"
                  value={filterStr}
                  placeholder="TYPE REG NO."
                  type="text"
                  onChange={this.handleFilterChange}
                />
              </div>
              <div>
                <select
                  value={selectColorFilter}
                  onChange={this.handleSelectColor}
                >
                  <option value="" selected disabled hidden>
                    Choose Color
                  </option>
                  {carColor.map(obj => (
                    <option key={obj.value} value={obj.value}>
                      {obj.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <button onClick={this.handleSearch}>Search</button>
              </div>
              <div>
                <button onClick={this.handleReset}>Reset</button>
              </div>
            </div>
            <TableElement
              handleQueryData={this.handleQueryData}
              data={data}
              handleRemove={this.handleRemove}
              handleSort={this.handleSort}
            />
          </div>
        </div>
      </>
    );
  }
}

export default LandingPage;
