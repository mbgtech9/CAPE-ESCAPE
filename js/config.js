const poolData = {
    UserPoolId: 'us-west-2_AtFkzn0MF',
    ClientId: '7aisnk3shse8918f2ulpteapeh'
};
const userPool = new CognitoUserPool(poolData);
const authenticateUser = (username, password) => {
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: username,
        Password: password,
    });

    const user = new AmazonCognitoIdentity.CognitoUser({
        Username: username,
        Pool: userPool,
    });

    user.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
            console.log('Authentication successful!');
            console.log('Access token:', result.getAccessToken().getJwtToken());
        },
        onFailure: (err) => {
            console.error('Authentication failed:', err);
        },
    });
};
const callApi = async (endpoint, method = 'GET', body = null, token = null) => {
    const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: token }),
    };

    const response = await fetch(`https://rc7nyt4tql.execute-api.us-west-2.amazonaws.com/prod${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
};
