const server = 'http://localhost:1337/';

const documents = {
    //Fetch all documents
    allDocuments: async function allDocuments() {
        const response = await fetch(server, { method: 'GET' });
        return response.json();
    },
    //Fetch one document
    getOneDoc: async function getOneDoc(docId) {
        const response = await fetch(`${server}${docId}`, { method: 'GET' });
        return response.json();
    }
};

export default documents;
