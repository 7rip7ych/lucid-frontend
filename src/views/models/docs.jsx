const server = 'http://localhost:1337/';

const documents = {
    // Fetch all documents
    allDocuments: async function allDocuments() {
        const response = await fetch(server, { method: 'GET' });
        const result = await response.json();

        return result.docs;
    },
    // Fetch one document
    getOneDoc: async function getOneDoc(docId) {
        const response = await fetch(`${server}${docId}`, { method: 'GET' });
        const result = await response.json();

        return result;
    },
    addOneDoc: async function addOneDoc(doc) {
        const response = await fetch(`${server}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(doc)
        });
        const result = await response.json();
        // return id instead?
        return result;
    },
    updateOneDoc: async function updateOneDoc(doc) {
        const response = await fetch(`${server}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(doc)
        });
        const result = await response.json();

        return result;
    },
    deleteOneDoc: async function deleteOneDoc(id) {
        const response = await fetch(`${server}${id}`, { method: 'DELETE' });
        const result = await response.json();

        return result;
    },
    deleteAllDocs: async function deleteAllDocs() {
        const response = await fetch(`${server}`, { method: 'DELETE' });
        const result = await response.json();

        return result;
    }
};

export default documents;
