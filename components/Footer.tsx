"use client";
import { useEffect, useState } from "react";
import { Card } from "./Card";
import { Icons } from "./icons";

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  Parallax,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getData } from "@/lib/getData";
import axios from "axios";

export function Footer() {
  const [isDay, setIsDay] = useState(true); // Assuming it's day by default, you might need to adjust this based on your logic
  const [tempIn, setTempIn] = useState(27);
  const [tempOut, setTempOut] = useState(28);
  const [humIn, setHumIn] = useState(50);
  const [humOut, setHumOut] = useState(70);
  const [pressure, setPressure] = useState(1000);
  const [rainfall, setRainfall] = useState(15);
  const [windDirection, setWindDirection] = useState("NA");
  const [windSpeed, setWindSpeed] = useState(29);
  const [windAvg, setWindAvg] = useState(27);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getData();
  //     console.log("footer data" + data);
  //     if (data) {
  //       setTempIn(data.temperature);
  //       setHumIn(data.humidity);
  //       // setHumIn(data.humIn[0][1]);
  //       // setHumOut(data.humOut[0][1]);
  //       // setPressure(data.pressure[0][1]);
  //       // setRainfall(data.rainfall[0][1]);
  //       // setWindDirection(data.windDirection[0][1]);
  //       // setWindSpeed(data.windSpeed[0][1]);
  //       // setWindAvg(data.windAvg[0][1]);
  //     }
  //   };

  //   fetchData(); // Initial data fetch

  //   const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds

  //   return () => clearInterval(interval); // Cleanup on component unmount

  // }, [tempIn, humIn]);

  useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(async () => {
      const data = await axios.get("/api/values");
      if (data) {
        setTempIn(data.data.temperature);
        setHumIn(data.data.humidity);
        // setHumIn(data.humIn[0][1]);
        // setHumOut(data.humOut[0][1]);
        // setPressure(data.pressure[0][1]);
        // setRainfall(data.rainfall[0][1]);
        // setWindDirection(data.windDirection[0][1]);
        // setWindSpeed(data.windSpeed[0][1]);
        // setWindAvg(data.windAvg[0][1]);
      }
    }, 3000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [tempIn, humIn]);

  useEffect(() => {
    const currentTime = new Date().getHours();
    setIsDay(currentTime >= 6 && currentTime < 18); // Assuming day is between 6:00 and 18:00, you might need to adjust this
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between mx-4  ">
        <div className="flex flex-col">
          <div className="flex gap-3">
            <h3 className="text-2xl">Wind</h3>
            <Icons.wind className="h-8 w-8 rounded-full  p-1" />
          </div>
          <div className="flex gap-2">
            <p className="text-xl ">Direction:</p>
            <p className="text-xl ">{windDirection}</p>
          </div>
          <div className="flex gap-2">
            <p className="text-xl ">Speed:</p>
            <p className="text-xl ">{windSpeed} m/s</p>
          </div>
          <div className="flex gap-2">
            <p className="text-xl ">Average:</p>
            <p className="text-xl ">{windAvg}</p>
          </div>
        </div>
        <div className="flex gap-4 justify-center items-center">
          <p className="text-xl">{isDay ? "Sun Phase" : "Moon Phase"}</p>
          {isDay ? (
            <Icons.sun className="h-12 w-12" />
          ) : (
            <Icons.moon className="h-12 w-12" />
          )}
        </div>
      </div>
      <div className="flex m-4 gap-3 min-h-60">
        <Swiper
          modules={[
            Navigation,
            Pagination,
            Scrollbar,
            A11y,
            Autoplay,
            Parallax,
          ]}
          spaceBetween={10}
          slidesPerView={4}
          navigation
          pagination={{ clickable: true }}
          autoplay
          breakpoints={{
            200: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
        >
          <SwiperSlide>
            <Card
              title="Temperature IN"
              icon={<Icons.temperature />}
              value={tempIn}
              unit={"°C"}
              texts={["", "Indoor Temperature", ""]}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Card
              title="Humidity IN"
              icon={<Icons.droplet />}
              value={humIn}
              unit={"%"}
              texts={["", "Indoor Humidity", ""]}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Card
              title="Pressure"
              icon={<Icons.gauge />}
              value={pressure}
              unit={"hPa"}
              texts={["", "Absolute Pressure", ""]}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Card
              title="Rainfall"
              icon={<Icons.cloudRain />}
              value={rainfall}
              unit={"mm"}
              texts={["", "Total", ""]}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Card
              title="Temperature OUT"
              icon={<Icons.temperature />}
              value={tempOut}
              unit={"°F"}
              texts={["", "Outdoor Temperature", ""]}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Card
              title="Humidity OUT"
              icon={<Icons.droplet />}
              value={humOut}
              unit={"%"}
              texts={["", "Outdoor Humidity", ""]}
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
