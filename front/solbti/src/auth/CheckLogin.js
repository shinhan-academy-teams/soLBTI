const { useCookies } = require("react-cookie");

function CheckLogin() {
  const [cookies] = useCookies(["accessToken", "memId"]);

  const cookieValue = cookies.accessToken;

  return !!cookieValue; // 토큰이 존재하면 로그인 상태로 간주합니다.
}

export default CheckLogin;
