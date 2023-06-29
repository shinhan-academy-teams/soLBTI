import { useEffect, useState } from "react";
import ReactSimplyCarousel from "react-simply-carousel";
import axios from "axios";

function CarouselComponent(props) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [cardurl, setCardurl] = useState([]);
  useEffect(() => {
    axios({
      url: "/cardCarousel",
      method: "get",
    })
      .then((response) => {
        console.log(response.data);
        setCardurl(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <ReactSimplyCarousel
        autoplay={true}
        activeSlideIndex={activeSlideIndex}
        onRequestChange={setActiveSlideIndex}
        itemsToShow={1}
        itemsToScroll={1}
        responsiveProps={[
          {
            itemsToShow: 3,
            itemsToScroll: 1,
            minWidth: 1500,
          },
        ]}
        speed={400}
        easing="linear"
        autoplayDelay={800}
      >
        {/* here you can also pass any other element attributes. Also, you can use your custom components as slides */}

        {cardurl.map((item) => (
          <div
            style={{
              width: 200,
              height: 350,
              background: "#EFEFFB",
              borderRadius: "8%",
              margin: "1rem",
            }}
          >
            {/* {item} */}
            <img
              src={item}
              style={{
                width: 316,
                height: 200,
                transform: "rotate(90deg)",
              }}
            />
          </div>
        ))}
      </ReactSimplyCarousel>
    </div>
  );
}

export default CarouselComponent;
