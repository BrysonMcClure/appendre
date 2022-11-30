//import logo from './logo.svg';
import './App.css';
//Main Bootstrap
//import './vendors/bootstrap/bootstrap-5.1.3-dist/js/bootstrap.min.js'
import './vendors/bootstrap/bootstrap-5.1.3-dist/css/bootstrap.min.css';
//Our Bootswatch override theme library
import './vendors/bootstrap/bootstrap.min.css';
import './vendors/fontawesome-free-6.2.0-web/css/all.min.css';
import HelloWorld from "./components/hello-world";
import LandingPage from "./components/landing-page";
import Appendre from "./components/appendre";
import Signup from "./components/signup";
import Profile from "./components/profile";
import Main from "./components/main"
import WriteLetter from "./components/write-letter";
import SingleLetter from "./components/single-letter";
import PrivateProfile from "./components/profile/private-profile";
import PublicProfile from "./components/profile/public-profile";
import Letters from "./components/appendre/letters";
import Search from "./components/appendre/search";
import LettersSearchResults from "./components/appendre/search/letters-search-results";
import UsersSearchResults from "./components/appendre/search/users-search-results";
//Not exactly sure why the following was neccessary and default index.js does not return, still failed with
//a hello world component so the issue must be something strange with the file system structure, may want to try recreating and destryoing later?
//FIgured it out! Had a dead login.js file hanging out outside of the component folder which it was confusing for the file in the folder. got it.
import Login from "./components/login";
import {BrowserRouter, Route, Routes} from "react-router-dom";


//add a no match route later with * so we have somewhere to go if the user asks for nonsense?
//use this for undefined permison blocked pages? I dont think so/ know if it works like that.

function App() {
  return (
      <BrowserRouter>
          <div className="container">
              <Routes>
                  <Route path="/"
                         element = {<Main/>}>
                      <Route index
                             element={<LandingPage/>}/>
                      <Route path="signup"
                             element={<Signup/>}/>
                      <Route path="login"
                             element={<Login/>}/>
                      <Route path="appendre"
                             element={<Appendre/>}>
                          <Route index
                                 element={<Letters/>}/>
                          <Route path="profile"
                                 element={<Profile/>}>
                              <Route index
                                     element={<PrivateProfile/>}/>
                              <Route path=":userId"
                                     element={<PublicProfile/>}/>
                          </Route>
                          <Route path="write-letter/:letterId"
                                 element={<WriteLetter/>}/>
                          <Route path="write-letter"
                                 element={<WriteLetter/>}/>
                          <Route path="letters/:start/:end"
                                 element={<Letters/>}/>
                          <Route path="letterDetails/:letterId"
                                 element={<SingleLetter/>}/>
                          <Route path="search"
                                 element={<Search/>}>
                              <Route path="letters-search/:start/:end"
                                     element={<LettersSearchResults/>}/>
                              <Route path="users-search/:start/:end"
                                     element={<UsersSearchResults/>}/>
                          </Route>
                          </Route>
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
