import React from "react";
import "./styles.css";
import InitialPage from "./InitialPage";
import LandingPage from "./LandingPage";
import { isValid, invalidInput } from "./util";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSlots: 0,
      availableSlots: 0,
      submitted: false,
      error: ""
    };
  }

  handleSubmit = event => {
    const { totalSlots, availableSlots } = this.state;
    this.setState(() =>
      isValid(totalSlots, availableSlots)
        ? {
            submitted: true,
            error: ""
          }
        : {
            submitted: false,
            error: invalidInput
          }
    );
    event.preventDefault();
  };

  handleParkedPlaces = event => {
    //console.log(event.target.value);
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    return (
      // <>
      //   {!this.state.submitted ? (
      //     <InitialPage
      //       totalSlots={this.state.totalSlots}
      //       availableSlots={this.state.availableSlots}
      //       handleSubmit={this.handleSubmit}
      //       handleParkedPlaces={this.handleParkedPlaces}
      //       error={this.state.error}
      //     />
      //   ) : (
      //     <LandingPage
      //       totalSlots={this.state.totalSlots}
      //       availableSlots={this.state.availableSlots}
      //     />
      //   )}
      // </>

      <LandingPage
        totalSlots={this.state.totalSlots}
        availableSlots={this.state.availableSlots}
      />
    );
  }
}
