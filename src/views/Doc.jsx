import Header from './includes/header'
import Footer from './includes/footer'
import AddForm from './AddForm';
import UpdateForm from './UpdateForm';

function Doc() {

    return (
        <>
        <Header />
        <main className="main" id="main">
        <AddForm />
        <UpdateForm />
        </main>
        <Footer />
        </>
    );
}

export default Doc
