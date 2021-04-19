import Result from "./Result";

describe("Result", () => {
  test("can create success result", () => {
    const val = "I am success";
    const result = Result.Success(val);

    expect(result.success).toEqual(true);
    expect(result.value).toEqual(val);
    expect(result.errors).toEqual([]);
    expect(result.code).toEqual(200);
  });

  test("can create error result", () => {
    const result = Result.Error("Error occured");

    expect(result.success).toEqual(false);
    expect(result.value).toEqual(undefined);
    expect(result.errors.length).toEqual(1);
    expect(result.errors[0]).toEqual("Error occured");
    expect(result.code).toEqual(500);
  });

  test("can accept array of error messages", () => {
    const result = Result.Error(["Error1", "Error2"]);

    expect(result.errors.length).toEqual(2);
    expect(result.errors[1]).toEqual("Error2");
  });
});
