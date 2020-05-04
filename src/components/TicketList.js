import React from "react";
import Ticket from "./Ticket";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";

/* Seed Data */
const masterTicketList = [
  {
    names: "Thato and Haley",
    location: "3A",
    issue: "Firebase won't save record. Halp.",
  },
  {
    names: "Sleater and Kinney",
    location: "4B",
    issue: "Prop types are throwing an error.",
  },
  {
    names: "Imani & Jacob",
    location: "9F",
    issue: "Child component isn't rendering.",
  },
];

function TicketList(props) {
  useFirestoreConnect([{ collection: "tickets" }]);
  const tickets = useSelector((state) => state.firestore.ordered.tickets);

  if (isLoaded(tickets)) {
    return (
      <React.Fragment>
        <hr />
        {tickets.map((ticket) => {
          return (
            <Ticket
              whenTicketClicked={props.onTicketSelection}
              names={ticket.names}
              location={ticket.location}
              issue={ticket.issue}
              formattedWaitTime={ticket.formattedWaitTime}
              id={ticket.id}
              key={ticket.id}
            />
          );
        })}
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <h3>Loading...</h3>
      </React.Fragment>
    );
  }
}

TicketList.propTypes = {
  onTicketSelection: PropTypes.func,
};

export default TicketList;
