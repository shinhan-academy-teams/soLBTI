import React, { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import classNames from "classnames";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as Form from "@radix-ui/react-form";
import "./myinfo.css";
import "./modal.css";
import AddrComponent from "mypage/AddrComponent";

function Myinfo(props) {
  const addr = "경기 양주시 화합로 777";
  const phone_num = "010-4275-7579";

  const [enroll_company, setEnroll_company] = useState({
    address: "",
  });

  const [popup, setPopup] = useState(false);

  const handleInput = (e) => {
    setEnroll_company({
      ...enroll_company,
      [e.target.name]: e.target.value,
    });
  };

  const handleComplete = (data) => {
    setPopup(!popup);
  };

  return (
    <div className="InfoBody">
      <h1 style={{ textAlign: "center", margin: "0 auto" }}>내정보관리</h1>
      <div>
        <Accordion.Root
          className="AccordionRoot"
          type="single"
          collapsible
          defaultValue="item-1"
          style={{ margin: "0 auto" }}
        >
          <Accordion.Item className="AccordionItem" value="item-1">
            <AccordionTrigger> 필수 정보 </AccordionTrigger>

            <AccordionContent>
              필수 정보들을 입력해주세요
              <Form.Root className="FormRoot">
                <Form.Field className="FormField" name="addr">
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                    }}
                  >
                    <Form.Label className="FormLabel">집주소</Form.Label>
                    <Form.Control asChild>
                      <input
                        className="Input"
                        type="text"
                        readOnly
                        value={enroll_company.address}
                        placeholder={addr}
                        onChange={handleInput}
                      />
                    </Form.Control>
                    <button onClick={handleComplete}>
                      {!popup ? "우편번호 찾기" : "닫기"}
                    </button>
                    {popup && (
                      <AddrComponent
                        company={enroll_company}
                        setcompany={setEnroll_company}
                      ></AddrComponent>
                    )}
                  </div>
                </Form.Field>

                <Form.Field className="FormField" name="phone">
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                    }}
                  >
                    <Form.Label className="FormLabel">휴대폰번호</Form.Label>
                    <Form.Control asChild>
                      <input
                        className="Input"
                        type="tel"
                        required
                        value={phone_num}
                        pattern="[0-1]{3}-[0-9]{4}-[0-9]{4}"
                      />
                    </Form.Control>
                  </div>
                  <Form.Message className="FormMessage" match="valueMissing">
                    * 번호를 제대로 입력해주세요
                  </Form.Message>
                  <Form.Message className="FormMessage" match="patternMismatch">
                    * 번호 형식에 맞는지 확인해주세요
                  </Form.Message>
                </Form.Field>

                <Form.Field className="FormField" name="email">
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                    }}
                  >
                    <Form.Label className="FormLabel">Email</Form.Label>
                    <Form.Control asChild>
                      <input className="Input" type="email" required />
                    </Form.Control>
                  </div>
                  <Form.Message className="FormMessage" match="valueMissing">
                    * 이메일을 제대로 입력해주세요
                  </Form.Message>
                  <Form.Message className="FormMessage" match="typeMismatch">
                    * 이메일 형식에 맞는지 확인해주세요
                  </Form.Message>
                </Form.Field>

                {/* <Form.Field className="FormField" name="question">
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                    }}
                  >
                    <Form.Label className="FormLabel">Question</Form.Label>

                    <Form.Control asChild>
                      <textarea className="Textarea" required />
                    </Form.Control>
                  </div>
                  <Form.Message className="FormMessage" match="valueMissing">
                    * 질문을 입력해주세요
                  </Form.Message>
                </Form.Field> */}

                <Form.Submit asChild>
                  <button className="Button" style={{ marginTop: 10 }}>
                    수정하기
                  </button>
                </Form.Submit>
              </Form.Root>
            </AccordionContent>
          </Accordion.Item>

          <Accordion.Item className="AccordionItem" value="item-2">
            <AccordionTrigger> 선택 정보 </AccordionTrigger>

            <AccordionContent>선택 정보들을 입력해주세요</AccordionContent>
          </Accordion.Item>
        </Accordion.Root>
      </div>
    </div>
  );
}

const AccordionTrigger = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header className="AccordionHeader">
      <Accordion.Trigger
        className={classNames("AccordionTrigger", className)}
        {...props}
        ref={forwardedRef}
      >
        {children}
        <ChevronDownIcon className="AccordionChevron" aria-hidden />
      </Accordion.Trigger>
    </Accordion.Header>
  )
);

const AccordionContent = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Content
      className={classNames("AccordionContent", className)}
      {...props}
      ref={forwardedRef}
    >
      <div className="AccordionContentText">{children}</div>
    </Accordion.Content>
  )
);

export default Myinfo;
