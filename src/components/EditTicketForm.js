import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";

function EditTicketForm(props) {
  const { ticket } = props;

  function handleEditTicketFormSubmission(event) {
    event.preventDefault();
    props.onEditTicketFormSubmission({
      names: event.target.names.value,
      location: event.target.location.value,
      issue: event.target.issue.value,
      id: ticket.id,
    });
  }

  return (
    <React.Fragment>
      <h3>Edit a ticket</h3>
      <ReusableForm
        handleFormSubmission={handleEditTicketFormSubmission}
        buttonText="Update"
      />
    </React.Fragment>
  );
}

EditTicketForm.propTypes = {
  ticket: PropTypes.object,
  onEditTicketFormSubmission: PropTypes.func,
};

export default EditTicketForm;
