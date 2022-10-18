//import logo from './logo.svg';
import './App.css';
//Main Bootstrap
import './vendors/bootstrap/bootstrap-5.1.3-dist/css/bootstrap.min.css';
//Our Bootswatch override theme library
import './vendors/bootstrap/bootstrap.min.css';
import './vendors/fontawesome-free-6.2.0-web/css/all.min.css';
import HelloWorld from "./components/hello-world";
import LandingPage from "./components/landing-page";
import Appendre from "./components/appendre";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
          <div className="container">
              <Routes>
                  <Route path="/">
                      <Route index
                             element={<LandingPage/>}/>
                      <Route path="appendre"
                             element={<Appendre/>}/>
                  </Route>
              </Routes>
          </div>
      </BrowserRouter>
  );
}

export default App;


/*Default React App Landing Page Junk
* <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>*/
