import React from "react";
import { v4 } from "uuid";

function NewTicketForm(props) {
  return (
    <React.Fragment>
      <h3>Add a new ticket</h3>
      <form onSubmit={handleNewTicketFormSubmission}>
        <input type="text" name="names" placeholder="Pair Name" />
        <input type="text" name="location" placeholder="Location" />
        <textarea name="issue" placeholder="Describe your issue." />
        <button type="submit">Help!</button>
      </form>
    </React.Fragment>
  );
}

export default NewTicketForm;
