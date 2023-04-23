import { userReducer, initialState } from "./userReducer";

describe("selectedOrderReducer reducer", () => {
  it("should return the initial state", () => {
    expect(userReducer(undefined, {} as any)).toEqual(initialState);
  });

  // it("should handle ADD_TODO", () => {
  //   expect(
  //     userReducer([], {
  //       type: types.ADD_TODO,
  //       text: "Run the tests",
  //     })
  //   ).toEqual([
  //     {
  //       text: "Run the tests",
  //       completed: false,
  //       id: 0,
  //     },
  //   ]);

  // });
});
