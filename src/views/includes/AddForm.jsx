import { useState } from "react";
import documents from "../models/docs";
import { useNavigate } from "react-router-dom";

function AddForm(props) {
    const navigate = useNavigate();
    const [newTitle, setNewTitle] = useState(props.doc.title);
    const [newContent, setNewContent] = useState(props.doc.content);

    function handleChange(e) {
        e.preventDefault();
        e.target.name == "title" ? setNewTitle(e.target.value) : setNewContent(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let newDoc = {
            "title": newTitle,
            "content": newContent
        };
        const result = await documents.addOneDoc(newDoc);

        navigate(`/${result.insertedId}`); // Redirect to new id
    }

    return (
        <>
        <h2>Dokument</h2>
        <form onSubmit={handleSubmit} className="new-doc">
            <label htmlFor="title">Titel</label>
            <input type="text" name="title" defaultValue={props.doc.title} onChange={handleChange} />

            <label htmlFor="content">Innehåll</label>
            <textarea name="content" defaultValue={props.doc.content} onChange={handleChange}></textarea>

            <input type="submit" value="Skapa" />
        </form>
        </>
    );
};

export default AddForm;