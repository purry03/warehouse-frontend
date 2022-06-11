import React, { useEffect, useState, Dispatch } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

import './Products.css';

import api from '../api';

import PageList from '../components/PageList';
import Product from '../components/Product';
import { set } from './productsSlice';

function Products() {
  const [productsState, setProductsState] = useState({ products: [] });
  const [productCount, setProductCount] = useState(0);
  const [currentProduct, setCurrentProductState] = useState({ id: 0, selected: false });
  const [currentPage, setCurrentPage] = useState(1);

  const itemsOnPage = useSelector((state:any) => state.products.itemsOnPage);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const listings = await api.listing.getAll();
        setProductCount(listings.length);
        setProductsState({ products: listings });
      } catch (err:any) {
        toast.error(err.toString());
      }
    }
    fetchProducts();
  }, []);

  function gotoProduct(e) {
    const id = e.currentTarget.getAttribute('data-index');
    setCurrentProductState({ id, selected: true });
  }

  function changePage(pageLink) {
    const pgNo = pageLink.currentTarget.getAttribute('value');
    setCurrentPage(parseInt(pgNo, 10));
  }

  function createProducts() {
    const products:JSX.Element[] = [];
    let start = ((currentPage - 1) * itemsOnPage);
    const end = (start + itemsOnPage) < productsState.products.length ? (start + itemsOnPage) : productCount;

    for (; start < end; start += 1) {
      products.push(<Product onClick={gotoProduct} key={productsState.products[start].listing_id} id={productsState.products[start].listing_id} img={productsState.products[start].img} title={productsState.products[start].title} description={productsState.products[start].description} price={productsState.products[start].price} />);
    }
    return products;
  }

  function changeItemCount(e) {
    const val = parseInt(e.target.value, 10) || 0;
    dispatch(set(val));
    setCurrentPage(1);
  }

  if (currentProduct.selected) {
    return (<Navigate to={`/product/${currentProduct.id}`} />);
  }

  return (
    <div className="main-wrapper">
      <h1 className="main-heading">Products</h1>
      <div className="filter-wrapper">
        <label>
          Items Per Page:
          <select onChange={changeItemCount} value={itemsOnPage}>
            <option value={1}>1</option>
            <option value={3}>3</option>
            <option value={5}>5</option>
          </select>
        </label>
      </div>
      <div className="products-wrapper">
        {createProducts()}
      </div>
      <PageList pages={productCount / itemsOnPage} currentPage={currentPage} changePage={changePage} />

    </div>
  );
}

export default Products;
