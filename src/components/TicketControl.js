import React from "react";
import TicketList from "./TicketList.js";
import QuestionScreen from "./QuestionScreen.js";
import TicketDetail from "./TicketDetail.js";
import EditTicketForm from "./EditTicketForm.js";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Ticket from "./Ticket.js";
import * as a from "../actions";
import * as c from "../actions/ActionTypes";
import { withFirestore, isLoaded } from "react-redux-firebase";

class TicketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // newTicketFormVisible: false,
      selectedTicket: null,
      editingFormVisible: false,
    };
  }

  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(
      () => this.updateTicketElapsedWaitTime(),
      60000
    );
  }

  componentWillUnmount() {
    clearInterval(this.waitTimeUpdateTimer);
  }

  updateTicketElapsedWaitTime = () => {
    const { dispatch } = this.props;
    Object.values(this.props.masterTicketList).forEach((ticket) => {
      const newFormattedWaitTime = ticket.timeOpen.fromNow(true);
      const action = a.updateTime(ticket.id, newFormattedWaitTime);
      dispatch(action);
    });
  };

  handleAddingNewTicketToList = () => {
    const { dispatch } = this.props;
    const action = a.toggleForm();
    dispatch(action);
  };

  handleChangingSelectedTicket = (id) => {
    this.props.firestore
      .get({ collection: "tickets", doc: id })
      .then((ticket) => {
        const firestoreTicket = {
          names: ticket.get("names"),
          location: ticket.get("location"),
          issue: ticket.get("issue"),
          id: ticket.id,
        };
        this.setState({ selectedTicket: firestoreTicket });
      });
  };

  handleDeletingTicket = (id) => {
    this.props.firestore.delete({ collection: "tickets", doc: id });
    this.setState({
      selectedTicket: null,
    });
  };

  handleEditingTicketInList = () => {
    this.setState({
      editingFormVisible: false,
      selectedTicket: null,
    });
  };

  handleEditClick = () => {
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
    const auth = this.props.firebase.auth();
    if (!isLoaded(auth)) {
      return (
        <>
          <h1>Loading...</h1>
        </>
      );
    }
    if (isLoaded(auth) && auth.currentUser == null) {
      return (
        <React.Fragment>
          <h1>You must be signed in to access the queue.</h1>
        </React.Fragment>
      );
    }
    if (isLoaded(auth) && auth.currentUser != null) {
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
}

TicketControl.propTypes = {
  masterTicketList: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    newTicketFormVisible: state.newTicketFormVisible,
  };
};

TicketControl = connect(mapStateToProps)(TicketControl);

export default withFirestore(TicketControl);
