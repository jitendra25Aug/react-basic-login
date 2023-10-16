import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Filter, Loading, ProductList, SingleProduct } from "../components";
import { productsSliceActions } from "../store/products/productsSlice";
import { fetchData } from "../utils/api";
import { rootUrl } from "../utils/constant";

/**
 * FETCHES AND DISPLAYS THE PRODUCTS
 */

const Products = () => {
    const { filtered_products, isLoading, isError } = useSelector((store) => store.products);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProducts = async () => {
            dispatch(productsSliceActions.setError(false));
            dispatch(productsSliceActions.setLoading(true));
            try {
                const { data } = await fetchData(rootUrl);
                dispatch(productsSliceActions.setProducts(data));
            } catch (error) {
                dispatch(productsSliceActions.setError(true));
            }
            dispatch(productsSliceActions.setLoading(false));
        }
        fetchProducts();
    }, []);

    if (isLoading) {
        return (
            <main>
                <Loading />
            </main>
        )
    }
    if (isError) {
        return (
            <main>
                <div className="section-center">
                    <p>Something went wrong..</p>
                </div>
            </main>
        );
    }

    return (
        <main>
            <Wrapper className="section-center">
                <Filter />
                <ProductList />
                <SingleProduct />
            </Wrapper>
        </main>
    );
}

const Wrapper = styled.div`
min-height: calc(80vh - 10rem);
margin: 4rem auto;
`;

export default Products;