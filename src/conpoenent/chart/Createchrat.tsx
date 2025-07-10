// ChartContainer.tsx
import React, { useEffect, useRef } from "react";
import {
  CandlestickSeries,
  ColorType,
  createChart,
  createTextWatermark,
} from "lightweight-charts";
import axios from "axios";




interface CandlestickData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

const Createchrat = ({ symbols, w, h }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  if (symbols.length < 6) return <div>Loading chart...</div>;

  useEffect(() => {
    
    const today = new Date();
    const fiveDaysAgo = new Date();
    const day = 30;
    fiveDaysAgo.setDate(today.getDate() - day);

    const formattedDate = fiveDaysAgo.toISOString().split("T")[0];

    // const data = [
    //   { open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1642427876 },
    //   { open: 9.55, high: 10.3, low: 9.42, close: 9.94, time: 1642514276 },
    //   { open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: 1642600676 },
    //   { open: 9.78, high: 10.59, low: 9.18, close: 9.51, time: 1642687076 },
    //   { open: 9.51, high: 10.46, low: 9.1, close: 10.17, time: 1642773476 },
    //   { open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: 1642859876 },
    //   { open: 10.47, high: 11.39, low: 10.4, close: 10.81, time: 1642946276 },
    //   { open: 10.81, high: 11.6, low: 10.3, close: 10.75, time: 1643032676 },
    //   { open: 10.75, high: 11.6, low: 10.49, close: 10.93, time: 1643119076 },
    //   { open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 1643205476 },
    //   { open: 10.96, high: 11.9, low: 10.8, close: 11.5, time: 1643291876 },
    //   { open: 11.5, high: 12.0, low: 11.3, close: 11.8, time: 1643378276 },
    //   { open: 11.8, high: 12.2, low: 11.7, close: 12.0, time: 1643464676 },
    //   { open: 12.0, high: 12.5, low: 11.9, close: 12.3, time: 1643551076 },
    //   { open: 12.3, high: 12.8, low: 12.1, close: 12.6, time: 1643637476 },
    //   { open: 12.6, high: 13.0, low: 12.5, close: 12.9, time: 1643723876 },
    //   { open: 12.9, high: 13.5, low: 12.7, close: 13.2, time: 1643810276 },
    //   { open: 13.2, high: 13.7, low: 13.0, close: 13.5, time: 1643896676 },
    //   { open: 13.5, high: 14.0, low: 13.3, close: 13.8, time: 1643983076 },
    //   { open: 13.8, high: 14.2, low: 13.6, close: 14.0, time: 1644069476 },
    // ];

    const chart = createChart(chartContainerRef.current!, {
      layout: {
        background: { type: ColorType.Solid, color: "black" },
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      width: w,
      height: h,
    });

    chart.timeScale().applyOptions({
      borderColor: "rad",
      rightOffset: 5,
      barSpacing: 15,
      minBarSpacing: 12,
      fixLeftEdge: true,
    });

    const newSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    axios
      .get(
        "https://financialmodelingprep.com/stable/historical-price-eod/full?",
        {
          params: {
            symbol: symbols,
            from: formattedDate,
            apikey: "OEqNBiyBZ4fJYpvUlnuMd8Unqhgay20",
          },
        }
      )
      .then((response) => {
        const data = response.data;
        const formattedData: CandlestickData[] = data
          .reverse()
          .map((d: any) => ({
            time: d.date,
            open: d.open,
            high: d.high,
            low: d.low,
            close: d.close,
          }));

        createTextWatermark(chart.panes()[0], {
          horzAlign: "left",
          vertAlign: "left",
          lines: [
            {
              text: symbols,
              color: "red",
              fontSize: 14,
            },
            // {
            //   text: data[day].close,

            //   color: "red",
            //   fontSize: 14,
            // },
          ],
        });

        newSeries.setData(formattedData);
      })
      .catch((err) => console.error("Error loading data:", err));
    // newSeries.setData(data);

    return () => {
      chart.remove();
    };
  }, []);

  return (
    
      <div ref={chartContainerRef} />

  );
};

export default Createchrat;
