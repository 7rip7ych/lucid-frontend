function AddForm() {
    return (
        <>
        <h2>Dokument</h2>
        <form method="POST" action="/" className="new-doc">
            <label for="title">Titel</label>
            <input type="text" name="title" value="<%= doc?.title %>" />

            <label for="content">Innehåll</label>
            <textarea name="content"><%= doc?.content %></textarea>

            <input type="submit" value="Skapa" />
        </form>
        </>
    );
};

export default AddForm;