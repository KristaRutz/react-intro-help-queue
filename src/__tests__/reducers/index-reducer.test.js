import rootReducer from "../../reducers/index";
import { createStore } from "redux";
import formVisibleReducer from "../../reducers/form-visible-reducer";
import ticketListReducer from "../../reducers/ticket-list-reducer";

let store = createStore(rootReducer);

describe("rootReducer", () => {
  test("Should return default state if no action type is recognized", () => {
    expect(rootReducer({}, { type: null })).toEqual({
      masterTicketList: {},
      newTicketFormVisible: false,
    });
  });

  test("Check that the initial state of ticketListReducers matches root reducer", () => {
    expect(store.getState().masterTicketList).toEqual(
      ticketListReducer(undefined, { type: null })
    );
  });

  test("Check that initial state of formVisibleReducer matches root reducer", () => {
    expect(store.getState().newTicketFormVisible).toEqual(
      formVisibleReducer(undefined, { type: null })
    );
  });

  test("Check that the updated state of ticketListReducers matches root reducer", () => {
    const action = {
      type: "ADD_TICKET",
      names: "Ryan & Aimen",
      location: "4b",
      issue: "Redux action is not working correctly.",
      id: 1,
    };
    store.dispatch(action);
    expect(store.getState().masterTicketList).toEqual(
      ticketListReducer(undefined, action)
    );
  });

  test("Check that the updated state of formVisibleReducer matches root reducer", () => {
    const action = {
      type: "TOGGLE_FORM",
    };
    store.dispatch(action);
    expect(store.getState().newTicketFormVisible).toEqual(
      formVisibleReducer(undefined, action)
    );
  });
});
