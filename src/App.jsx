import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/pages/Home'
import Coins from './components/pages/Coins'
import Exchanges from './components/pages/Exchanges'
import CoinsDetails from './components/pages/CoinsDetails'
import '../src/index.css'
import { Divider } from '@chakra-ui/react'
import FooterNav from './components/asset_components/FooterNav'
import News from './components/pages/News'

const App = () => {
  return (
    <>
      <Router>
        <Header/>
        <Divider/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/coins' element={<Coins/>}/>
          <Route path='/exchanges' element={<Exchanges/>}/>
          <Route path='/coin/:id' element={<CoinsDetails/>}/>
          <Route path='/news'element={<News/>}/>
        </Routes>
        <FooterNav/>
        <Footer/>
      </Router>
    </>
  )
}

export default App