import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { productsSliceActions } from "../store/products/productsSlice";
import { fetchData } from "../utils/api";
import { rootUrl } from "../utils/constant";
import { getUniqueValues } from "../utils/helper";

/**
 * ALLOWS USER TO FILTER PRODUCT RESULTS USING SEARCH OR BY CHOOSING PRODUCT CATEGORY
 */

const Filter = () => {
    const [searchValue, setSearchValue] = useState('');
    const [categoryValue, setCategoryValue] = useState('all');
    const { products, filtered_products, sort_value } = useSelector((store) => store.products);
    const dispatch = useDispatch();
    const product_categories = getUniqueValues('category', products);

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
        dispatch(productsSliceActions.filterProducts({filterName: 'search', value: e.target.value}));
    }
    const handleSort = async (e) => {
        dispatch(productsSliceActions.setError(false));
        dispatch(productsSliceActions.setLoading(true));
        try {
            const { data } = await fetchData(`${rootUrl}?sort=${e.target.value}`);
            dispatch(productsSliceActions.setProducts(data));
        } catch (error) {
            console.log("error : ", error);
            dispatch(productsSliceActions.setError(true));
        }
        dispatch(productsSliceActions.setLoading(false));

        dispatch(productsSliceActions.sortProduct(e.target.value));
    }

    const handleCategory = (e)=>{
        setCategoryValue(e.target.value);
        dispatch(productsSliceActions.filterProducts({filterName: e.target.value, value: e.target.value}))
    }
    return (
        <Wrapper>
            <div>
                <input type="text" name="text" placeholder="search" className="search-input" value={searchValue} onChange={handleSearch} />
            </div>
            <form>
                {/* <label htmlFor="category">categories</label> */}
                <select name="category" id="category" className="category-input" value={categoryValue} onChange={handleCategory} >
                    {product_categories.map((category) => {
                        return <option key={category}>{category}</option>
                    })}
                </select>
            </form>
            <hr />
            <form>
                <label htmlFor="sort">sort by</label>
                <select name="sort" id="sort" className="sort-input" value={sort_value} onChange={handleSort} >
                    <option value="asc">ascending</option>
                    <option value="desc">descending</option>
                </select>
            </form>
        </Wrapper>
    );
}

const Wrapper = styled.section`
display: grid;
grid-template-columns: auto auto 1fr auto;
align-items: center;
column-gap: 2rem; 
margin-bottom: 2rem;

@media screen and (max-width: 576px){
    grid-template-columns: 1fr;
    row-gap: 0.75rem;
    label{
        display: inline-block;
        margin-right: 0.5rem;
    }
}

@media screen and (min-width: 768px){
    column-gap: 2rem;
}

.search-input{
    background-color: var(--clr-grey-10);
    border-color: transparent;   
    padding: 0.5rem;
    letter-spacing: var(--spacing);
    border-radius: var(--radius);
}
.search-input::placeholder{
    text-transform: capitalize;
}

p{
    text-transform: capitalize;
    margin-bottom: 0;
}

.sort-input, .category-input{
    border-color: transparent;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
}
.category-input{
    border: 1px solid var(--clr-grey-6);
    border-radius: var(--radius);
}
label{
    font-size: 1rem;
    text-transform: capitalize;
}
`;

export default Filter;