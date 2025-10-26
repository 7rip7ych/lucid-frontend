import auth from './auth.jsx';

const server = 'https://jsramverk-editor-idal24-gcg4bgaydzg5cgc4.northeurope-01.azurewebsites.net/';
// const server = 'http://localhost:1337/';

const documents = {
    getOneDoc: async function getOneDoc(docsId) {
        const query = `
        query ($id: String!) {
            document(docsId: $id) {
                _id
                title
                content
                type
                owners {
                    _id
                }
            }
        }
        `;

        const variables = {
            id:`${docsId}`
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
        return result.data.document;
    },
    addOneDoc: async function addOneDoc(doc) {
        const response = await fetch(`${server}docs`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'x-access-token': auth.token
            },
            body: JSON.stringify(doc)
        });
        const result = await response.json();

        return result;
    },
    updateOneDoc: async function updateOneDoc(doc) {
        const response = await fetch(`${server}docs/update`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'x-access-token': auth.token
            },
            body: JSON.stringify(doc)
        });
        const result = await response.json();

        return result;
    },
    deleteOneDoc: async function deleteOneDoc(id) {
        const response = await fetch(`${server}docs/${id}`, {
            method: 'DELETE',
            headers: { 'x-access-token': auth.token }
        });
        const result = await response.json();

        return result;
    },
    deleteAllDocs: async function deleteAllDocs() {
        const response = await fetch(`${server}docs`, {
            method: 'DELETE'
        });
        const result = await response.json();

        return result;
    },
    // Shows all comments for one document, arg = documen._id.
    documentComments: async function documentComments(docsId) {
        const query = `
        query ($id: String!) {
            documentComments (docsId: $id) {
                _id
                content
                owner {
                    _id
                    email
                }
                document {
                    _id
                    title
                }
                selection
            }
        }
        `;

        const variables = {
            id:`${docsId}`
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
        return result.data.documentComments;
    },
};

export default documents;
