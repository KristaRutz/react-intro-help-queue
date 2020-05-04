import React from "react";
import { v4 } from "uuid";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";
import Moment from "moment";

function NewTicketForm(props) {
  function handleNewTicketFormSubmission(event) {
    event.preventDefault();
    props.onNewTicketFormSubmission({
      names: event.target.names.value,
      location: event.target.location.value,
      issue: event.target.issue.value,
      timeOpen: new Moment(),
      formattedWaitTime: new Moment().fromNow(true),
      id: v4(),
    });
  }

  return (
    <React.Fragment>
      <h3>Add a new ticket</h3>
      <ReusableForm
        handleFormSubmission={handleNewTicketFormSubmission}
        buttonText="Help!"
      />
    </React.Fragment>
  );
}

NewTicketForm.propTypes = {
  onNewTicketFormSubmission: PropTypes.func,
};

export default NewTicketForm;
