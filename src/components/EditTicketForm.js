import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";
import { useFirestore } from "react-redux-firebase";

function EditTicketForm(props) {
  const firestore = useFirestore();
  const { ticket } = props;

  function handleEditTicketFormSubmission(event) {
    event.preventDefault();
    props.onEditTicketFormSubmission();
    const propertiesToUpdate = {
      names: event.target.names.value,
      location: event.target.location.value,
      issue: event.target.issue.value,
    };
    return firestore.update(
      { collection: "tickets", doc: ticket.id },
      propertiesToUpdate
    );
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
