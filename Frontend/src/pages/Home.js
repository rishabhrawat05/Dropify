import { useState, useEffect } from 'react';
import Base from '../components/Base';
import AllProducts from '../components/AllProducts';
import { BASE_URL } from '../services/helper';
import axios from 'axios';
import Pagination from '../components/Pagination';
import { Input } from 'reactstrap';
import { searchProductByName } from '../services/product_service';

const Home = () => {
    useEffect(() => {
        document.title = "Dropify";
    }, []);

    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState([]);
    const [searchProduct, setSearchProduct] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8);
    const [search, setSearch] = useState("");

    const handleChange = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    const getAllProducts = () => {
        setLoading(true);
        axios.get(`${BASE_URL}/api/products`)
            .then((response) => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    const fetchSearchProducts = (keyword) => {
        setLoading(true);
        searchProductByName(keyword)
            .then((data) => {
                setSearchProduct(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    useEffect(() => {
        if (search === "") {
            getAllProducts();
        } else {
            fetchSearchProducts(search);
        }
    }, [search,currentPage]);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = product.slice(firstPostIndex, lastPostIndex);
    const currentSearchPosts = searchProduct.slice(firstPostIndex, lastPostIndex);

    return (
        <div className='overflow-hidden'>
            <Base />
            <div style={{ marginTop: '2%', position: 'relative', left: '50%', transform: 'translate(-50%)', display: 'flex', alignItems: 'center', width: '50%', justifyContent: 'space-around' }}>
                <Input
                    placeholder='Search here...'
                    style={{ border: '1px solid grey', borderRadius: '50px', width: '93%', height: '100%', outline: 'none', }}
                    value={search}
                    onChange={handleChange}
                />
                
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : search === "" ? (
                <AllProducts product={currentPosts} loading={loading} />
            ) : (
                <AllProducts product={currentSearchPosts} loading={loading} />
            )}
            <Pagination
                totalPosts={search === "" ? product.length : searchProduct.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </div>
    );
};

export default Home;
