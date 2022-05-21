import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";

function Forecast() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get("./data.json");
      setData(data);
    };
    search();
  }, []);

  //converting unix time
  const humanDateFormat = (unix) => {
    const milliseconds = unix * 1000;
    const dateObject = new Date(milliseconds);
    return dateObject.toLocaleString();
  };

  const forecastDay = data.list;

  // helper function to find the the day in the array given
  const every_nth = (arr, nth) => arr.filter((e, i) => i % nth === nth - 1);
  //results were 40 / 8 = 5day forecast
  const fiveDay = every_nth(forecastDay, 8);

  const setIcon = (weather) => {
    switch (weather) {
      case "Rain":
        return (
          <img
            src="https://staging-webapp.titanhst.com/project/rainy.png"
            alt="Rain"
          />
        );

        break;
      case "Clear":
        return (
          <img
            src="https://staging-webapp.titanhst.com/project/sunny.png"
            alt="Sunny"
          />
        );
        break;
      default:
        return (
          <img
            src="https://staging-webapp.titanhst.com/project/sunny.png"
            alt="Sunny"
          />
        );
    }
  };

  return (
    <Container>
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        {fiveDay.map((weather) => {
          return (
            <GridItem>
              {/* switch statement for loading hardcoded icons */}
              {/* {setIcon(weather.weather[0].main)} */}
              <Box maxW="sm" borderWidth="1px" borderRadius="lg">
                <Image
                  src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                  alt="Weather Icon"
                />
                <h3>{humanDateFormat(weather.dt)}</h3>
                <span>{weather.main.temp_max}&#730;F</span>&nbsp;
                <span>{weather.main.temp_min}&#730;F</span>
              </Box>
            </GridItem>
          );
        })}
      </Grid>
    </Container>
  );
}

export default Forecast;
