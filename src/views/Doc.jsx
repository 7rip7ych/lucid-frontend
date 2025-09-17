import { useParams } from 'react-router-dom'
import Header from './includes/header'
import Footer from './includes/footer'
import AddForm from './includes/AddForm';
import UpdateForm from './includes/UpdateForm';
import documents from './models/docs';

function Doc() {
    const { id } = useParams();
    let docu = documents.getOneDoc(id);
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
