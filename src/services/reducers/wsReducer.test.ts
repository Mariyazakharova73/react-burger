import { wsReducer, initialState } from "./wsReducer";

describe("wsReducer reducer", () => {
  it("should return the initial state", () => {
    expect(wsReducer(undefined, {} as any)).toEqual(initialState);
  });

  // it("should handle ADD_TODO", () => {
  //   expect(
  //     wsReducer([], {
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
