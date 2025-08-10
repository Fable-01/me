import { ChartBarNegative } from "@/components/ui/ChartBarNegative";
import Createchrat from "@/conpoenent/chart/Createchrat";
import { Link } from "react-router";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";




const Home = () => {
  const [data, setData] = useState([]);
  const [isActive,setIsActive] = useState({})


  
useEffect(() => {
  const saved = localStorage.getItem("favoriteStars");
  if (saved) {
    setIsActive(JSON.parse(saved));
  }
}, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://api.coinlore.net/api/tickers/?start=0&limit=6"
        );
        const coin = res.data.data;
        setData(coin);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  if (data.length < 6) return <div>Loading chart...</div>;

  const namesymblo = [
    data.map((s) => ({
      name: s.symbol + "USD",
      id: s.symbol + "USD" + "/" + s.id,
      symbol : s.symbol,
      ids:s.id
    })),
  ];

  // console.log(namesymblo);


console.log(namesymblo);


const toggle = ( ids) => {
  setIsActive((prev) => {
    const updated = {
      ...prev,
      [ids]: !prev[ids],
    };

    // ดึงรายการเดิมจาก localStorage
    const saved = JSON.parse(localStorage.getItem("favoriteList") || "[]");

    let updatedList;

    if (!prev[ids]) {
      // ✅ เพิ่มเข้า list ถ้ายังไม่เคยมี
      updatedList = [...saved, { ids }];
    } else {
      // ❌ ลบออกจาก list ตาม symbol ที่กด
      updatedList = saved.filter((item) => item.ids !== ids);
    }

    // อัปเดต localStorage ทั้ง star status และ list
    localStorage.setItem("favoriteStars", JSON.stringify(updated));
    localStorage.setItem("favoriteList", JSON.stringify(updatedList));

    return updated;
  });
};



  return (
    <div>
      <section className=" gird grid justify-center bg-neutral-950 gap-1 pt-1">
        <div className=" grid grid-cols-3 gap-1 ">
          {namesymblo[0].map((s) => {
            // console.log(s.symbol);

            return (
              <div className="  bg-black border border-neutral-700 h-[200px] grid ">
              
                 <FaStar onClick={()=>{
                  toggle(s.ids)
                 }} className={`text-2xl ml-[210px] mt-1 ${isActive [s.ids]? 'text-amber-400':'text-gray-900'}`} />




                <div className="flex items-end  ">
                  <Link to={`Chart/${s.id}`}>
                    <Createchrat symbols={s.name} w={250} h={160} />
                  </Link>
                  
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section className=" w-full h-[400px] bg-neutral-950 flex flex justify-center p-[20px] border-b-1 border-neutral-800">
        <ChartBarNegative data={data} />
      </section>
      <div className="w-full h-[100px]  bg-neutral-950"></div>
      
    </div>
  );
};
export default Home;
