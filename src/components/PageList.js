import React from "react";
import "./PageList.css";


function PageList(props) {

    function createPages(n) {
        var elements = [];
        for (let i = 0; i < n; i++) {
            if (props.currentPage === i + 1) {
                elements.push(<a key={i} value={i + 1}>{i + 1}</a>);
            }
            else {
                elements.push(<a key={i} onClick={props.changePage} value={i + 1} href="#">{i + 1}</a>);
            }
        }
        return elements;
    }


    return (<div className="pagelist-wrapper">{createPages(props.pages)}</div>);

}
export default PageList;