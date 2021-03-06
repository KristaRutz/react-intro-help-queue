import * as a from "../../actions";
import * as c from "../../actions/ActionTypes";

describe("help queue actions", () => {
  it("deleteTicket should create DELETE_TICKET action", () => {
    expect(a.deleteTicket(1)).toEqual({
      type: "DELETE_TICKET",
      id: 1,
    });
  });

  it("toggleFrom should create TOGGLE_FORM action", () => {
    expect(a.toggleForm()).toEqual({
      type: "TOGGLE_FORM",
    });
  });

  it("updateTime should create UPDATE_TIME action", () => {
    expect(a.updateTime(1, "A few seconds")).toEqual({
      type: c.UPDATE_TIME,
      id: 1,
      formattedWaitTime: "A few seconds",
    });
  });
});
