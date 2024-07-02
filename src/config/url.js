import React from "react";

const isLocalhost = window.location.hostname === "localhost";
console.log(isLocalhost + '?');
console.log(process.env.REACT_APP_BACKEND_URL_LOCAL)

const url = {
    backendUrl: isLocalhost
        ? process.env.REACT_APP_BACKEND_URL_LOCAL
        : process.env.REACT_APP_BACKEND_URL_PROD
};

export default url;