function UpdateForm(props) {
    return (
        <>
        <form method="POST" action="/update" className="new-doc">
            <label htmlFor="id">Id</label>
            <input type="text" name="id" defaultValue={props.doc._id} />

            <label htmlFor="title">Titel</label>
            <input type="text" name="title" defaultValue={props.doc.title} />

            <label htmlFor="content">Innehåll</label>
            <textarea name="content" defaultValue={props.doc.content}></textarea>

            <input type="submit" value="Uppdatera" />
        </form>
        </>
    );
};

export default UpdateForm;