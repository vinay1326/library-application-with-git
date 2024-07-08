export const oktaConfig = {
    clientId: '0oaf26eaaaSzmOLFf5d7',
    issuer: 'https://dev-77901267.okta.com/oauth2/default',
    redirectUri : 'https://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
}