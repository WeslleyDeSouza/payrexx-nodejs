import { getApiKey, getInstanceName } from "./helper";

describe("Transaction", () => {
  it("should have the env setup", () => {
    // see ".env.default" if this test fails
    expect(getInstanceName()).toBeDefined();
    expect(getApiKey()).toBeDefined();
  });

  // todo: write tests for transaction
});
