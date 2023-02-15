import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export function NewAircraft() {
  let navigate = useNavigate(); 
  
  const routeChange = () =>{ 
    navigate(-1);
  }

  return (
    <div className="mt-8 mb- flex flex-col gap-12">
      <Card className="w-full">
        <CardHeader variant="gradient" color="blue-gray" className="flex items-center place-content-between mb-4 p-4">
          <Typography variant="h6" color="white">
            Nova Aeronave
          </Typography>
          <Button size="md" onClick={routeChange}>Aeronaves</Button>
        </CardHeader>
        <CardBody className="flex flex-row space-x-4">
          <div className="flex flex-col gap-2 w-1/2">
            <Input label="Prefixo" size="md" />
            <Input label="Fabricante" size="md" />
            <Input label="Modelo" size="md" />
            <Input label="Número de serie célula" size="md" />
            <Input type="date" label="Data Fabricação célula" size="md" />
            <Input type="number" label="Horas célula" size="md" />
            <Input type="number" label="N1" size="md" />
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <Input label="Usage" size="md" />
            <Input label="Modelo Motor" size="md" />
            <Input label="Fabricante Motor" size="md" />
            <Input label="Numero serie motor" size="md" />
            <Input type="date" label="Data Fabricação motor" size="md" />
            <Input type="number" label="Horas do motor" size="md" />
            <Input type="number" label="N2" size="md" />
          </div>
        </CardBody>
      <CardFooter className="pt-0">
        <Button variant="gradient" fullWidth>
          Salvar
        </Button>
      </CardFooter>
    </Card>
    </div>
  )
}