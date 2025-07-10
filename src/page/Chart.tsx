import axios from "axios";
import { useEffect, useState } from "react";
import ChartH1 from "@/conpoenent/chart/h1/ChartH1";
import { SectionCards, } from "@/components/ui/SectionCards";
import { Precentcghae } from "@/components/ui/Precentcghae";
// import  ChartRadialShape  from "@/components/ui/ChartRadialShape";

const Chart = () => {
  const [symbol, setSymbol] = useState("");
  const [id, setId] = useState("");
  const [data, setData] = useState([]);

  const timeFrom = () => {
    const today = new Date();
    const DaysAgo = new Date();
    DaysAgo.setDate(today.getDate() - 1);
    const formattedDate = DaysAgo.toISOString().split("T")[0];
    return formattedDate;
  };

  useEffect(() => {
    const parts = window.location.pathname.split("/").filter(Boolean);
    if (parts.length >= 2) {
      setSymbol(parts[parts.length - 2].toUpperCase());
      setId(parts[parts.length - 1]);
    }
  }, []);

  useEffect(() => {
    const api = async () => {
      try {
        const res = await axios.get(
          `https://api.coinlore.net/api/ticker/?id=${id}`
        );
        setData(res.data[0]);
      } catch (error) {}
    };
    if (id) api(); ///เพื่อแน่ใจว่าเรามี id
  }, [id]);

  if (!data || Object.keys(data).length === 0) {
    return <>Please wait a second...</>;
  }

  return (
    <div>
      <div className=" flex flex justify-center bg-neutral-950 ">
        <div className="mb-7 ">
          <div className="  text-white  bg-neutral-950">
            สัญลักษณ์: {symbol},{id}
          </div>
          <ChartH1 symbol={symbol} timrfarm={"1hour"} />
        </div>
      </div>
      <div className="flex flex justify-center gap-30 w-full h-[400px] bg-neutral-950 ">
        <SectionCards
          data={data.name}
          data2={data.rank}
          data3={data.price_usd}
          data4={data.market_cap_usd}
          data5={data.volume24}
        />
       <Precentcghae
        data={data.percent_change_1h}
         data2={data.percent_change_24h}
          data3={data.percent_change_7d}/>
      </div>
    </div>
  );
};
export default Chart;
