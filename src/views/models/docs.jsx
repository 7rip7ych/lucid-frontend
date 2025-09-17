const server = 'http://localhost:1337/';

const documents = {
    //Fetch all documents
    allDocuments: async function allDocuments() {
        const response = await fetch(server, { method: 'GET' });
        const result = await response.json();

        return result.docs;
    },
    //Fetch one document
    getOneDoc: async function getOneDoc(docId) {
        const response = await fetch(`${server}${docId}`, { method: 'GET' });
        const result = await response.json();

        return result;
    }
};

export default documents;
