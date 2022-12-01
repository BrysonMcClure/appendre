import React, {useEffect, useState} from "react";
import {Outlet, useSearchParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
//import {getLanguage} from "../../../actions/language-action";
import {PAGE_SIZE} from "../../write-letter";

// const ProfileAttributes = {
//     username: {attribute: 'username', label: 'Username'},
//     role: {attribute: 'role', label: 'Role'}
// }





// export const LetterAttributes = {
//     title: {attribute: 'Title', label: 'title'},
//     text: {attribute: 'Text', label: 'text'},
//     tag: {attribute: 'Tag', label: 'tag'},
//     author: {attribute: 'Author', label: 'author'},
//     date: {attribute: 'Date', label: 'date'}
//     //Maybe later want to add option/ options to search multiple tags, and or filter based on number of likes
//     // / dislikes greater than or equal too? Might be nice? Not sure how much extra work it would be to implement a special case like that,
//     //once we have the initial search "backend" functionality setup and what not.
// }





const Search = () => {

    const navigate = useNavigate();

    //Taken care of by banner, aka the reason we dont do get all letters there.
    const languagePreference = useSelector((state)=>state.lang);

    //Have to declare these down here now inside of the React component so that I can use the languagePreference, otherwise I have no access to that dynamic selector which i very much need
    //Would need to do some other sort of major reqorking otherwise to make this happen, and for now dont really need to export this so maybe
    //no neccessary to probabbly spend a ton of time and energy on this now. Hmmmmmm.
    //stuff that could change = three vars below. Nice and simple.
    let ProfileAttributes = [
        {attribute: 'username', label: languagePreference.username},
        {attribute: 'role', label: languagePreference.role}
    ]

    /*export*/ let LetterAttributes = [
        {attribute: 'title', label: languagePreference.title},
        {attribute: 'text', label: languagePreference.text},
        //{attribute: 'tag', label: languagePreference.tag}, Not doing theses yet, wnat to come up with a more robust multile select interface, an extra feature to be implemented later maybe.
        {attribute: 'author', label: languagePreference.author}
        //{attribute: 'date', label: languagePreference.date} Getting rid of date for now as this feels more like a sorting filter than a search criteria to me, also its hard to do partial search pattern
        //matchig because of ISO Date types. Probably a better way to work with them, but again not really convinced these are the way to go. THink it should really probably be a sorting filter over a search criteria.
        //Maybe later want to add option/ options to search multiple tags, and or filter based on number of likes
        // / dislikes greater than or equal too? Might be nice? Not sure how much extra work it would be to implement a special case like that,
        //once we have the initial search "backend" functionality setup and what not.
    ];

    let SearchType = {
        userSearch: {findByOptions: ProfileAttributes, label: `${languagePreference && languagePreference.user}`, subPath: 'users-search'},
        //Generic document search type to come later maybe for searching replies as well? Hmmmm maybe.
        letterSearch: {findByOptions: LetterAttributes, label: `${languagePreference && languagePreference.letter}`, subPath: 'letters-search'},
    }

    //Since we use it no where else, it might be reasonable to just call the service and have a list of profile results live here, because again
    //Its only local to this page and I dont think will ever come up again. Will be a list method from users super thingy, much like the find by username.
    //In fact almost just like that in some cases from the service.
    //SHould be fine, want to set up this/ search funtionality on back end such that nothing defined just means nothing returned/ showed up right hummmhmm?hm?
    const [searchDetails, setSearchDetails] = useState({searchType: SearchType.letterSearch, searchAttribute: LetterAttributes[0], searchValue : ''});
    //Search type is really only used here to know what kind of search we are doing? neeed to go to server? hmmmmm. when redirecting to this page, important to remeber
    //that the state (aka all of the values in this object thingy) will get wiped/ reset to thier defaults on a rerender and searchParams will be pulled in again anew according to any changes made by the set "method" ology of sorts.
    //actually, going to use search type as an outlet, and then have two different result sets for different types. Helps break things up a bit more maybe and also then allows us to
    //differentiate and know what kind of search we should be doing.

    useEffect(()=> {
        /*Ok, rant time. Two anyurismys and three minor heart attacks later, i finally got this working. Long story short, after a lot of experimentation I figured it out to be an issue
        * with stal states. We have had this issue before with useState and the way that it doesnt update things unless those parts are reset manually and you get one load per page. No joke
        * this gave me searing pain in the right side of my head and I felt like I was going to have a meltdown with this. More details in my notes, but essentially this is neccessary to force an
        * apperance update when the language is changed, since while normally anything whose rendering is based on our single source of truth in the reducer would update automatically, the nature of
        * states causes taht not to happen, so we have to watch for that reducer / global state change and manually trigger an update here. The search type arrarys update themselves autmoatically just fine,
        * its just the local copy that get shoved into use state that becomes the problem. I am not in love with this solution, but I spent all morning getting here and pretty much the rest of the afternoon
        * mulling over this and checking my logic/ calculations, and I think as much as it sucks, sort of making some of theses a reducer, this is actually the best solution. Not really sure if there is any better
        * way around this, even with changing how I do language, becuase no matter what you need to update this local copy of state to render the right options, so while it sucks I think this may just need to be a necessary evil
        * . Also as a side not, the equality comparison has to be based off of something fixed like path, because everything else changes as the application loads in and resets things like language and such,
        * meaning the deep equality on an unpopulated lettersearch array taken at launch for exapmle doesnt equal the properly populated version one that eventually catches up, despite them being the same type,
        * anything calculated on the fly like that does not guarantee equality as a reasonable thing to match off of. Just a good thing to note for other fututre stuff. EIther way, for now I think I am going to fix
        * the rest of the language stuff and then call it a day here. Might export some of this search bar stuff to a component later to make things clearner and make it more reusable, but for now
        * It works and I think I need a bit of a break from this feature. */
        // //searchDetails.searchType.findByOptions = LetterAttributes;
        //console.log(searchDetails.searchType,"trigggering start");
        if(searchDetails.searchType.subPath === "letters-search"){
            console.log("if triggered");
            searchDetails.searchType = SearchType.letterSearch;
        }
        else if (searchDetails.searchType.subPath === "users-search"){
            console.log("else if triggered");
            searchDetails.searchType = SearchType.userSearch
        }

        setSearchDetails({...searchDetails});
        //console.log(searchDetails.searchType,"trigggering end");
    }, [languagePreference])
    //languagePreference, SearchType.letterSearch, SearchType.userSearch, searchDetails
    //Ok dependency array thing again. Not sure what the functional update suggestion is but not really sure it applies anyway maybe idk man.
    //ALl i do is setsearhdetails calls so i dont really thing its/ the comment/ suggestion really makes sense then ehhh maybe ehhhhhh?

    //So apperntly, this has an accessor that gets updated on render, and a set method which act like use state
    //the setSearchParams works like navigate, but just effects the "search portion of the url"
    //I don,t think the search portion has to be specified the way id attributes do.
    //Hmm, how should this flow work? I'm not sure.
    //Expects a key value pair.

    //I think this will still work and defualt to getting only without defiinng the setter in the array pair ehhh maybe???
    //hmmm, idk man. hmmmmmmmmmm.
    const searchParams = useSearchParams();


    //Maybe we try that, multiple values as opposed to multiple useStates. DOnt think either is necessarily
    //"wrong" though given the fact that since the state is only local, i don't think there is necessary any reason to use a reucder
    //I do think though maybe this might be clearner, and since I do think it may make sense since the properties are realted after all.
    const changeSearchAttribute = (searchAttribute) => {
        const newSearchAttribute = JSON.parse(searchAttribute);
        console.log(newSearchAttribute.label, "triggered");
        setSearchDetails({...searchDetails, searchAttribute: newSearchAttribute});
    }

    const changeSearchType = (stringifiedObject) => {
        //What is a reviver in this context, however on this for more details?
        const newSearchType = JSON.parse(stringifiedObject);
        //Need to make sure search attribute gets reset to default so we dont have a wrong type of attribute hanging around should the user hit submit right after
        searchDetails.searchType = newSearchType;
        setSearchDetails({...searchDetails, searchType: newSearchType, searchAttribute: newSearchType.findByOptions[0]});
    }

    const sendSearch = () => {
        //THe outlet will then determine whoes search class gets called. Theoreticalyl forced typeable wrong paths should just return no search value theoreticalyl if we play
        //our cards right with ye-olde node serarch implementation.
        //console.log(searchParams, "searchParams");
        //let test;
        //const searchParamKVP
        //console.log(searchParamKVP);
        //setSearchParams(searchParamKVP);
        //
        navigate(`/appendre/search/${searchDetails.searchType.subPath}/0/${PAGE_SIZE}?${searchDetails.searchAttribute.attribute}=${searchDetails.searchValue}`);
    }


    return(
        <div>
            {console.log([...searchParams])}
            <div className= "row col-auto form-group">
                <div className= "input-group mb-3">
                    {/*{console.log(searchParams.searchType.label, "Search Type")}*/}
                    {/*{console.log(searchParams.searchAttribute.label, "Search Params")}*/}
                    {/*{console.log(searchParams.searchValue, "Search Value")}*/}
                    {/*<label htmlFor="searchType" className="form-label mt-4">Search For:</label>*/}
                    <div>
                    <select className="form-select" id="searchType" onChange={(event) => changeSearchType(event.target.value)}>
                        <option value={JSON.stringify(SearchType.letterSearch)}>{SearchType.letterSearch.label}</option>
                        <option value={JSON.stringify(SearchType.userSearch)}>{SearchType.userSearch.label}</option>
                    </select>
                    </div>


                    {/*<label htmlFor="exampleSelect1" className="form-label mt-4">Find By:</label> maybe shold make terminology a little mreo consitent in teh future, not sure yet.*/}
                    <div>
                    <select className="form-select" id="attributeSelect" onChange={(event) => changeSearchAttribute(event.target.value)}>
                        {console.log(searchDetails.searchType.findByOptions)}
                        {searchDetails.searchType.findByOptions.map(
                            (attribute) => {
                                return (
                                    <option value={JSON.stringify(attribute)} key={attribute.attribute}>{attribute.label && attribute.label}</option>
                                );
                            })
                        }
                    </select>
                    </div>


                    <input className= "form-control rounded-pill-right ml-n5 " id="search-bar" type="text" placeholder={languagePreference.searchAppendre}
                           onChange={(event => setSearchDetails({...searchDetails, searchValue: event.target.value}))}/>
                    {/*Empty params in sendSearch called by on click made it fire anytime the component rerednered? Huhmmmm, I wonder what's up with that. Why does that make a difference?
                                Some sort of like closure thing making the whole thing part of the function/ element maybe. IDK, hmmmmmm. Maybe want to look into this more later, we do
                                seem to run into this issue sometimes.*/}
                    <button className="btn btn-outline-primary pr-n5" type="button" onClick={sendSearch}>
                        <i className="fas fa-search" style={{"color": "pink"}}></i>
                    </button>
                    {/*This is more of a links menu/ hamburger navigation esk feeling thing that would be better suited to a list of links (as per the examples), or as a
                            set up butttons jsut following the drop down form set of defined styles which would nicely formate them. For what we are doing here/ our purposese I think a taditional form select makes more sense
                            since care a fair deal about the value contained within it. */}
                    {/*<div className="nav nav-pills">*/}
                    {/*    <li className="nav-item dropdown">*/}
                    {/*        <button className="nav-link dropdown-toggle active" data-bs-toggle="dropdown"*/}
                    {/*                role="button" aria-haspopup="true" aria-expanded="true">{selectedFilter.text}</button>*/}
                    {/*        /!*<div className="dropdown-menu">*!/*/}
                    {/*        /!*    <div className="dropdown-item"></div>*!/*/}
                    {/*        /!*    <option className="dropdown-item" value={LetterFilters.title.value}>{LetterFilters.title.display}</option>*!/*/}
                    {/*        /!*    /!*<option className="dropdown-item" value={LetterFilters.text}>{LetterFilters.text}</option>*!/*!/*/}
                    {/*        /!*    /!*<option className="dropdown-item" value={LetterFilters.tag}>{LetterFilters.tag}</option>*!/*!/*/}
                    {/*        /!*    /!*<option className="dropdown-item" value={LetterFilters.author}>{LetterFilters.author}</option>*!/*!/*/}
                    {/*        /!*    /!*<option className="dropdown-item" value={LetterFilters.date}>{LetterFilters.date}</option>*!/*!/*/}
                    {/*        /!*    <div className="dropdown-divider"></div>*!/*/}
                    {/*        /!*    <option className="dropdown-item">Separated link</option>*!/*/}
                    {/*        /!*</div>*!/*/}
                    {/*    </li>*/}
                    {/*</div>*/}

                </div>
            </div>
            {/*<h1>Search Results</h1>*/}
            {/*Passes query params go here need to pass using options option, or sufficient enough just for it to be abel to grab it from query params as a sub component of this link? I think the second one most likely/ maybe/ hopefully!*/}
            <Outlet/>
        </div>
    );
}

export default Search