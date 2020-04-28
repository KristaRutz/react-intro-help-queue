import formVisibleReducer from "../../reducer/formVisibleReducer";

describe("formVisibleReducer", () => {
  test("should return default state if no action type is recognized", () => {
    expect(formVisibleReducer(false, { type: null })).toEqual(false);
  });
});
