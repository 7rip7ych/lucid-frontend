import { useRef, useEffect } from "react";

function TextEditor(props) {
    const editorRef = useRef(null);

    useEffect(() => {
        editorRef.current = document.getElementById("texteditor");
    }, []);

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
        props.actions.handleChange(document.getElementById("contenteditor").value);
    };

    // set content on change
    useEffect(() => {
        if (editorRef.current && typeof props.data.content !== "undefined" && typeof props.data.title !== "undefined") {
            document.getElementById("titleeditor").value = props.data.title;
            document.getElementById("contenteditor").value = props.data.content;
        }
        
    }, [props.data]);


    if (editorRef.current) {
        // Set selection
        let field = document.getElementById("contenteditor");
        
        field.addEventListener("mouseup", () => {
            //console.log(field.value.split("\n"));
            let txt = field.value.substring(field.selectionStart, field.selectionEnd);
            let row = field.value.slice(0, field.selectionStart).split("\n").length;
            props.actions.select([row, txt]);
        });

        field.oninput = () => {
            var highlightedText = applyHighlights(field.value);
            document.querySelector(".highlights").innerHTML = highlightedText;
        }
        
        field.addEventListener("scroll", () => {
            var back = document.querySelector(".backdrop");
            var text = document.querySelector("#contenteditor");
            back.scrollTo(text.scrollLeft, text.scrollTop);
        });
    }

    function applyHighlights(txt) {
        // update highlights
        return txt.replace(/\n$/g, '\n\n');
    }

    return (
        <>
        <div className="texteditor">
            <form onSubmit={handleSubmit} id="texteditor" className="editor-form new-doc">
                <label htmlFor="id">Id</label>
                <input type="text" name="id" className="subtitle readonly" defaultValue={props.data.id} readOnly/>

                <label htmlFor="title">Titel</label>
                <input type="text" id="titleeditor" name="title" className="title" defaultValue={props.data.title} onKeyUp={handleChange} />

                <label htmlFor="content">Innehåll</label>
                <div className="editor-container">
                    <div className="backdrop">
                        <div className="highlights"></div>
                    </div>
                    <textarea id="contenteditor" name="content" className="content" defaultValue={props.data.content} rows="6" autoFocus onKeyUp={handleChange} ></textarea>
                </div>
                
                
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