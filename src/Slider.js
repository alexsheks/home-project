import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const CardSlider = ({ responseValue }) => {
  let settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };
  //   let answer = responseValue.context.split(" ");

  return (
    <Carousel {...settings}>
      {responseValue.slice(0, 20).map((book, key) => {
        return (
          <Wrap key={key}>
            <div style={{ textAlign: "center", paddingBottom: "10px" }}>
              TITLE
            </div>
            <div style={{ cursor: "pointer" }}>
              {book.context.split(" ").slice(0, book.answer.first).join(" ") +
                " "}
              <span style={{ color: "red" }}>
                {"" +
                  book.context
                    .split(" ")
                    .slice(book.answer.first, book.answer.second)
                    .join(" ") +
                  " "}
              </span>
              {"" +
                book.context
                  .split(" ")
                  .slice(book.answer.second, book.context.split(" ").length)
                  .join(" ")}
            </div>
            <Score>{book.score}</Score>
          </Wrap>
        );
      })}
    </Carousel>
  );
};

// const Con = styled.div`
//   background-color: white;
//   background-image: url("/images/slider-badging.jpg");
//   width: 100%;
//   height: 100%;
//   img {
//     width: 100%;
//     height: 100%;
//   }
// `;
const Carousel = styled(Slider)`
  width: 86%;
  height: 80%;
  position: relative;
  padding: 0px;
  & > button {
    opacity: 0.5;
    height: 100%;
    width: 5vw;
    z-index: 1;

    &:hover {
      opacity: 1;
      transition: opacity 0.2s ease 0s;
    }
  }

  /* .slick-list {
    height: 80%;
    position: relative;
  } */

  ul li button {
    &:before {
      font-size: 10px;
      color: rgb(150, 158, 171);
    }
  }
  ul {
    position: relative;
  }
  li.slick-active button:before {
    color: white;
  }

  /* .slick-list {
    overflow: initial;
  } */

  .slick-prev {
    left: -75px;
  }

  .slick-next {
    right: -75px;
  }
`;

const Wrap = styled.div`
  /* cursor: pointer; */
  position: relative;
  height: 500px;
  margin-top: 25px;
  margin-bottom: -10px;
  padding: 25px;
  border-radius: 15px;
  color: white;
  font-size: 18px;
  padding-top: 20vh;

  /* a {
    border-radius: 4px;
    box-shadow: rgb(255 255 255 / 69%) 0px 26px 30px -10px,
      rgb(255 255 255 / 73%) 0px 16px 10px -10px;
    cursor: pointer;
    display: block;
    position: relative; */
  /* padding: 4px; */

  /* img {
    border-radius: 5px;
    width: 100%;
    height: 100%;
  } */

  /* &:hover {
      padding: 0;
      border: 3px solid rgba(249, 249, 249, 0.8);
      transform: scale(1.02);
      z-index: 5;
      box-shadow: rgb(0 255 255 / 69%) 0px 26px 30px -10px,
        rgb(0 255 255 / 73%) 0px 16px 10px -10px,
        rgb(0 255 255 / 69%) 0px 6px 30px -10px;
    } */
  /* } */
`;
const Score = styled.div`
  margin-top: 20px;
  text-align: center;
`;
export default CardSlider;
