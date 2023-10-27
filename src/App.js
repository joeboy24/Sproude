import logo from './logo.svg';
// import './index.scss';
import { Button, Navbar } from '@material-tailwind/react';
import { Bs0Circle, BsClipboardCheck } from 'react-icons/bs'
import { NavbarWithMegaMenu } from './components/navbar-check.components';
import { Outlet, Route, Routes } from 'react-router-dom';
import Homepage from './routes/home/homepage.components';
import XcartPage from './routes/cartpage/cartpage.components';

function App() { 
  return (
    <>
    <Routes>
      <Route path='/' element={<Homepage />}/>
      <Route path='/sales' element={<XcartPage />}/>
    </Routes> 
    </>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <h1 className='text-green-400 bg-lightBlue-700'>Happy Codding</h1> 
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload. 
    //     </p>
    //     <Button>New Button</Button>
    //     <Navbar></Navbar>
    //     <BsClipboardCheck />
    //     <NavbarWithMegaMenu />
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
