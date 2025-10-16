import Login from "../Login";

const server = 'https://jsramverk-editor-idal24-gcg4bgaydzg5cgc4.northeurope-01.azurewebsites.net/';
// const server = 'http://localhost:1337/';

//Module with auth functions.
const auth = {
    token: null,
    email: null,
    userId: null,

    login: async function login (username, password) {
        const user = {
            email: username,
            password: password,
        };

        const response = await fetch(`${server}login`, {
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        });

        const result = await response.json();

        if (result !== false) {
            auth.token = result.data.token;
            auth.email = username;
            auth.userId = result.data.id;

            // console.log(result);
            return result;
        }

        return "not ok";
    },

    register: async function register (email, password) {
        const user = {
            email: email,
            password: password,
        };

        const response = await fetch(`${server}register`, {
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        });

        const result = await response.json();

        if (result.data.message === "User successfully registered.") {

            return "ok";
        }

        return "not ok";
    },
    resetSession: function resetSession () {
        auth.token = null;
        auth.email = null;
        auth.userId = null;
    },
};

export default auth;