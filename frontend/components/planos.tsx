"use client"

import getPlanos, { Plano } from "@/app/actions/getPlanos";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";




export default function PlanosCard() {
  const { 
    data: response 
  } = useQuery({
    queryKey: ["planos"],
    queryFn: () => getPlanos(),
  });
  
  const [selectedPlan, setSelectedPlan] = useState<Plano | null>(null);

  const handlePlanSelect = (plano: Plano) => {
    setSelectedPlan(plano);
  };

  return (
    <div className="flex justify-center items-center lg:min-h-screen md:min-h-screen ">
      
        <div className="sm:w-full md:w-full lg:w-full max-w-6xl">
          <h1 className="text-center mb-8 text-xl md:text-xl lg:text-3xl font-bold text-white ">Planos de Assinatura</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 p-20 lg:p-6">
            {response?.planos.map((plano, index) => (
              <Card key={index} className={`sm:w-full md:w-full lg:w-full bg-[#2f2f2f]  rounded-2xl border-none ${selectedPlan === plano ?"bg-neutral-600" : ""
              }`}>
                <CardHeader className="text-center text-white">
                  <h3 className="text-xl md:text-xl lg:text-4xl  font-bold">{plano.nome}</h3>
                </CardHeader>
                <CardContent >
                    <div style={{ textAlign: "start" }}>
                      <p className = "sm:text-sm md:text-base  text-neutral-300" style={{ fontWeight: "bold", marginTop: '30px'  }}>
                        R$ {plano.valor.toFixed(2) + "/mês"}
                      </p>
                    </div>
                    <button
                      onClick={() => handlePlanSelect(plano)}
                      className="bg-blue-700 text-white font-bold px-4 md:px-8 lg:px-24 py-2 rounded-2xl hover:bg-blue-950"
                      style={{ display: "flex", margin: "0 auto", marginTop: '35px'}}
                    >
                      Assinar
                    </button>
                    <CardDescription className=" text-white font-semibold text-justify text-wrap md:h-36 lg:h-96" 
                      style={{ display: "flex", margin: "0 auto", marginTop: '35px' }}>  {plano.descricao}</CardDescription>
                </CardContent>
                
              </Card>
            ))}
          </div>
        </div>
      </div>
  );
}

