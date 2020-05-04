import ticketListReducer from "../../reducers/ticket-list-reducer";
import * as c from "../../actions/ActionTypes";
import Moment from "moment";

describe("ticketListReducer", () => {
  let action;
  const currentState = {
    1: {
      names: "Ryan and Aimen",
      location: "3c",
      issue: "Redux action is not working correctly.",
      timeOpen: 0,
      id: 1,
      formattedWaitTime: new Moment().fromNow(true),
    },
    2: {
      names: "Jasmine and Justine",
      location: "2a",
      issue: "Reducer has side effects.",
      timeOpen: 0,
      id: 2,
      formattedWaitTime: new Moment().fromNow(true),
    },
  };
  const ticketData = {
    names: "Ryan and Aimen",
    location: "4b",
    issue: "Redux action is not working correctly.",
    timeOpen: 0,
    id: 1,
    formattedWaitTime: new Moment().fromNow(true),
  };

  test("Should return default state if there is no action type passed into the reducer", () => {
    expect(ticketListReducer({}, { type: null })).toEqual({});
  });

  test("Should successfully add new ticket data to masterTicketList", () => {
    const {
      formattedWaitTime,
      names,
      location,
      timeOpen,
      issue,
      id,
    } = ticketData;
    action = {
      type: "ADD_TICKET",
      names: names,
      location: location,
      issue: issue,
      timeOpen: timeOpen,
      id: id,
      formattedWaitTime: formattedWaitTime,
    };
    expect(ticketListReducer({}, action)).toEqual({
      [id]: {
        names: names,
        location: location,
        issue: issue,
        timeOpen: timeOpen,
        id: id,
        formattedWaitTime: "a few seconds",
      },
    });
  });

  test("Should successfully edit ticket data in masterTicketList", () => {
    const { location, issue, id } = ticketData;
    action = {
      type: "ADD_TICKET",
      names: "Edited names",
      location: location,
      issue: issue,
      id: id,
    };
    expect(ticketListReducer({ [id]: ticketData }, action)).toEqual({
      [id]: {
        names: "Edited names",
        location: location,
        issue: issue,
        id: id,
      },
    });
  });

  test("Should successfully delete a ticket", () => {
    action = {
      type: "DELETE_TICKET",
      id: 1,
    };
    expect(ticketListReducer(currentState, action)).toEqual({
      2: {
        names: "Jasmine and Justine",
        location: "2a",
        issue: "Reducer has side effects.",
        timeOpen: 0,
        formattedWaitTime: "a few seconds",
        id: 2,
      },
    });
  });

  test("should add a formatted wait time to ticket entry", () => {
    const { names, location, issue, timeOpen, id } = ticketData;
    action = {
      type: c.UPDATE_TIME,
      formattedWaitTime: "4 minutes",
      id: id,
    };
    expect(ticketListReducer({ [id]: ticketData }, action)).toEqual({
      [id]: {
        names: names,
        location: location,
        issue: issue,
        timeOpen: timeOpen,
        id: id,
        formattedWaitTime: "4 minutes",
      },
    });
  });
});
