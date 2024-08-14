"use client"
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Sector } from "recharts";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { CurrencyDollarSimple, FileXls } from "@phosphor-icons/react";
import { listenToCollectionChanges } from "@/helpers/listeningUsers";
import { groupByDate } from "@/helpers/groupByDate";
import { CollectionData } from "@/interfaces/CollectionData";
import ExportExcel from "@/components/ExportExcel";
import { useDispatch } from "react-redux";
import { loaderOff, loaderOn } from "@/redux/slices/laoderSlice";

const renderActiveShape = ({ cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value }: any) => {
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${payload.name} ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Porcentaje ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function Home() {
  const [dataTwo, setDataTwo] = useState([
    { name: "Masculino", value: 0, fill: "#0a7ea4" },
    { name: "Femenino", value: 0, fill: "#ccda4e" }
  ]);

  const [data, setData] = useState<any[]>([]);

  const [dataToExcel, setDataToExcel] = useState<any[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loaderOn());
    const unsubscribe = listenToCollectionChanges((newData) => {


      setDataToExcel(newData);
      let groupByDateResult = groupByDate(newData);

      const newDataArray = Object.keys(groupByDateResult).map(key => ({
        name: key,
        usuarios: groupByDateResult[key].length,
      }));

      setData(newDataArray);

      let genders = { M: 0, F: 0 };
      newData.forEach((element) => {
        if (element.gender === 'F') {
          genders.F++;
        } else {
          genders.M++;
        }
      });

      setDataTwo([
        { name: "Masculino", value: genders.M, fill: "#0a7ea4" },
        { name: "Femenino", value: genders.F, fill: "#ccda4e" }
      ]);

    });
    dispatch(loaderOff());

    return () => unsubscribe();
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="col-span-12">
      <div className="flex gap-5 w-full">
        <div className="grid grid-cols-12 gap-5 w-full">
          <div className="w-full sx:col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6 col-span-12">
            <Card className="flex flex-col min-h-[300px] max-h-[500px] p-5 rounded-3xl shadow-2xl">
              <CardHeader className="pb-0 pt-2 px-4 flex-row flex-wrap-reverse justify-between items-center text-lg font-bold">
                <h1 className="text-2xl font-bold">
                  Hey Felipe,
                  <br />
                  Descarga el último reporte de usuarios.
                </h1>
                <Button size="lg" isIconOnly className="rounded-full bg-green-700 text-white">
                  <FileXls />
                </Button>
              </CardHeader>
              <CardBody className="flex flex-col justify-end">
                {
                  dataToExcel.length > 0
                  &&
                  <ExportExcel data={dataToExcel} />
                }
              </CardBody>
            </Card>
          </div>

          <div className="w-full sx:col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6 col-span-12">
            <Card className="flex flex-col min-h-[200px] max-h-[500px] p-5 rounded-3xl shadow-2xl">
              <CardHeader className="pb-0 pt-2 px-4 flex-row flex-wrap justify-between items-center text-lg font-bold">
                <p>Usuarios registrados</p>
                <Button isIconOnly className="bg-primary text-white font-extrabold rounded-full p-3">
                  <CurrencyDollarSimple size={32} />
                </Button>
              </CardHeader>
              <CardBody className="flex-1">
                <ResponsiveContainer width="100%" height={190}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#000000",
                        color: "#ffffff",
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="usuarios"
                      fill="#0a7ea4"
                      barSize={30}
                      radius={[10, 10, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardBody>
            </Card>
          </div>

          <div className="w-full sx:col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6 col-span-12">
            <Card className="flex flex-col min-h-[200px] max-h-[500px] p-5 rounded-3xl shadow-2xl">
              <CardHeader className="pb-0 pt-2 px-4 flex-row flex-wrap justify-between items-center text-lg font-bold">
                <p>Géneros de los usuarios M/F</p>
                <Button isIconOnly className="bg-primary text-white font-extrabold rounded-full p-3">
                  <CurrencyDollarSimple size={32} />
                </Button>
              </CardHeader>
              <CardBody className="flex-1">
                <ResponsiveContainer width="100%" height={290}>
                  <PieChart>
                    <Pie
                      activeIndex={activeIndex}
                      activeShape={(p: any) => renderActiveShape({ ...p })}
                      data={dataTwo}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      onMouseEnter={onPieEnter}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
