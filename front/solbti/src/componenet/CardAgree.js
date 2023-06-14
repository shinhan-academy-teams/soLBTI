import React from "react";
import "componenet/CardAgree.css";

const CardAgree = () => {
  return (
    <form action id="joinForm">
      <ul className="join_box">
        <li className="checkBox check01">
          <ul className="clearfix">
            <li>
              이용약관, 개인정보 수집 및 이용, 위치정보 이용약관(선택), 프로모션
              안내 메일 수신(선택)에 모두 동의합니다.
            </li>
            <li className="checkAllBtn">
              <input
                type="checkbox"
                name="chkAll"
                id="chk"
                className="chkAll"
              />
            </li>
          </ul>
        </li>
        <li className="checkBox check02">
          <ul className="clearfix">
            <li>이용약관 동의(필수)</li>
            <li className="checkBtn">
              <input type="checkbox" name="chk" />
            </li>
          </ul>
          <textarea
            name
            id
            defaultValue={
              "여러분을 환영합니다.\n신한카드를 이용해 주셔서 감사합니다. 본 약관은 다양한 신한카드 서비스의 이용과 관련하여 신한카드 서비스를 제공하는 신한카드(이하 ‘신한카드’)와 이를 이용하는 신한카드 서비스 회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 네이버 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다.\n       "
            }
          />
        </li>
        <li className="checkBox check03">
          <ul className="clearfix">
            <li>개인정보 수집 및 이용에 대한 안내(필수)</li>
            <li className="checkBtn">
              <input type="checkbox" name="chk" />
            </li>
          </ul>
          <textarea
            name=""
            id=""
            defaultValue={
              "여러분을 환영합니다.\n신한카드를 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한 신한카드를 서비스의 이용과 관련하여 신한카드를 서비스를 제공하는 신한카드(이하 '신한카드')와 이를 이용하는 신한카드 서비스 회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 신한카드 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다.\n       "
            }
          />
        </li>
        <li className="checkBox check03">
          <ul className="clearfix">
            <li>위치정보 이용약관 동의(선택)</li>
            <li className="checkBtn">
              <input type="checkbox" name="chk" />
            </li>
          </ul>
          <textarea
            name=""
            id=""
            defaultValue={
              "여러분을 환영합니다.\n신한카드를 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한 신한카드 서비스의 이용과 관련하여 신한카드 서비스를 제공하는 신한카드(이하 ‘신한카드’)와 이를 이용하는 신한카드 서비스 회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 신한카드 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다.\n       "
            }
          />
        </li>
        <li className="checkBox check04">
          <ul className="clearfix">
            <li>이벤트 등 프로모션 알림 메일 수신(선택</li>
            <li className="checkBtn">
              <input type="checkbox" name="chk" />
            </li>
          </ul>
        </li>
      </ul>
      <ul className="footBtwrap clearfix">
        <li>
          <button className="fpmgBt1">비동의</button>
        </li>
        <li>
          <button className="fpmgBt2">동의</button>
        </li>
      </ul>
    </form>
  );
};
export default CardAgree;
