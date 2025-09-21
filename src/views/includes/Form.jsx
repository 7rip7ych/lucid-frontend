import { useState } from "react";
import documents from "../models/docs";
import { useNavigate } from "react-router-dom";

function Form(props) {
    const navigate = useNavigate();
    const [title, setNewTitle] = useState("");
    const [content, setNewContent] = useState("");

    function handleChange(e) {
        e.preventDefault();
        e.target.name == "title" ? setNewTitle(e.target.value) : setNewContent(e.target.value);
    }

    async function createDoc() {
        let newDoc = {
            "title": title === "" ? props.doc.title : title,
            "content": content === "" ? props.doc.content : content
        };
        const result = await documents.addOneDoc(newDoc);

        navigate(`/${result.insertedId}`); // Redirect to new id
    }

    async function updateDoc() {
        let updatedDoc = {
            "id": props.doc._id,
            "title": title === "" ? props.doc.title : title,
            "content": content === "" ? props.doc.content : content
        };

        await documents.updateOneDoc(updatedDoc);
        
        navigate(0); // Reload page
    }

    async function deleteDoc() {
        if (props.doc._id) {
            documents.deleteOneDoc(props.doc._id);
        }
        
        navigate("/");  // Redirect to home
    }

    async function handleSubmit(e) {
        e.preventDefault();

        switch (e.nativeEvent.submitter.value) {
            case "Skapa":
                await createDoc();
                break;
            case "Uppdatera":
                await updateDoc();
                break;
            case "Radera":
                await deleteDoc();
                break;
            default:
        }
    }

    return (
        <>

        <form onSubmit={handleSubmit} className="new-doc">
            <label htmlFor="id">Id</label>
            <input type="text" name="id" defaultValue={props.doc._id} readOnly/>

            <label htmlFor="title">Titel</label>
            <input type="text" name="title" defaultValue={props.doc.title} onChange={handleChange} />

            <label htmlFor="content">Innehåll</label>
            <textarea name="content" defaultValue={props.doc.content} onChange={handleChange}></textarea>

            <input type="submit" value="Skapa" />
            <input type="submit" value="Uppdatera" />
            <input type="submit" value="Radera" />
        </form>
        
        </>
    );
};

export default Form;