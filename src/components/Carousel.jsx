import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { carousel_products } from "../data/data";

/**
 * DISPLAYS THE IMAGE CAROUSAL FOR HOME PAGE
 */

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        let newIndex = (currentIndex - 1 + carousel_products.length) % carousel_products.length;
        setCurrentIndex(newIndex);
    }
    const nextSlide = () => {
        let newIndex = (currentIndex + 1) % carousel_products.length;
        setCurrentIndex(newIndex);
    }

    useEffect(() => {
        const intervalId = setInterval(() => { nextSlide(); }, 3000);
        return () => { clearInterval(intervalId) };
    }, [currentIndex]);

    return (
        <Wrapper className="section">
            <div className="title">
                <h2>featured products</h2>
                <div className="underline"></div>
            </div>
            <div className="section-center slider-container">
                {carousel_products.map((product, productIndex) => {
                    const { id, image } = product;
                    return (
                        <article key={id} className="slide" style={{
                            transform: `translateX(${100 * (productIndex - currentIndex)}%)`,
                            opacity: productIndex === currentIndex ? '1' : '0',
                            visibility: productIndex === currentIndex ? 'visible' : 'hidden'
                        }}>
                            <img src={image} alt="coffee" className="carousel-img" />
                        </article>
                    )
                })}
                <button type="button" className="prev" onClick={prevSlide}><FiChevronLeft /></button>
                <button type="button" className="next" onClick={nextSlide}><FiChevronRight /></button>
            </div>
            <Link to="/products" className="btn">all products</Link>
        </Wrapper>
    );
}

const Wrapper = styled.section`
background-color: var(--clr-grey-10);
margin: 4rem auto;
.title {
    text-align: center;
}
.title .underline {
    width: 6rem;
    height: 0.25rem;
    background: var(--clr-primary-5);
    margin-left: auto;
    margin-right: auto;
}

.slider-container{
    margin: 4rem auto;
    width: 80vw;
    position: relative;
    height: 450px;
    overflow: hidden;
}

.slide{
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition);
}

.carousel-img{
    width: 85%;
    height: 100%;
    object-fit: cover;
    box-shadow: var(--light-shadow);
    border-radius: var(--radius);
}

.prev, .next{
    position: absolute;
    top: 200px;
    background-color: var(--grey-500);
    color: var(--white);
    width: 1.25rem;
    height: 1.25rem;
    display: grid;
    place-items: center;
    border-color: transparent;
    border-radius: var(--borderRadius);
    cursor: pointer;
    transition: var(--transition);
}

.prev:hover, .next:hover{
    background-color: var(--primary-500);
}

.prev{
    left: 0;
}

.next{
    right: 0;
}

@media screen and (min-width:800px) {
    .prev, .next{
        width: 2rem;
        height: 2rem;
        font-size: 1.5rem;
    }
}

.btn{
    display: block;
    width: 148px;
    text-align: center;
    margin: 0 auto;
}

.next-slide{
    transform: translateX(100%);
}

`;

export default Carousel;