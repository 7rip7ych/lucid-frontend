function AddForm(props) {
    return (
        <>
        <h2>Dokument</h2>
        <form method="POST" action="/" className="new-doc">
            <label for="title">Titel</label>
            <input type="text" name="title" value={props.doc.title} />

            <label for="content">Innehåll</label>
            <textarea name="content">{props.doc.content}</textarea>

            <input type="submit" value="Skapa" />
        </form>
        </>
    );
};

export default AddForm;