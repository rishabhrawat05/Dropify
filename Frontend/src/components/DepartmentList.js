import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

const DepartmentList = ({ onSelectCategory }) => {
    const categories = [
        'Electronics',
        "Men's Fashion",
        "Women's Fashion",
        'Jewellery',
        "Kids Fashion"
    ];

    return (
        <div>
            <ListGroup style={{ margin: '10px',width:'25%',marginRight:'100px',position:'fixed'}}>
                {categories.map((category, index) => (
                    <ListGroupItem key={index} onClick={() => onSelectCategory(category)} >
                        {category}
                    </ListGroupItem>
                ))}
            </ListGroup>
        </div>
    );
};

export default DepartmentList;
