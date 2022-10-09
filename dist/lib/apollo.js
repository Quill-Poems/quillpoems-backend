"use strict";
exports.__esModule = true;
var client_1 = require("@apollo/client");
var apolloClient = new client_1.ApolloClient({
    uri: 'http://localhost:4000/api/graphql',
    cache: new client_1.InMemoryCache()
});
exports["default"] = apolloClient;
//# sourceMappingURL=apollo.js.map