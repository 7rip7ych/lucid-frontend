
function TextEditor(props) {

    // Handle a submission of the form
    async function handleSubmit(e) {
        e.preventDefault();

        switch (e.nativeEvent.submitter.value) {
            case "Skapa":
                await props.actions.create();
                break;
            case "Uppdatera":
                await props.actions.update();
                break;
            case "Radera":
                await props.actions.delete();
                break;
            default:
        }
    }


    function handleChange() {
        console.log("change");
        if (props.socket.current) {
            props.socket.current.emit("content", {
                id: props.doc._id,
                title: document.getElementById("titleeditor").value,
                content: document.getElementById("contenteditor").value,
                type: "text"
            });
        }
    };

    return (
        <>
        <div className="texteditor">
            <form onSubmit={handleSubmit} id="texteditor" className="editor-form new-doc">
                <label htmlFor="id">Id</label>
                <input type="text" name="id" className="subtitle readonly" defaultValue={props.doc._id} readOnly/>

                <label htmlFor="title">Titel</label>
                <input type="text" id="titleeditor" name="title" className="title" defaultValue={props.doc.title} onKeyUp={handleChange} />

                <label htmlFor="content">Innehåll</label>
                <textarea id="contenteditor" name="content" className="content" defaultValue={props.doc.content} rows="6" autoFocus onKeyUp={handleChange} ></textarea>
                
                <div className="inline-buttons">
                    <input type="submit" id="create" value="Skapa" />
                    <input type="submit" id="update" value="Uppdatera" />
                    <input type="submit" id="delete" value="Radera" />
                </div>
            </form>
        </div>
        </>
    );
};

export default TextEditor;