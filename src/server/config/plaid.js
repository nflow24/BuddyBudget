const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');

const plaidEnv = process.env.PLAID_ENV || 'sandbox';
const basePath = plaidEnv === 'production'
    ? PlaidEnvironments.production
    : PlaidEnvironments.sandbox;

const configuration = new Configuration({
    basePath,
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
            'PLAID-SECRET': process.env.PLAID_SECRET,
        },
    },
});

const plaidClient = new PlaidApi(configuration);

module.exports = plaidClient;
