import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Button,
  Select,
  Option,
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { authorsTableData } from "../../data";
import { api } from "../../services/api";

interface ComponentProps {
  created_at: string;
  date_instalation: string;
  deleted_at: string;
  description: string;
  frequency: string;
  id: string;
  part_number: string;
  sectionId: string;
  serial_number: string;
  time_serial_new_now: string;
  time_serial_overhall_now: string;
  time_since_new_component: string;
  time_since_new_engine: string;
  time_since_overhall_component: string;
  type_frenquency: string;
}

interface SectionProps {
  id: string;
  title: string;
  components: ComponentProps[]
}

interface MapaMotorProps {
  id: string;
  section: SectionProps[]
}

interface IAircraft {
  mapaMotor: MapaMotorProps
}


export function MapaEngine() {
  const [aircrafts, setAircrafts] = useState([]);
  const [aircraft, setAircraft] = useState<IAircraft>();

  const className = "py-3 px-5 border-b border-blue-gray-50"

  const data = [
    {
      label: "HTML",
      value: "html",
      desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people
      who are like offended by it, it doesn't matter.`,
    },
    {
      label: "React",
      value: "react",
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
 
    {
      label: "Vue",
      value: "vue",
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
 
    {
      label: "Angular",
      value: "angular",
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
 
    {
      label: "Svelte",
      value: "svelte",
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
  ];

  useEffect(() =>{
    const fetchData = async () => {
      const results = await api.get('/aircraft')
      setAircrafts(results.data)
    }

    fetchData()
  },[])

  const fetchAircraft = async (prefix: string) => {
    const result = await api.get('/component', {
      params: {
       prefix 
      }
    })

    setAircraft(result.data[0])
    console.log(aircraft)
    
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue-gray" className="flex items-center place-content-between mb-4 p-4">
          <Typography variant="h6" color="white">
            Mapa motor
          </Typography>
          <Button size="md" >Novo Componente</Button>
        </CardHeader>
       
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <div className="m-4 w-6">
            <Select 
              variant="standard" 
              label="Selecione a aeronave"
              
              >
              {
                aircrafts?.map((aircraft: any) => {
                  return(
                    <Option
                      onClick={() => fetchAircraft(aircraft.prefix)}
                      value={aircraft.prefix}
                      key={aircraft.id}>{aircraft.prefix}</Option>
                  )
                })
              }
            </Select>
          </div>

          {
            aircraft?.mapaMotor.section  ? 
            <Tabs id="custom-animation" value="html" className="m-2">
            <TabsHeader>
              {
                aircraft.mapaMotor.section.map(({title, id}) => (
                  <Tab key={id} value={id}>
                    {title}
                  </Tab>
                ))
              }
            
            </TabsHeader>
            <TabsBody
              animate={{
                mount: { y: 0 },
                unmount: { y: 250 },
              }}
              >
                {
                  aircraft.mapaMotor.section.map(({id, components}) => (
                    <TabPanel key={id} value={id} className="overflow-auto">
                      <table className="w-full min-w-[640px] table-auto">
                        <thead>
                          <tr>
                            {["Descrição", 
                              "PN", "SN", 
                              "data instalação", 
                              "tsn motor", "tsn componente", 
                              "tso componente", "frequência", "tc", "tsn atual", "tso atual",
                              "disponibilidade", "vencimento"].map((el) => (
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
                          {
                            components.map((component) => (
                              <tr key={component.id}>
                                  <td className={className}>{component.description}</td>
                                  <td className={className}>{component.part_number}</td>
                                  <td className={className}>{component.serial_number}</td>
                                  <td className={className}>{component.date_instalation}</td>
                                  <td className={className}>{component.time_since_new_engine}</td>
                                  <td className={className}>{component.time_since_new_component}</td>
                                  <td className={className}>{component.time_since_overhall_component}</td>
                                  <td className={className}>{component.frequency}</td>
                                  <td className={className}>{component.type_frenquency}</td>
                                  <td className={className}>{component.time_serial_new_now}</td>
                                  <td className={className}>{component.time_serial_overhall_now}</td>
                                  <td className={className}>calcular valor</td>
                                  <td className={className}>calcular valor</td>
                                </tr>

                            ))
                          }
                        </tbody>
                      </table>
                    </TabPanel>
                  ))
                }
               
            </TabsBody>
          </Tabs> 
            : ""
          }
        </CardBody>
      </Card>
    </div>
  )
}