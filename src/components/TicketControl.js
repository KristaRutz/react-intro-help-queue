import React from "react";
import NewTicketForm from "./NewTicketForm.js";
import TicketList from "./TicketList.js";

class TicketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
    };
  }

  handleClick = () => {
    this.setState((prevState) => ({
      formVisibleOnPage: !prevState.formVisibleOnPage,
    }));
  };

  setVisibility = () => {
    if (this.state.formVisibleOnPage) {
      return {
        buttonText: "Return To Ticket List",
        component: <NewTicketForm />,
      };
    } else {
      return {
        buttonText: "Add Ticket",
        component: <TicketList />,
      };
    }
  };

  render() {
    let currentlyVisibleState = this.setVisibility();
    return (
      <React.Fragment>
        {currentlyVisibleState.component}
        <button onClick={this.handleClick}>
          {currentlyVisibleState.buttonText}
        </button>
      </React.Fragment>
    );
  }
}

export default TicketControl;
