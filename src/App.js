import logo from './logo.svg';
// import './index.scss';
import { Button, Navbar } from '@material-tailwind/react';
import { Bs0Circle, BsClipboardCheck } from 'react-icons/bs'
import { NavbarWithMegaMenu } from './components/navbar-check.components';
import { Outlet, Route, Routes } from 'react-router-dom';
import Homepage from './routes/home/homepage.components';
import XcartPage from './routes/cartpage/cartpage.components';
import StockPage, { StockIndex } from './routes/stockpage/stockpage.components';
import NewItem from './routes/stockpage/new-item.components';
import NavigationPage from './routes/navigation.components';
import ExpensesPage from './routes/expenses-page/expenses.components';
import ScanPage from './routes/scanpage/scanpage.components';
import { Toaster, toast } from 'sonner'
import PurchasesPage from './routes/stockpage/purchases.components';

function App() { 
  return (
    <>
    <Routes>
      <Route path='/' element={<NavigationPage />}>
        <Route index element={<Homepage />}/>
        <Route path='stock' element={<StockPage />}>
          <Route index element={<StockIndex />}/>
          <Route path='add-new-item' element={<NewItem />}/>
          <Route path='purchases' element={<PurchasesPage />}/>
        </Route>
        <Route path='sales' element={<XcartPage />}/>
        <Route path='expenses' element={<ExpensesPage />}/>
        <Route path='scan-doc' element={<ScanPage />}/>
      </Route>
    </Routes> 
    <Toaster richColors/>
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
