import React from 'react';
import '../css/Pagination.css';

const Pagination = ({ totalPosts, postsPerPage, setCurrentPage, currentPage }) => {
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    let pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className='pagination' style={{ textAlign: 'center', margin: '30px 0' }}>
            {pages.map((page, index) => (
                <button
                    key={index}
                    className={page === currentPage ? 'active' : ''}
                    onClick={() => handlePageChange(page)}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
