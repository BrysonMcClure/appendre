import React from "react";
import {Link, Outlet} from "react-router-dom";
import NavigationSidebar from "./navigation-sidebar";
import ConnectionsSidebar from "./connections-sidebar";
import languagePreferenceReducer from "../../reducers/language-preference-reducer";
//Had to remeber to install these pacakages via npm install. Not quite sure if --save was necessary here but did it in anycase. Dont think it can jurt anything
//But in case it does now we have a note of what we did
import {combineReducers, createStore} from "redux";
import {Provider, useSelector} from "react-redux";
//const reducer =
const store = createStore(languagePreferenceReducer);


const Appendre = () => {

    const profile = useSelector((state) => state.profile);

    return(
        <div className="row mt-2">
            <div className="col-3">
                <NavigationSidebar/>
            </div>
            <div className={profile._id ? "col-7 col-lg-5 col-xl-5" : "col-9"}>
                <Outlet/>
            </div>
            {profile._id &&
                 <div className='d-none d-lg-block col-lg-4 col-xl-4'>
                    <ConnectionsSidebar/>
                 </div>
            }
        </div>
    );
};

export default Appendre;