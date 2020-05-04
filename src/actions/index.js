import * as c from "./ActionTypes";

export const deleteTicket = (id) => ({
  type: c.DELETE_TICKET,
  id,
});
export const toggleForm = () => ({
  type: "TOGGLE_FORM",
});
export const updateTime = (id, formattedWaitTime) => ({
  type: c.UPDATE_TIME,
  id,
  formattedWaitTime,
});
