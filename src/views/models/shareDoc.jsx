import auth from './auth.jsx';

const server = 'https://jsramverk-editor-idal24-gcg4bgaydzg5cgc4.northeurope-01.azurewebsites.net/';
// const server = 'http://localhost:1337/';

const shareDoc = {
    sendMail: async function sendMail(mail) {
        const response = await fetch(`${server}sendmail`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'x-access-token': auth.token
            },
            body: JSON.stringify(mail)
        });
        const result = await response.json();

        return result;
    },
    sharedDoc: async function sharedDoc(data) {
        const response = await fetch(`${server}docs/share`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'x-access-token': auth.token
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();

        return result;
    },
};

export default shareDoc;
