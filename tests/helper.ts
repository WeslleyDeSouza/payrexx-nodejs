import PayRexx from '../src';

require('dotenv').config();

export function getInstanceName(): string {
    return process.env.PAYREXX_INSTANCE_NAME
}

export function getApiKey(): string {
    return process.env.PAYREXX_API_KEY;
}

export function getPayrexxInstance() {
    return new PayRexx(getInstanceName(),getApiKey())
}
