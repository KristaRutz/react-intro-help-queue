import React from "react";
import TicketList from "./TicketList.js";
import QuestionScreen from "./QuestionScreen.js";
import TicketDetail from "./TicketDetail.js";
import EditTicketForm from "./EditTicketForm.js";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Ticket from "./Ticket.js";

class TicketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // newTicketFormVisible: false,
      selectedTicket: null,
      editingFormVisible: false,
    };
  }

  handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = this.props;
    const { id, names, location, issue } = newTicket;
    const action = {
      type: "ADD_TICKET",
      id: id,
      names: names,
      location: location,
      issue: issue,
    };
    dispatch(action);

    // REACT state taken out
    // this.setState({
    //   newTicketFormVisible: false,
    // });
    // REDUX state added below
    const action2 = {
      type: "TOGGLE_FORM",
    };
    dispatch(action2);
  };

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.props.masterTicketList[id];
    this.setState({ selectedTicket: selectedTicket });
  };

  handleDeletingTicket = (id) => {
    const { dispatch } = this.props;
    const action = {
      type: "DELETE_TICKET",
      id: id,
    };
    dispatch(action);
    this.setState({
      selectedTicket: null,
    });
  };

  handleEditingTicketInList = (ticketToEdit) => {
    const { dispatch } = this.props;
    const { id, names, location, issue } = ticketToEdit;
    const action = {
      type: "ADD_TICKET",
      id: id,
      names: names,
      location: location,
      issue: issue,
    };
    dispatch(action);
    this.setState({
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
      // REACT state taken out
      // this.setState((prevState) => ({
      //   newTicketFormVisible: !prevState.newTicketFormVisible,
      // }));
      // REDUX state added below
      const { dispatch } = this.props;
      const action = {
        type: "TOGGLE_FORM",
      };
      dispatch(action);
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
    } else if (this.props.newTicketFormVisible) {
      // changed 'this.state' to 'this.props' for Redux
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
            ticketList={this.props.masterTicketList}
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

TicketControl.propTypes = {
  masterTicketList: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    masterTicketList: state.masterTicketList,
    newTicketFormVisible: state.newTicketFormVisible,
  };
};

TicketControl = connect(mapStateToProps)(TicketControl);

export default TicketControl;
