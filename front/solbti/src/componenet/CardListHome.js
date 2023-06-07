import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CardList from "./CardList";

function CardListHome(props) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            centered
          >
            <Tab label="전체" value="1" />
            <Tab label="신용카드" value="2" />
            <Tab label="체크카드" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <CardList option="all" />
        </TabPanel>
        <TabPanel value="2">
          <CardList option="credit" />
        </TabPanel>
        <TabPanel value="3">
          <CardList option="debit" />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default CardListHome;
