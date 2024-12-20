(function () {
    const getConfig = () => {
        const config = {
            cognito: {
                userPoolId: process.env.COGNITO_USER_POOL_ID || 'us-west-2_AtFkzn0MF',
                userPoolClientId: process.env.COGNITO_USER_POOL_CLIENT_ID || '7aisnk3shse8918f2ulpteapeh',
                region: process.env.COGNITO_REGION || 'us-west-2',
            },
            api: {
                invokeUrl: process.env.API_INVOKE_URL || '', // Add your default or fallback URL if necessary
            },
        };

        // Validate configuration values
        if (!config.cognito.userPoolId || !config.cognito.userPoolClientId || !config.cognito.region) {
            throw new Error('Cognito configuration is incomplete.');
        }

        return config;
    };

    window._config = getConfig();
})();
