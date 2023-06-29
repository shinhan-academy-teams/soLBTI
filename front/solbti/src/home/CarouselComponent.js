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
            itemsToShow: 5,
            itemsToScroll: 1,
            minWidth: 1000,
          },
        ]}
        speed={400}
        easing="linear"
        autoplayDelay={1300}
      >
        {/* here you can also pass any other element attributes. Also, you can use your custom components as slides */}

        {cardurl.map((item) => (
          <div
            style={{
              width: 230,
              height: 330,
              borderRadius: "10%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center", // 추가: 세로 축 가운데 정렬을 위해 사용할 수 있습니다.
            }}
          >
            {/* {item} */}
            <img
              src={item}
              style={{
                width: 280,
                height: 180,
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
