import './App.css';

//import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './redux';
//import "@fontsource/montserrat";
import { AppBanner, Homescreen } from './components';
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AppBanner/>
        <Homescreen/>
      </Provider>
    </div>
  );
  
}

export default App;