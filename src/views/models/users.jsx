import auth from './auth.jsx';

const server = 'https://jsramverk-editor-idal24-gcg4bgaydzg5cgc4.northeurope-01.azurewebsites.net/';
// const server = 'http://localhost:1337/';

const users = {
    allUsers: async function allUsers() {

        const query = `
        query {
            users {
                _id
                email
            }
        }
        `;
        const response = await fetch(`${server}graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': auth.token
            },
            body: JSON.stringify({ query })
        })
        const result = await response.json();

        return result.data.users;
    },
    // Shows all documents for one user. args = user._id.
    usersDocuments: async function usersDocuments(userId) {
        const query = `
        query ($id: String!) {
            userDocuments(userId: $id) {
                _id
                title
                content
                type
            }
        }
        `;

        const variables = {
            id:`${userId}`
        };

        const response = await fetch(`${server}graphql`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'x-access-token': auth.token
            },
            body: JSON.stringify({ query, variables })
        });

        const result = await response.json();
        // console.log(result.data);
        return result.data.userDocuments;
    },
};

export default users;
