import * as c from "./ActionTypes";

export const addTicket = (ticket) => {
  const { names, location, issue, id, timeOpen, formattedWaitTime } = ticket;
  return {
    type: "ADD_TICKET",
    names: names,
    location: location,
    issue: issue,
    timeOpen: timeOpen,
    formattedWaitTime: formattedWaitTime,
    id: id,
  };
};
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
