import React from "react";
import NewTicketForm from "./NewTicketForm.js";
import TicketList from "./TicketList.js";
import QuestionScreen from "./QuestionScreen.js";
import TicketDetail from "./TicketDetail.js";
import EditTicketForm from "./EditTicketForm.js";

class TicketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTicketFormVisible: false,
      masterTicketList: [],
      selectedTicket: null,
      editingFormVisible: false,
    };
  }

  handleAddingNewTicketToList = (newTicket) => {
    const newMasterTicketList = this.state.masterTicketList.concat(newTicket);
    this.setState({
      masterTicketList: newMasterTicketList,
      newTicketFormVisible: false,
    });
    //this.setState({  });
  };

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.state.masterTicketList.filter(
      (ticket) => ticket.id === id
    )[0];
    this.setState({ selectedTicket: selectedTicket });
  };

  handleDeletingTicket = (id) => {
    const newMasterTicketList = this.state.masterTicketList.filter(
      (ticket) => ticket.id !== id
    );
    this.setState({
      masterTicketList: newMasterTicketList,
      selectedTicket: null,
    });
  };

  handleEditingTicketInList = (ticketToEdit) => {
    const editedMasterTicketList = this.state.masterTicketList
      .filter((ticket) => ticket.id !== this.state.selectedTicket.id)
      .concat(ticketToEdit);
    this.setState({
      masterTicketList: editedMasterTicketList,
      editingFormVisible: false,
      selectedTicket: null,
    });
  };

  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({ editingFormVisible: true });
  };

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        newTicketFormVisible: false,
        editingFormVisible: false,
        selectedTicket: null,
      });
    } else {
      this.setState((prevState) => ({
        newTicketFormVisible: !prevState.newTicketFormVisible,
      }));
    }
  };

  setVisibility = () => {
    if (this.state.editingFormVisible) {
      return {
        buttonText: "Return To Ticket List",
        component: (
          <EditTicketForm
            ticket={this.state.selectedTicket}
            onEditTicketFormSubmission={this.handleEditingTicketInList}
          />
        ),
      };
    } else if (this.state.selectedTicket != null) {
      return {
        buttonText: "Return to Ticket List",
        component: (
          <TicketDetail
            ticket={this.state.selectedTicket}
            onClickingDelete={this.handleDeletingTicket}
            onClickingEdit={this.handleEditClick}
          />
        ),
      };
    } else if (this.state.newTicketFormVisible) {
      return {
        buttonText: "Return To Ticket List",
        component: (
          <QuestionScreen
            onNewTicketFormSubmission={this.handleAddingNewTicketToList}
          />
        ),
      };
    } else {
      return {
        buttonText: "Add Ticket",
        component: (
          <TicketList
            ticketList={this.state.masterTicketList}
            onTicketSelection={this.handleChangingSelectedTicket}
          />
        ),
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
