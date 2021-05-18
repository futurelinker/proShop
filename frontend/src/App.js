// import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Container className='py-3'>
          <h1>Greetings user</h1>
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
