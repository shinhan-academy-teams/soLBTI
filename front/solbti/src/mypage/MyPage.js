import React, { setFile, useState, useRef } from "react";
import styles from "Mypage.css";
import RecommendCard from "./RecommendCard";

function MyPage(props) {
  const [image, setImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const fileInput = useRef(null);

  const onChange = (e) => {
    if (e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(selectedFile);
    } else {
      // If the upload is canceled
      setImage(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      );
    }
  };

  return (
    <div className="text-center">
      <button type="button" className="btn btn-dark btn-block">
        since {"가입일 불러오기"}
      </button>

      <img
        className={styles.MyPage}
        src={image}
        alt="Profile"
        style={{
          margin: "50px",
        }}
        width={200}
        height={200}
        onClick={() => {
          fileInput.current.click();
        }}
      />
      <span style={{ marginLeft: "20px" }}>나의 신한 포인트</span>
      <span style={{ marginLeft: "20px" }}>10000</span>
      <input
        type="file"
        style={{ display: "none" }}
        accept="image/jpg,image/png,image/jpeg"
        name="profile_img"
        onChange={onChange}
        ref={fileInput}
      />
      <div className="col-4 col-sm-6">
        <h2>이번달 지출 내역을 통한 추천 카드</h2>
        <h2>지출금액: </h2>
        <RecommendCard></RecommendCard>
      </div>
    </div>
  );
}
export default MyPage;
