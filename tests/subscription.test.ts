import { getApiKey, getInstanceName } from "./helper";
import PayRexx from "../src";
import { DeleteResponse } from "../src/actions/payrexx.actions";
import { ISubscriptionResponse } from "../src/actions/payrexx.actions.subscriptions";

describe("Subscription", () => {
  let subscriptionId: number;

  it("should have the env setup", () => {
    // see ".env.default" if this test fails
    expect(getInstanceName()).toBeDefined();
    expect(getApiKey()).toBeDefined();
  });

  it("should create a subscription", async () => {
    const payrexx = new PayRexx(getInstanceName(), getApiKey());
    const subscription: ISubscriptionResponse = await payrexx.subscriptions.create(
      {
        amount: "42",
        cancellationInterval: "P1Y",
        currency: "CHF",
        paymentInterval: "P1Y",
        period: "P1Y",
        psp: "psp",
        purpose: "purpose",
        userId: "userId",
      }
    );

    subscriptionId = subscription.id;
    expect(subscription).toBeDefined();
    expect(subscription.status).toEqual("waiting");
  });

  it("should log the subscription", async () => {
    const payrexx = new PayRexx(getInstanceName(), getApiKey());
    const subscription: ISubscriptionResponse = await payrexx.subscriptions.log(
      subscriptionId
    );

    expect(subscription).toBeDefined();
    expect(subscription.status).toEqual("waiting");
    expect(subscription.id).toBeDefined();
  });

  it("should get back the subscription", async () => {
    const payrexx = new PayRexx(getInstanceName(), getApiKey());
    const subscription: ISubscriptionResponse = await payrexx.subscriptions.get(
      subscriptionId
    );

    expect(subscription).toBeDefined();
    expect(subscription.status).toEqual("waiting");
    expect(subscription.id).toBeDefined();
  });

  it("should delete the subscription", async () => {
    const payrexx = new PayRexx(getInstanceName(), getApiKey());
    const deletion: DeleteResponse = await payrexx.subscriptions.delete(
      subscriptionId
    );

    expect(deletion).toBeDefined();
    expect(deletion.status).toEqual("success");
  });
});
