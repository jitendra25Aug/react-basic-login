import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { productsSliceActions } from "../store/products/productsSlice";
import { rootUrl } from "../utils/constant";
import { formatPrice } from "../utils/helper";

/**
 * DISPLAYS ALL THE PRODUCTS FETCHED VIA API
 * ALLOWS USER TO VIEW, UPDATE, OR DELETE THE PRODUCT
 */

const ProductList = () => {
    const { filtered_products } = useSelector((store) => store.products);
    const dispatch = useDispatch();

    const handleView = (id) => {
        dispatch(productsSliceActions.setIsViewOnly(true));
        dispatch(productsSliceActions.setCurrentProductId(id));
    }
    const handleUpdate = (id) => {
        dispatch(productsSliceActions.setIsViewOnly(false));
        dispatch(productsSliceActions.setCurrentProductId(id));
    }
    const handleDelete = async(id) => {
        try {
            const response = await axios.delete(`${rootUrl}/${id}`);
            console.log("resp : ", response);
        } catch (error) {
            console.log("error ", error.response);
        }
        dispatch(productsSliceActions.deleteProduct({id}));
    }

    if (filtered_products.length < 1) {
        return <h4 style={{ textTransform: 'none' }}>Sorry, no products matched your search..</h4>
    }

    return (
        <Wrapper>
            {filtered_products.map((product) => {
                const { id, title, price, description, image, category } = product;
                return (
                    <article key={id}>
                        <img src={image} alt={title} />
                        <div>
                            <h4>{title}</h4>
                            <h5 className="price">{formatPrice(price)}</h5>
                            <p>{description.substring(0, 150)}...</p>
                            <p className="category">{category}</p>
                            <div className="action-btns">
                                <button type="button" onClick={() => { handleView(id) }} className="btn">View</button>
                                <button type="button" onClick={() => { handleUpdate(id) }} className="btn">Update</button>
                                <button type="button" onClick={() => { handleDelete(id) }} className="btn">Delete</button>
                            </div>
                        </div>
                    </article>
                )
            })}
        </Wrapper>
    );
}

const Wrapper = styled.section`
display: grid;
row-gap: 3rem;
img{
    display: block;
    width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: 1rem;
}
h4{
    margin-bottom: 0.5rem;
}

.price{
    color: var(--clr-primary-5);
    margin-bottom: 0.75rem;
}

.category{
    text-transform: uppercase;
    font-weight: bold;
}

p{
    max-width: 45em;
    margin-bottom: 1rem;
}

.action-btns{
    display: flex;
    align-items: center;
    gap: 1rem;
}

.btn{
    font-size: 0.6rem;
    padding: 0.5rem 0.75rem;
}

@media screen and (min-width: 992px){
    article{
        display: grid;
        grid-template-columns: auto 1fr;
        column-gap: 2rem;
        align-items: center;
    }
}
`;

export default ProductList;