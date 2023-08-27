import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './redux/store';
import "@fontsource/montserrat";
import Homescreen from './components/Homescreen';
import AppBanner from './components/AppBanner';
import { TeamContainer } from './components';

/*
return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
        </Routes>
    </BrowserRouter>
  );
  */

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App">
          <AppBanner/>
          <Routes>
            <Route path="/team" element={<TeamContainer/>}/>
            <Route path="/" element={<Homescreen/>}/>
          </Routes>
        </div>
      </Provider>
    </BrowserRouter>
  );
  
}

export default App;
