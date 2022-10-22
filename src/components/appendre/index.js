import React from "react";
import {Link, Outlet} from "react-router-dom";
import NavigationSidebar from "./navigation-sidebar";
import languagePreferenceReducer from "../../reducers/language-preference-reducer";
//Had to remeber to install these pacakages via npm install. Not quite sure if --save was necessary here but did it in anycase. Dont think it can jurt anything
//But in case it does now we have a note of what we did
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
//const reducer =
const store = createStore(languagePreferenceReducer);


const Appendre = () => {
    return(
        <Provider store={store}>
            <div className="row mt-2">
                <div className="col-3 col-lg-3 col-xl-3">
                    <NavigationSidebar/>
                </div>
                <div className="col-7 col-lg-5 col-xl-5">
                    <Outlet/>
                </div>
                <div className="d-none d-lg-block col-lg-4 col-xl-4">
                    <h1>TBD</h1>
                </div>
            </div>
        </Provider>
    );
};

export default Appendre;