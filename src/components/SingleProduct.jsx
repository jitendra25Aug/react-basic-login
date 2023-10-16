import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { formatPrice, getUniqueValues } from "../utils/helper";
import { useEffect, useState } from "react";
import { fetchData } from "../utils/api";
import { rootUrl } from "../utils/constant";
import { productsSliceActions } from "../store/products/productsSlice";
import axios from "axios";

/**
 * DISPLAYS THE DETAILS ABOUT A SIGNLE PRODUCT
 * ALLOWS USER TO UPDATE THE PRODUCT INFORMATION
 */

const SingleProduct = () => {
    const { products, currentProductId, isViewOnly } = useSelector((store) => store.products);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [isError, setIsError] = useState(false);
    const dispatch = useDispatch();
    const product_categories = getUniqueValues('category', products);

    const fetchSingleProduct = async () => {
        setIsError(false);
        try {
            const { data } = await fetchData(`${rootUrl}/${currentProductId}`);
            setCurrentProduct(data);
        } catch (error) {
            setIsError(true);
        }
    }

    useEffect(() => {
        if (currentProductId) {
            fetchSingleProduct();
        }
    }, [currentProductId]);

    if (!currentProductId) {
        return;
    }
    if (isError) {
        return (
            <Wrapper>
                <p>Try again...</p>
            </Wrapper>
        );
    }

    const handleChange = (e) => {
        setCurrentProduct({ ...currentProduct, [e.target.name]: e.target.value });
    }

    const closeModal = () => {
        dispatch(productsSliceActions.setIsViewOnly(false));
        dispatch(productsSliceActions.setCurrentProductId(null));
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${rootUrl}/${currentProduct.id}`, { ...currentProduct });
            console.log("resp : ", response);
        } catch (error) {
            console.log("error ", error.response);
        }
        console.log("event data : ", currentProduct);
        dispatch(productsSliceActions.updateProduct({ id: currentProduct.id, data: { ...currentProduct } }));
        dispatch(productsSliceActions.setIsViewOnly(false));
        dispatch(productsSliceActions.setCurrentProductId(null));
    }
    return (
        <Wrapper>
            {currentProduct &&
                <div className="modal-overlay">
                    <div className="modal-container">
                        <article>
                            <div>
                                <img src={currentProduct.image} alt={currentProduct.title} />
                                <div className={`${isViewOnly ? "disable-url" : "form-row"}`}>
                                    <label htmlFor="image" className='form-label'>URL </label>
                                    <input type="url" name="image" id="image" value={currentProduct.image} onChange={handleChange} />
                                </div>
                            </div>
                            {
                                isViewOnly ?
                                    (
                                        <div>
                                            <h4>{currentProduct.title}</h4>
                                            <h5 className="price">{formatPrice(currentProduct.price)}</h5>
                                            <p>{currentProduct.description}</p>
                                            <p className="category">{currentProduct.category}</p>
                                        </div>
                                    ) :
                                    (
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-row">
                                                <label htmlFor="title" className='form-label'>title </label>
                                                <input type="text" name="title" id="title" value={currentProduct.title} onChange={handleChange} />
                                            </div>
                                            <div className="form-row">
                                                <label htmlFor="price" className='form-label'>price </label>
                                                <input type="number" min="1" step="0.01" name="price" id="price" value={currentProduct.price}
                                                    onChange={handleChange} />
                                            </div>
                                            <div className="form-row">
                                                <label htmlFor="description" className='form-label'>description </label>
                                                <textarea name="description" id="description" cols="30" rows="2" value={currentProduct.description} onChange={handleChange}></textarea>
                                            </div>
                                            <div className="form-row">
                                                <label htmlFor='category' className='form-label'>category </label>
                                                <select name="category" id="category" value={currentProduct.category} onChange={handleChange}>
                                                    {product_categories.map((category) => {
                                                        if (category !== "all")
                                                            return <option key={category}>{category}</option>
                                                    })}
                                                </select>
                                            </div>
                                            <button type="submit" className="btn">update</button>
                                        </form>
                                    )
                            }
                        </article>
                        <button type="button" className="close-modal-btn" onClick={closeModal}><FaTimes /> </button>
                    </div>
                </div>
            }
        </Wrapper>
    );
}

const Wrapper = styled.section`
.modal-container{
    width: 90vw;
    padding: 2rem;
    height: auto;
    place-items: inherit;
}

img{
    display: block;
    width: 200px;
    height: 150px;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: 1rem;
}
.disable-url{
    display: none;
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

.btn{
    font-size: 0.6rem;
    padding: 0.25rem 0.5rem;
}


@media screen and (min-width: 992px){
    .modal-container{
        width: 70vw;
        height: 60vh;
    }
    article{
        display: grid;
        grid-template-columns: auto 1fr;
        column-gap: 3rem;
        align-items: center;
    }
    img{
        margin-top: 1rem;
    }
}
`;

export default SingleProduct;