import documents from "../views/models/docs";
import users from "../views/models/users";
import { describe, test, expect, beforeEach, vi, afterEach} from 'vitest';
import "@testing-library/jest-dom/vitest";

const fetchMock = vi.fn();
describe('Testing documents functions:', async() => {
    // Prepare
    beforeEach(() => {
        vi.stubGlobal('fetch', fetchMock);
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    test('usersDocuments returns all documents', async() => {
        fetch.mockResolvedValueOnce({
            json: async () => ({
                data: {
                    userDocuments: "testObject"
                }
            })
        });

        const res = await users.usersDocuments(123);
        expect(await res).toEqual('testObject');
        expect(fetchMock).toHaveBeenCalledOnce();
    });

    test('getOneDoc gets one document', async() => {
        fetch.mockResolvedValueOnce({
            json: async () => ({
                data: {
                    document: "testObject"
                }
            })
        });
        
        const res = await documents.getOneDoc(123);
        expect(await res).toEqual('testObject');
        expect(fetchMock).toHaveBeenCalledOnce();
    });

    test('documentComments gets comments', async() => {
        fetch.mockResolvedValueOnce({
            json: async () => ({
                data: {
                    documentComments: "testObject"
                }
            })
        });
        
        const res = await documents.documentComments(123);
        expect(await res).toEqual('testObject');
        expect(fetchMock).toHaveBeenCalledOnce();
    });

    test('addOneDoc adds one document', async() => {
        fetch.mockResolvedValueOnce({
            json: async () => ({
                data: "testObject"
            })
        });

        const res = await documents.addOneDoc(123);
        expect(await res.data).toEqual('testObject');
        expect(fetchMock).toHaveBeenCalledOnce();
    });

    test('updateOneDoc updates one document', async() => {
        fetch.mockResolvedValueOnce({
            json: async () => ({
                data: "testObject"
            })
        });
        
        const res = await documents.updateOneDoc(123);
        expect(await res.data).toEqual('testObject');
        expect(fetchMock).toHaveBeenCalledOnce();
    });

    test('deleteOneDoc deletes one document', async() => {
        fetch.mockResolvedValueOnce({
            json: async () => ({
                data: "testObject"
            })
        });
        
        const res = await documents.deleteOneDoc(123);
        expect(await res.data).toEqual('testObject');
        expect(fetchMock).toHaveBeenCalledOnce();
    });

    test('deleteAllDocs deletes all documents', async() => {
        fetch.mockResolvedValueOnce({
            json: async () => ({
                data: "testObject"
            })
        });
        
        const res = await documents.deleteAllDocs();
        expect(await res.data).toEqual('testObject');
        expect(fetchMock).toHaveBeenCalledOnce();
    });

})