import { useState } from "react";
import documents from "../models/docs";
import { useNavigate } from "react-router-dom";

function UpdateForm(props) {
    const navigate = useNavigate();
    const [uTitle, setUTitle] = useState("");
    const [uContent, setUContent] = useState("");

    function handleChange(e) {
        e.preventDefault();
        e.target.name == "title" ? setUTitle(e.target.value) : setUContent(e.target.value);
    }
    
    async function handleSubmit(e) {
        e.preventDefault();
        let newDoc = {
            "id": props.doc._id,
            "title": uTitle === "" ? props.doc.title : uTitle,
            "content": uContent === "" ? props.doc.content : uContent
        };
        // const result = await documents.updateOneDoc(newDoc);
        // console.log(result, newDoc);
        await documents.updateOneDoc(newDoc);
        
        navigate(0); // Reload page
    }

    return (
        <>
        <h2>Dokument</h2>
        <form onSubmit={handleSubmit} className="new-doc">
            <label htmlFor="id">Id</label>
            <input type="text" name="id" defaultValue={props.doc._id} />

            <label htmlFor="title">Titel</label>
            <input type="text" name="title" defaultValue={props.doc.title} onChange={handleChange} />

            <label htmlFor="content">Innehåll</label>
            <textarea name="content" defaultValue={props.doc.content} onChange={handleChange}></textarea>

            <input type="submit" value="Uppdatera" />
        </form>
        </>
    );
};

export default UpdateForm;
