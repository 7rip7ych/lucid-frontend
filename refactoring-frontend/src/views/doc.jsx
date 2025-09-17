import Header from './includes/header'
import Footer from './includes/footer'

function Doc() {

    return (
        <>
        {/* <%- include('includes/header'); %> */}
        <Header />
        <main className="main" id="main">

        <h2>Dokument</h2>
        <form method="POST" action="/" className="new-doc">
            <label for="title">Titel</label>
            <input type="text" name="title" value="<%= doc?.title %>" />

            <label for="content">Innehåll</label>
            <textarea name="content"><%= doc?.content %></textarea>

            <input type="submit" value="Skapa" />
        </form>
        
        <form method="POST" action="/update" className="new-doc">
            <label for="id">Id</label>
            <input type="text" name="id" value="<%= id %>" />

            <label for="title">Titel</label>
            <input type="text" name="title" value="<%= doc?.title %>" />

            <label for="content">Innehåll</label>
            <textarea name="content"><%= doc?.content %></textarea>

            <input type="submit" value="Uppdatera" />
        </form>
        {/* <%- include('includes/footer'); %> */}
        </main>
        <Footer />
        </>
    );
}

export default Doc
