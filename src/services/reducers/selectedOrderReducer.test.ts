import { selectedOrderReducer, initialState } from "./selectedOrderReducer";

describe("selectedOrderReducer reducer", () => {
  it("should return the initial state", () => {
    expect(selectedOrderReducer(undefined, {} as any)).toEqual(initialState);
  });

  // it("should handle ADD_TODO", () => {
  //   expect(
  //     selectedOrderReducer([], {
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
