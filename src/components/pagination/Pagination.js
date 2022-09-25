import React from 'react';
import "./Pagination.css"
import { CgChevronDoubleLeftO, CgChevronLeftO, CgChevronRightO, CgChevronDoubleRightO } from "react-icons/cg";
const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  if (currentPage > pageNumbers.length) {
    paginate(1)
  }
  return (
    <nav>
      <ul className='pagination'>
        <li className='page-item'>
          <CgChevronDoubleLeftO
            size={40}
            color="#455CC7"
            className='pafinationIcon'
            onClick={() => paginate(currentPage - 2000)}
          ></CgChevronDoubleLeftO>
        </li>
        <li className='page-item'>
          <CgChevronLeftO
            size={40}
            color="#455CC7"
            className='pafinationIcon'
            onClick={() => paginate(currentPage - 10)}>
          </CgChevronLeftO>
        </li>
        <li className='page-item'>
          <CgChevronRightO
            size={40}
            onClick={() => paginate(currentPage + 10)}
            color="#455CC7">
          </CgChevronRightO>
        </li>
        <li className='page-item'>
          <CgChevronDoubleRightO
            size={40}
            onClick={() => paginate(currentPage + 2000)}
            color="#455CC7">
          </CgChevronDoubleRightO>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
