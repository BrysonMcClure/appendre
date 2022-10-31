import React, {useEffect, useState} from "react";

/*
LinkStub: A link to a page following the format /content/:start/:end
ListSize(int): The total size of the list this pagination is managing
ElementsPerPage(int): How many items should appear on page, determines how many pages pagination returns
CurrentStartIndex (int): The lower bound in the range of elements being displayed currently, used in conjunction with provided buffer size to determine currently occupied page
 */
const Pagination = ({linkStub, listSize, elementsPerPage, currentStartIndex}) => {

    const currentPage = currentStartIndex / elementsPerPage;

    const numberOfPages = Math.ceil((listSize / elementsPerPage));

    const startIndex = (page) => {
        return page * elementsPerPage;
    }

    const endIndex = (page) => {
        return (page + 1) * elementsPerPage;
    }

    const pageLinks = () => {
        console.log(numberOfPages);
        //return(<h1>hiii</h1>);
        let toReturn = [];
        for (let i = 0; i < numberOfPages; i ++) {
            console.log("screw you");
            toReturn.push(
                <li className="page-item">
                    <a className={`page-link ${currentPage === (i) ? "active" : ""}`} href={`${linkStub}/${startIndex(i)}/${endIndex(i)}`}>{i + 1}</a>
                </li>
            );
            //toReturn.push(`${linkStub}/${startIndex(i)}/${endIndex(i)}`);
        }
        return toReturn;
    }

    let stuff = pageLinks();

    //Apears to not be strictly necessary in this case, but I have been burned by this before and It does not appear to be hurting anything so I am going to keep it in here for now.
    useEffect(() => {
        async function hello () {
            stuff = await pageLinks();
        }
        return hello;
        }, []);

    //Lets look back at those text box examples we looked at for tuiter later on how to do this disabled stuff
    //I think that stuff makes a little more sense now in the context of what we are doing/ have learned now.
    return(
        <ul className="pagination pagination-lg">
            <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
                <a className="page-link" href={`${linkStub}/${startIndex(currentPage-1)}/${endIndex(currentPage-1)}`}>&laquo;</a>
            </li>
            {
                // stuff && stuff.map((pageLink) => {
                //     return(
                //         <li className="page-item">
                //             <a className= "page-link" href={pageLink}>lala</a>
                //         </li>);
                // })
                stuff
            }
            <li className={`page-item ${currentPage === numberOfPages - 1 ? "disabled" : ""}`}>
                <a className="page-link" href={`${linkStub}/${startIndex(currentPage+1)}/${endIndex(currentPage+1)}`}>&raquo;</a>
            </li>
        </ul>
    );
};

export default Pagination;