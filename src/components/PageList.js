import React from 'react';
import PropTypes from 'prop-types';

import './PageList.css';

function PageList(props) {
  const { pages, currentPage, changePage } = props;

  function createPages(n) {
    const elements = [];
    for (let i = 0; i < n; i += 1) {
      if (currentPage === i + 1) {
        elements.push(<a key={i} value={i + 1}>{i + 1}</a>);
      } else {
        elements.push(<a key={i} onClick={changePage} value={i + 1} href="#">{i + 1}</a>);
      }
    }
    return elements;
  }

  return (<div className="pagelist-wrapper">{createPages(pages)}</div>);
}

PageList.propTypes = {
  pages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
};

export default PageList;
