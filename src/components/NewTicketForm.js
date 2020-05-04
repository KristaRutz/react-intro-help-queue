import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";
import { useFirestore } from "react-redux-firebase";

function NewTicketForm(props) {
  const firestore = useFirestore();

  function addTicketToFirestore(event) {
    event.preventDefault();
    props.onNewTicketFormSubmission();

    return firestore.collection("tickets").add({
      names: event.target.names.value,
      location: event.target.location.value,
      issue: event.target.issue.value,
      timeOpen: firestore.FieldValue.serverTimestamp(),
    });
  }

  return (
    <React.Fragment>
      <h3>Add a new ticket</h3>
      <ReusableForm
        handleFormSubmission={addTicketToFirestore}
        buttonText="Help!"
      />
    </React.Fragment>
  );
}

NewTicketForm.propTypes = {
  onNewTicketFormSubmission: PropTypes.func,
};

export default NewTicketForm;
