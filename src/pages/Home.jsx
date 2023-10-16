import { useSelector } from "react-redux";
import styled from "styled-components";
import { Carousel, Login, Signup } from "../components";

/**
 * DISPLAYS THE IMAGE CAROUSAL
 * ALLOWS USER TO NAVIGATE TO PRODUCTS PAGE
 */

const Home = () => {
    const { isLoginModalOpen, isSignupModalOpen } = useSelector((store) => store.ui);
    return (
        <main>
            {/* <FeaturedProducts /> */}
            <Carousel />
            {isLoginModalOpen && <Login />}
            {isSignupModalOpen && <Signup />}
        </main>
    );
}

const Wrapper = styled.section`

`;

export default Home;