function UpdateForm(props) {
    return (
        <>
        <form method="POST" action="/update" className="new-doc">
            <label for="id">Id</label>
            <input type="text" name="id" value={props.doc._id} />

            <label for="title">Titel</label>
            <input type="text" name="title" value={props.doc.title} />

            <label for="content">Innehåll</label>
            <textarea name="content">{props.doc.content}</textarea>

            <input type="submit" value="Uppdatera" />
        </form>
        </>
    );
};

export default UpdateForm;