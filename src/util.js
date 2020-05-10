import React from "react";

const numberOfTableEntries = 5;

const isValid = (totalSlots, availableSlots) => {
  if (
    regexForNumber(totalSlots) &&
    regexForNumber(availableSlots) &&
    parseInt(availableSlots, 10) <= parseInt(totalSlots, 10)
  ) {
    return true;
  }
  return false;
};

const regexForNumber = value => {
  return /^\d+$/.test(value);
};

const invalidInput = "Invalid Input";

const carColor = [
  { value: "RED", label: "RED" },
  { value: "BLUE", label: "BLUE" },
  { value: "BLACK", label: "BLACK" },
  { value: "WHITE", label: "WHITE" },
  { value: "GREY", label: "GREY" },
  { value: "BROWN", label: "BROWN" },
  { value: "YELLOW", label: "YELLOW" }
];

const randomString = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const string_length = 2;
  let randomTwoDigitNumber = Math.floor(Math.random() * 20 + 40);
  let randomstring = "KA-" + randomTwoDigitNumber + "-";
  for (let i = 0; i < string_length; i++) {
    let rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
  }
  let randomFourDigitNumber = Math.floor(Math.random() * 8999 + 1000);
  randomstring += "-" + randomFourDigitNumber;

  return randomstring;
};

const carColorArray = carColor => {
  return carColor.map(val => val.label);
};

const getSlotNo = slotArray => {
  let randomSlot = Math.floor(Math.random() * 50 + 1);
  if (slotArray.length === 50 || slotArray.indexOf(randomSlot) === -1)
    return randomSlot;
  return getSlotNo(slotArray);
};
const getDate = () => {
  return Math.floor(Math.random() * 30 + 1) + " May 2019, 3:29 PM";
};
const carInfo = () => {
  const carArrayOfObject = [];
  const slotArray = [];
  const colorArray = carColorArray(carColor);
  for (let i = 1; i <= numberOfTableEntries; i++) {
    slotArray.push(getSlotNo(slotArray));
    carArrayOfObject.push({
      id: i,
      carNo: randomString(),
      color: colorArray[Math.floor(Math.random() * colorArray.length)],
      slotNo: slotArray[slotArray.length - 1],
      date: getDate()
    });
  }
  return carArrayOfObject;
};

const carAttributes = carInfo();
// const carAttributes = [
//   {
//     id: 1,
//     carNo: "KA-46-MP-9127",
//     color: "Grey",
//     slotNo: 4,
//     date: "4 May 2019, 3:29 PM"
//   },
//   {
//     id: 2,
//     carNo: "KA-46-AO-9127",
//     color: "Grey",
//     slotNo: 3,
//     date: "4 May 2019, 3:29 PM"
//   },
//   {
//     id: 3,
//     carNo: "KA-46-MP-0127",
//     color: "White",
//     slotNo: 2,
//     date: "4 May 2019, 3:29 PM"
//   },
//   {
//     id: 4,
//     carNo: "KA-46-SJ-9127",
//     color: "Blue",
//     slotNo: 1,
//     date: "4 May 2019, 3:29 PM"
//   },
//   {
//     id: 5,
//     carNo: "KA-41-MP-9127",
//     color: "Brown",
//     slotNo: 5,
//     date: "4 May 2019, 3:29 PM"
//   }
// ];
const sortCarNoData = (data, name) => {
  data.sort((a, b) => {
    if (
      parseInt(a.carNo[3] + a.carNo[4], 10) <
      parseInt(b.carNo[3] + b.carNo[4], 10)
    ) {
      if (name === "des") return 1;
      return -1;
    } else if (
      parseInt(a.carNo[3] + a.carNo[4], 10) >
      parseInt(b.carNo[3] + b.carNo[4], 10)
    ) {
      if (name === "des") return -1;
      return 1;
    }

    if (a.carNo[6] + a.carNo[7] < b.carNo[6] + b.carNo[7]) {
      if (name === "des") return 1;
      return -1;
    } else if (a.carNo[6] + a.carNo[7] > b.carNo[6] + b.carNo[7]) {
      if (name === "des") return -1;
      return 1;
    }

    const x = a.carNo[9] + a.carNo[10] + a.carNo[11] + a.carNo[12];
    const y = b.carNo[9] + b.carNo[10] + b.carNo[11] + b.carNo[12];

    if (parseInt(x, 10) < parseInt(y, 10)) {
      if (name === "des") return 1;
      return -1;
    } else if (parseInt(x, 10) > parseInt(y, 10)) {
      if (name === "des") return -1;
      return 1;
    }

    return 0;
  });
};

const sortColorData = (data, name) => {
  data.sort((a, b) => {
    if (a.color < b.color) {
      if (name === "des") return 1;
      return -1;
    } else if (a.color > b.color) {
      if (name === "des") return -1;
      return 1;
    }
    return 0;
  });
};

const sortSlotNoData = (data, name) => {
  data.sort((a, b) => {
    if (parseInt(a.slotNo, 10) < parseInt(b.slotNo, 10)) {
      if (name === "des") return 1;
      return -1;
    } else if (parseInt(a.slotNo, 10) > parseInt(b.slotNo, 10)) {
      if (name === "des") return -1;
      return 1;
    }
    return 0;
  });
};

const sortDateData = (data, name) => {};

const renderTableHeader = (data, handleSortUp) => {
  let header = Object.keys(data[0]);
  const tableHeader = header.map((value, index) => {
    let key = "header" + index;
    let mainEle;
    if (value === "id") mainEle = <th>#</th>;
    else if (
      value === "carNo" ||
      value === "color" ||
      value === "slotNo" ||
      value === "date"
    ) {
      let ele;
      if (value === "carNo") {
        ele = "Car No.";
      } else if (value === "slotNo") {
        ele = "Slot No.";
      } else if (value === "color") {
        ele = "Color";
      } else if (value === "date") {
        ele = "Date Time";
      }
      mainEle = (
        <th>
          <div className="sortHeader">
            <div style={{ marginRight: "5px" }}>{ele}</div>
            <button
              id={key}
              name="asc"
              onClick={event => handleSortUp(event)}
              className="sortButton"
            >
              &uarr;
            </button>
            <button
              id={key}
              name="des"
              onClick={event => handleSortUp(event)}
              className="sortButton"
            >
              &darr;
            </button>
          </div>
        </th>
      );
    }
    return mainEle;
  });
  tableHeader.push(<th />);
  return tableHeader;
};

const renderTableData = (data, handleRemove) => {
  const tableData = data.map((car, index) => {
    const { id, carNo, color, slotNo, date } = car; //destructuring
    return (
      <tr>
        <td>{id}</td>
        <td>{carNo}</td>
        <td>{color}</td>
        <td>{slotNo}</td>
        <td>{date}</td>
        <td>
          <button name={index} onClick={handleRemove}>
            Remove
          </button>
        </td>
      </tr>
    );
  });
  return tableData;
};

const showQueryData = data => {
  alert("Total amount collected is " + data);
};
const regexForAlphabets = /^[A-Za-z]+$/;

const isValidModalEntry = (licenseNo, newColor) => {
  if (licenseNo && licenseNo.length === 0 && newColor && newColor.length === 0)
    return true;
  if (
    licenseNo &&
    licenseNo.length === 13 &&
    newColor.length &&
    regexForAlphabets.test(newColor)
  ) {
    let i;
    const n = licenseNo.length;
    for (i = 0; i < n; i++) {
      while (i < 2 || (i > 5 && i < 8)) {
        if (!regexForAlphabets.test(licenseNo[i])) return false;
        i++;
      }
      if ((i === 2 || i === 5 || i === 8) && licenseNo[i] !== "-") return false;
      while ((i > 2 && i < 5) || (i > 8 && i < 13)) {
        if (!regexForNumber(licenseNo[i])) return false;
        i++;
      }
    }
    if (i === 14) return true;
  }
  return false;
};

export {
  isValid,
  invalidInput,
  carColor,
  carInfo,
  renderTableHeader,
  renderTableData,
  carAttributes,
  sortCarNoData,
  sortColorData,
  sortDateData,
  sortSlotNoData,
  showQueryData,
  isValidModalEntry,
  getSlotNo,
  getDate
};
