import documents from "../views/models/docs";
import { describe, test, expect } from 'vitest';

describe('Testing documents functions:', async() => {
    // Prepare
    const addedDoc = await documents.addOneDoc({'title': 'Hello', 'content': 'world'});
    const docs = await documents.allDocuments();
    const lastId = docs[docs.length - 1]._id;
    const lastDoc = await documents.getOneDoc(lastId);

    test('allDocuments returns all documents', () => {
        expect(docs).toBeTypeOf('object');
        expect(docs.length).toBeGreaterThanOrEqual(1);
    });

    test('addOneDoc adds one document', () => {
        expect(addedDoc.insertedId).toBeDefined();
        expect(lastId).toBe(addedDoc.insertedId);
    });

    test('getOneDoc gets one document', () => {
        expect(lastDoc).toBeTypeOf('object');
        expect(lastDoc).toStrictEqual({
            '_id': lastId,
            'title': 'Hello',
            'content': 'world'
        });
    });

    const updatedDoc = await documents.updateOneDoc({
        'id': lastId,
        'title': 'Hello',
        'content': 'update!'
    });
    const getUpdated = await documents.getOneDoc(lastId);

    test('updateOneDoc updates one document', () => {
        expect(updatedDoc.modifiedCount).toBe(1);
        expect(getUpdated).toStrictEqual({
            '_id': lastId,
            'title': 'Hello',
            'content': 'update!'
        });
    });

    const deletedDoc = await documents.deleteOneDoc(lastId);
    
    test('deleteOneDoc deletes one document', () => {
        expect(deletedDoc.deletedCount).toBe(1);
        expect(async() => documents.getOneDoc(lastId)).rejects.toThrowError('Unexpected end of JSON input');
    });
    
    // No test for delete all function to preserve the documents
})