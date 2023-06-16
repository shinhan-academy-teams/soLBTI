import React, { setFile, useState, useRef, useEffect } from "react";
import styles from "Mypage.css";
import { Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

function MyPage(props) {
  const [cookies] = useCookies(["memCode"]);
  const [member, setMember] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: `/auth/member-info.do/${cookies.memCode}`,
    })
      .then((res) => {
        setMember(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
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
        since{" "}
        {member.created
          ? member.created.substring(0, member.created.indexOf("T"))
          : " "}
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
      <span style={{ marginLeft: "20px" }}>{member.memPoint}</span>
      <input
        type="file"
        style={{ display: "none" }}
        accept="image/jpg,image/png,image/jpeg"
        name="profile_img"
        onChange={onChange}
        ref={fileInput}
      />
      <Outlet />
    </div>
  );
}
export default MyPage;
