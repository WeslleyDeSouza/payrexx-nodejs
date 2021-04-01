import { getApiKey, getInstanceName } from "./helper";
import PayRexx from "../src";
import { DeleteResponse } from "../src/actions/payrexx.actions";
import { Payment } from "../src/actions/payrexx.actions.payment";

describe("Payment", () => {
  const defaultAmount = 42;
  let paymentId: number;

  it("should have the env setup", () => {
    // see ".env.default" if this test fails
    expect(getInstanceName()).toBeDefined();
    expect(getApiKey()).toBeDefined();
  });

  it("should create a payment", async () => {
    const payrexx = new PayRexx(getInstanceName(), getApiKey());
    const payment: Payment = await payrexx.paylink.create({
      amount: defaultAmount,
      currency: "CHF",
      description: "description",
      purpose: "purpose",
      referenceId: "referenceId",
      title: "title",
      vatRate: 7.7,
    });

    paymentId = payment.getId();
    expect(payment).toBeDefined();
    expect(payment.status).toEqual("waiting");
  });

  it("should get back the payment", async () => {
    const payrexx = new PayRexx(getInstanceName(), getApiKey());
    const payment: Payment = await payrexx.paylink.get(paymentId);

    expect(payment).toBeDefined();
    expect(payment.status).toEqual("waiting");
    expect(payment.amount).toEqual(defaultAmount);
  });

  it("should delete the payment", async () => {
    const payrexx = new PayRexx(getInstanceName(), getApiKey());
    const deletion: DeleteResponse = await payrexx.paylink.delete(paymentId);

    expect(deletion).toBeDefined();
    expect(deletion.status).toEqual("success");
  });
});
