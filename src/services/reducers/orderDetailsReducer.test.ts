import { orderDetailsReducer, initialState } from "./orderDetailsReducer";

describe("orderDetailsReducer reducer", () => {
  it("should return the initial state", () => {
    expect(orderDetailsReducer(undefined, {} as any)).toEqual(initialState);
  });

  // it("should handle ADD_TODO", () => {
  //   expect(
  //     ingredientsForBurgerReducer([], {
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
