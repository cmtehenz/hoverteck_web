import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authorsTableData } from "../../data";
import { api } from "../../services/api";

interface AircraftsProps {
  Aircraft: []
}

interface Aircraft {
  id: string
  prefix: string;
  time_celula: string;
}

export function Aircrafts() {
  const [ aircrafts, setAircrafts] = useState<AircraftsProps[]>([])
  let navigate = useNavigate(); 
  
  const routeChange = () =>{ 
    navigate(`new`);
  }

  useEffect(() => {
    const fetchData = async () => {
      const results = await api.get('/aircraft')
      setAircrafts(results.data)
    }

    fetchData()
  },[])

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue-gray" className="flex items-center place-content-between mb-4 p-4">
          <Typography variant="h6" color="white">
            Aeronaves
          </Typography>
          <Button size="md" onClick={routeChange}>Nova Aeronave</Button>
        </CardHeader>
       
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Aeronave", "horas total", "status", "proxima manutenção", ""].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {aircrafts?.map(
                ({ prefix, time_celula, status, img_url}: any, key: any) => {
                  const className = `py-3 px-5 ${
                    key === authorsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={prefix}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={img_url} alt={prefix} size="sm" />
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {prefix}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {prefix}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {time_celula}
                        </Typography>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {time_celula}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={status ? "green" : "deep-orange"}
                          value={status ? "EM VOO" : "MANUTENÇÃO"}
                          className="py-0.5 px-2 text-[11px] font-medium"
                        />
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          14/05/2023
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          Editar
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  )
}