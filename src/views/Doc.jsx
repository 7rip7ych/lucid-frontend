import Header from './includes/header'
import Footer from './includes/footer'
import AddForm from './AddForm';
import UpdateForm from './UpdateForm';
import documents from './models/docs';

function Doc(props) {
    let docu = documents.getOneDoc(props.id);
    return (
        <>
        <Header />
        <main className="main" id="main">
        <AddForm doc={docu} />
        <UpdateForm doc={docu} />
        </main>
        <Footer />
        </>
    );
}

export default Doc
