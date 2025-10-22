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


    useEffect(() => {
        if (editorRef.current) {
            // Set selection
            let field = document.getElementById("contenteditor");
            if (!field) { return }
            
            highlightComments()
            
            field.addEventListener("click", () => {
                let row = field.value.slice(0, field.selectionStart).split("\n").length;
                props.actions.select(row);
                highlightRow(row);
            });

            
            field.oninput = () => {
                highlightComments();
                highlightRow(field.value.slice(0, field.selectionStart).split("\n").length);
            }

            
            field.addEventListener("scroll", () => {
                var back = document.querySelector(".backdrop");
                var text = document.querySelector("#contenteditor");
                back.scrollTo(text.scrollLeft, text.scrollTop);
            });
        }
    });
    
    if (document.getElementById("openCommentForm")){
        let field = document.getElementById("contenteditor");
        document.getElementById("openCommentForm").addEventListener("click", highlightRow, field.value.slice(0, field.selectionStart).split("\n").length);
    }
    if (document.querySelector(".comment-form")) {
        document.querySelector(".comment-form").addEventListener("submit", highlightRow, null);
    }

    function highlightComments() {
        let high = document.querySelector(".highlights");
        let lines = document.getElementById("contenteditor").value.split("\n");
            
        if (props.comments && lines.length > 0) {
            props.comments.forEach((comment) => {
                // highlight text
                if (!comment.selection) { return; }
                var i = comment.selection - 1;
                if (i < lines.length) {
                    lines[i] = lines[i].replace(/.*/, `<mark data-id="${comment.id}">$&</mark>`);
                }
            });
        }
        high.innerHTML = lines.join("\n");

        /*
        document.querySelectorAll(".highlights mark").forEach(highlight => {
                highlight.onmouseenter = () => {
                    var com = document.querySelector(`[data-id="${highlight.dataset.id}"]`);
                    com.classList.add("focus");
                }
                highlight.onmouseleave = () => {
                    var com = document.querySelector(`[data-id="${highlight.dataset.id}"]`);
                    com.classList.remove("focus");
                }
            })
        */
    }

    function highlightRow(row) {
        let form = document.querySelector(".comment-form");
        let high = document.querySelector(".highlights");
        let lines = high.innerHTML.split("\n");

        if (high.innerHTML && lines) {
            // select row
            let lastRow = lines.findIndex(line => line.includes('temp-highlight'));
            if (row && lastRow === row - 1) { return; }
            console.log(1);
            if (lastRow !== -1) {
                lines[lastRow] = lines[lastRow].replace(/<mark class="temp-highlight">([^\n]*)<\/mark>/, `$1`);
            }
            if (row && form.offsetParent !== null) {
                lines[row-1] = lines[row-1].replace(/.*/, '<mark class="temp-highlight">$&</mark>');
            }
            
            high.innerHTML = lines.join("\n");
        }
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