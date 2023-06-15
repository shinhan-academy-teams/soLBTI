import { PayProvider } from "context/Date";
import React from "react";
import PaymentList from "mypage/PaymentList";

function PaymentApp(props) {
  return (
    <div>
      <PayProvider>
        <PaymentList> </PaymentList>
      </PayProvider>
    </div>
  );
}

export default PaymentApp;
