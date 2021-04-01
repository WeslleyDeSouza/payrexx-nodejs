import { getApiKey, getInstanceName } from './helper';
import PayRexx from '../src';
import { Gateway } from '../src/actions/payrexx.actions.gateway';
import { DeleteResponse } from '../src/actions/payrexx.actions';


describe('Gateway', () => {
    const defaultAmount = 42;
    let gatewayId: number;


    it('should have the env setup', ()=> {
        // see ".env.default" if this test fails
        expect(getInstanceName()).toBeDefined();
        expect(getApiKey()).toBeDefined();
    })


    it('should create a gateway', async () => {

        const payrexx = new PayRexx(getInstanceName(),getApiKey());
        const gateway:Gateway = await payrexx.gateway.create({
            amount: defaultAmount,
            currency: 'CHF'
        })

        gatewayId = gateway.getId();
        expect(gateway).toBeDefined();
        expect(gateway.status).toEqual('waiting');
    })

    it('should get back the gateway', async () => {

        const payrexx = new PayRexx(getInstanceName(),getApiKey());
        const gateway:Gateway = await payrexx.gateway.get(gatewayId);

        expect(gateway).toBeDefined();
        expect(gateway.status).toEqual('waiting');
        expect(gateway.amount).toEqual(defaultAmount)
    })

    it('should delete the gateway', async () => {

        const payrexx = new PayRexx(getInstanceName(),getApiKey());
        const response: DeleteResponse = await payrexx.gateway.delete(gatewayId);

        expect(response).toBeDefined();
        expect(response.status).toEqual('success');
    })


});
