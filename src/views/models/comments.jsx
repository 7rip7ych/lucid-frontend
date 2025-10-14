import auth from './auth.jsx';

// const server = 'https://jsramverk-editor-idal24-gcg4bgaydzg5cgc4.northeurope-01.azurewebsites.net/';
const server = 'http://localhost:1337/';

const comments = {
    addOneComment: async function addOneComment(comment) {
        const response = await fetch(`${server}comments`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'x-access-token': auth.token
            },
            body: JSON.stringify(comment)
        });
        const result = await response.json();

        return result;
    },
    deleteOneComment: async function deleteOneComment(id) {
        const response = await fetch(`${server}comments/${id}`, {  method: 'DELETE',
        headers: { 'x-access-token': auth.token }
         });
        const result = await response.json();

        return result;
    },
};

export default comments;
