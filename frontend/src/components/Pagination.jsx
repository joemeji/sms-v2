import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Links(props) {
  const pages =  pagination(props.current, props.totalPages);

  return (
    <ul className="pagination">
      {!props.prevPage ? (
        <li className="page-item disabled">
          <span className="page-link">
            <span aria-hidden="true">Prev</span>
          </span>
        </li>
      ) : (
        <li className="page-item">
          <NavLink
            className="page-link" role="button" 
            activeClassName={`${props.current === props.prevPage ? 'active' : ''}`} 
            to={`${props.path}=${props.prevPage}`}>
            <span aria-hidden="true">Prev</span>
          </NavLink>
        </li>
      )}

      {pages && pages.map((item, key) => (
        <React.Fragment key={key}>
          {item === '...' ? (
            <li className="page-item">
              <button className="page-link">
                <span aria-hidden="true">…</span>
                <span className="sr-only">More</span>
              </button>
            </li>
          ) : (
            <li className="page-item">
              <NavLink className="page-link" role="button"
                activeClassName={`${props.current === item  ? 'active' : ''}`} 
                to={`${props.path}=${item}`}
              >{item}</NavLink>
            </li>
          )}
        </React.Fragment>
      ))}
      {!props.nextPage ? (
        <li className="page-item disabled">
          <span className="page-link">
            <span aria-hidden="true">Next</span>
          </span>
        </li>
      ) : (
        <li className="page-item">
          <NavLink 
            className="page-link" role="button"
            activeClassName={`${props.current === props.nextPage ? 'active' : ''}`} 
            to={`${props.path}=${props.nextPage}`}
          >
            <span aria-hidden="true">Next</span>
          </NavLink>
        </li>
      )}
    </ul>
  );
}

// code ref https://gist.github.com/kottenator/9d936eb3e4e3c3e02598

function pagination(c, m) {
  var current = c,
    last = m,
    delta = 2,
    left = current - delta,
    right = current + delta + 1,
    range = [],
    rangeWithDots = [],
    l;
  for (let i = 1; i <= last; i++) {
    if (i === 1 || i === last || i >= left && i < right) {
      range.push(i);
    }
  }
  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }
  return rangeWithDots;
}
