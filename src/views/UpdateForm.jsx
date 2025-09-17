function UpdateForm() {
    return (
        <>
        <form method="POST" action="/update" className="new-doc">
            <label for="id">Id</label>
            <input type="text" name="id" value="<%= id %>" />

            <label for="title">Titel</label>
            <input type="text" name="title" value="<%= doc?.title %>" />

            <label for="content">Innehåll</label>
            <textarea name="content"><%= doc?.content %></textarea>

            <input type="submit" value="Uppdatera" />
        </form>
        </>
    );
};

export default UpdateForm;