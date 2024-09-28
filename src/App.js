import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import InvoiceForm from './components/InvoiceForm';
function App() {
  return (
    <div className="App">
  <Container>
    <InvoiceForm/>
  </Container>
    </div>
  );
}

export default App;
