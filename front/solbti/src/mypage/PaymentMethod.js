import { Checkbox } from "@mui/joy";
import Box from "@mui/joy/Box";
import React, { useState } from "react";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Typography from "@mui/joy/Typography";

function PaymentMethod(props) {
  return (
    <>
      <Box sx={{ width: 343 }}>
        <Typography id="topping" level="body2" fontWeight="lg" mb={2}>
          명세서 받는 방법
        </Typography>
        <Box role="group" aria-labelledby="topping">
          <List
            orientation="horizontal"
            wrap
            sx={{
              "--List-gap": "8px",
              "--ListItem-radius": "20px",
            }}
          >
            {[
              "신한플레이",
              "간편모바일",
              "마이빌앤페이",
              "이메일",
              "미발행",
              "자택",
              "직장",
            ].map((item, index) => (
              <ListItem key={item}>
                <Checkbox overlay disableIcon variant="soft" label={item} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
      <br></br>
      <Box sx={{ width: 343 }}>
        <Typography id="topping" level="body2" fontWeight="lg" mb={2}>
          상품안내장 수령방법
        </Typography>
        <Box role="group" aria-labelledby="topping">
          <List
            orientation="horizontal"
            wrap
            sx={{
              "--List-gap": "8px",
              "--ListItem-radius": "20px",
            }}
          >
            {["카드와 함께 받기", "카카오톡"].map((item, index) => (
              <ListItem key={item}>
                <Checkbox overlay disableIcon variant="soft" label={item} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
      <br></br>
      <Box sx={{ width: 343 }}>
        <Typography id="topping" level="body2" fontWeight="lg" mb={2}>
          카카오톡 공지성 정보 수신동의
        </Typography>
        <Box role="group" aria-labelledby="topping">
          <List
            orientation="horizontal"
            wrap
            sx={{
              "--List-gap": "8px",
              "--ListItem-radius": "20px",
            }}
          >
            {["동의 안함", "동의"].map((item, index) => (
              <ListItem key={item}>
                <Checkbox overlay disableIcon variant="soft" label={item} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </>
  );
}

export default PaymentMethod;
