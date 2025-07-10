
import { ChartBarNegative } from "@/components/ui/ChartBarNegative"
import Createchrat from "@/conpoenent/chart/Createchrat"
import { Link } from "react-router"
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
const Home = () => {

  const [data, setData] = useState([]);

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
data.map((s)=>({
  name:s.symbol+"USD",
    id:s.symbol+"USD"+"/"+s.id
}))
]

console.log(namesymblo);

  return (
    <div>
       <section className=" gird grid justify-center bg-neutral-950 gap-1 pt-1">
    <div className=" grid grid-cols-3 gap-1 ">
           {namesymblo[0].map((s)=>{
            console.log(s.name);
            
            return  <div className="  bg-black border border-neutral-700 h-[200px] flex flex">
               
              <div className="flex items-end  ">
                
                <Link to={`Chart/${s.id}`}>
                
                         <Createchrat  symbols={s.name} w={250} h={160}/>
                </Link>
              </div>
              </div>
             
                  
           })}
    </div>
    </section>
      <section className=" w-full h-[400px] bg-neutral-950 flex flex justify-center p-[20px] border-b-1 border-neutral-800">           
            <ChartBarNegative data={data}/>
      </section>
      <div className="w-full h-[100px]  bg-neutral-950"></div>
    </div>
    
  )
}
export default Home