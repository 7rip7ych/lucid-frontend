function AddForm(props) {
    return (
        <>
        <h2>Dokument</h2>
        <form method="POST" action="/" className="new-doc">
            <label htmlFor="title">Titel</label>
            <input type="text" name="title" defaultValue={props.doc.title} />

            <label htmlFor="content">Innehåll</label>
            <textarea name="content" defaultValue={props.doc.content}></textarea>

            <input type="submit" value="Skapa" />
        </form>
        </>
    );
};

export default AddForm;