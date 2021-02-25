// import axios from "../../axios-instance";
import axios from "axios";

/**
 * My function description
 * @param {String} method
 * @param {String} url
 * @param {Object} body
 * @example
 * myFunction('get', '/users/id/users', {username,password})
 * @returns {object}
 * @author  Amaresh Sahoo
 * @lastModified 15/12/2020
 */


async function CallApi(method, url, body) {
    var responseCall;
    try {
        switch (method) {
            case "get":
                {
                    responseCall = await axios.get(url);
                    break;
                }
            case "post":
                {
                    responseCall = await axios.post(url, body);
                    break;
                }
            case "put":
                {
                    responseCall = await axios.put(url, body);
                    break;
                }
            case "delete":
                {
                    responseCall = await axios.delete(url);
                    break;
                }
            default:
                {}
        }
        var data = handleResponse(responseCall);
        return data;
    } catch (e) {
        throw e;
    }
}

// logout
function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("token");
}

function handleResponse(response) {
    console.log("response in callapi", response);
    const data = response.data;
    if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();

        const error = (data && data.message) || response.statusText;
        throw error;
    }
    return data;
}

export default CallApi;