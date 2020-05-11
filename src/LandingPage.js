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
  getSlotNo,
  getDate
} from "./util";
import TableElement from "./TableElement";
import Modal from "./Modal";
import update from "react-addons-update";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryData: 0,
      show: false,
      errorInModal: "",
      data: carAttributes(this.props.totalSlots, this.props.carsParked),
      carColor: carColor,
      filterStr: "",
      filteredData: null,
      selectColorFilter: "",
      shouldRowBeHide: {},
      carsParked: this.props.carsParked
    };
  }
  handleRemove = event => {
    const data = this.state.data;
    const index = event.target.name;
    data.splice(index, 1);
    this.handleQueryData();
    this.setState({ data, carsParked: this.state.carsParked - 1 });
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
      sortSlotNoData(data, name, "slotNo");
    } else if (key === "header4") {
      sortSlotNoData(data, name, "date");
    }
    this.setState({ data });
  };

  showModal = () => {
    this.setState({ show: true });
  };
  closeModal = () => {
    this.setState({ show: false, errorInModal: "" });
  };
  createModalWithValidation = (licenseNo, newColor) => {
    const slotArray = this.state.data.map(val => val.slotNo);
    const newSlotNo = getSlotNo(slotArray, this.props.totalSlots);
    const objColor = { value: newColor, label: newColor };
    let carColor;
    if (this.state.carColor.indexOf(objColor) === -1) {
      carColor = update(this.state.carColor, { $push: [objColor] });
    }

    const newCarNoArray = this.state.data.map(val => val.carNo);
    const obj = {
      id: this.state.data.length + 1,
      carNo: licenseNo,
      color: newColor,
      slotNo: newSlotNo,
      date: getDate()
    };

    const data = update(this.state.data, { $push: [obj] });
    if (
      isValidModalEntry(licenseNo, newColor) &&
      newCarNoArray.indexOf(licenseNo) === -1
    ) {
      this.setState({
        errorInModal: "",
        carColor: carColor,
        carsParked: this.state.data.length + 1,
        data
      });
    } else {
      this.setState({ errorInModal: invalidInput, data: this.state.data });
    }
  };

  handleQueryData = () => {
    this.setState(prevState => ({ queryData: prevState.queryData + 20 }));
  };

  handleFilterChange = e => {
    this.setState({
      filterStr: e.target.value
    });
  };

  handleSelectColor = e => {
    this.setState({
      selectColorFilter: e.target.value
    });
  };

  handleSearch = () => {
    const { filterStr, selectColorFilter, data } = this.state;

    const shouldRowBeHide = {};
    data.forEach((obj, index) => {
      if (
        filterStr &&
        selectColorFilter &&
        filterStr.length &&
        selectColorFilter.length
      ) {
        shouldRowBeHide[index] =
          obj.carNo.includes(this.state.filterStr.toUpperCase()) &&
          obj.color === selectColorFilter;
        shouldRowBeHide[index] = !shouldRowBeHide[index];
      } else if (filterStr && filterStr.length) {
        shouldRowBeHide[index] = obj.carNo.includes(
          this.state.filterStr.toUpperCase()
        );
        shouldRowBeHide[index] = !shouldRowBeHide[index];
      } else if (selectColorFilter && selectColorFilter.length) {
        shouldRowBeHide[index] = obj.color === selectColorFilter;
        shouldRowBeHide[index] = !shouldRowBeHide[index];
      } else {
        shouldRowBeHide[index] = true;
        shouldRowBeHide[index] = !shouldRowBeHide[index];
      }
    });

    this.setState({ shouldRowBeHide });
  };

  handleReset = () => {
    this.setState({
      selectColorFilter: "",
      filterStr: "",
      shouldRowBeHide: {}
    });
  };

  render() {
    const {
      queryData,
      show,
      errorInModal,
      filterStr,
      selectColorFilter,
      shouldRowBeHide,
      data,
      carsParked,
      carColor
    } = this.state;

    const { totalSlots } = this.props;
    return (
      <>
        <div className="App">
          <div className="header">Automated Parking Lot System</div>
          <div className="main">
            <div className="flexInner1">
              <div className="numberValue">
                <div style={{ marginRight: "5px" }}>Total Parking Slots :</div>
                <div style={{ color: "red" }}>{totalSlots}</div>
              </div>
              <div className="flexDoubleInner">
                <button
                  className="queryData"
                  onClick={() => showQueryData(queryData)}
                >
                  Query Data
                </button>
                <button className="parkACar" onClick={this.showModal}>
                  Park a Car
                </button>
              </div>
            </div>
            {show ? (
              <Modal
                createModalWithValidation={this.createModalWithValidation}
                errorInModal={errorInModal}
                availableSlots={totalSlots - carsParked}
                closeModal={this.closeModal}
              />
            ) : null}
            <div className="numberValue">
              <div style={{ marginRight: "5px" }}>Available Parking slots:</div>
              <div style={{ color: "red" }}>{totalSlots - carsParked}</div>
            </div>

            <div className="flexInner3">
              <input
                className="regNo"
                name="carNo"
                value={filterStr}
                placeholder="TYPE REG NO."
                type="text"
                onChange={this.handleFilterChange}
              />
              <select
                className="colorSelector"
                value={selectColorFilter}
                onChange={this.handleSelectColor}
              >
                <option value="" disabled hidden>
                  Choose Color
                </option>
                {carColor.map(obj => (
                  <option key={obj.value} value={obj.value}>
                    {obj.label}
                  </option>
                ))}
              </select>
              <button className="search" onClick={this.handleSearch}>
                Search
              </button>
              <button className="reset" onClick={this.handleReset}>
                Reset
              </button>
            </div>
            <TableElement
              handleQueryData={this.handleQueryData}
              data={data}
              handleRemove={this.handleRemove}
              handleSort={this.handleSort}
              shouldRowBeHide={shouldRowBeHide}
            />
          </div>
        </div>
      </>
    );
  }
}

export default LandingPage;
