// import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container className='py-3'>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
