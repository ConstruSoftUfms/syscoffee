"use client"

import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

type Plano = {
  title: string;
  description: string;
  image: string;
  annualPrice: number;
  monthlyPrice: number;
  advantages: string[];
};

//itens de cada plano com link da imagem (teste), preço (anual e mensal), descrição e vantagens
const planos: Plano[] = [
  {
    title: "BasicCoffe",
    description: "Descrição do Plano 1",
    image: "https://mediaserver.almg.gov.br/acervo/639/527/1639527.jpg",
    annualPrice: 10.99,
    monthlyPrice: 1.99,
    advantages: ["Vantagem 1", "Vantagem 2", "Vantagem 3"],
  },
  {
    title: "PremiumCoffe",
    description: "Descrição do Plano 2",
    image: "https://regenerati.com.br/wp-content/uploads/2023/10/cafe-e-o-cerebro.jpg",
    annualPrice: 15.99,
    monthlyPrice: 2.99,
    advantages: ["Vantagem 1", "Vantagem 2", "Vantagem 3"],
  },
  {
    title: "DeluxeCoffe",
    description: "Descrição do Plano 3",
    image: "https://blog.bicafebrasil.com.br/wp-content/uploads/2023/01/Tipos-de-cafe-da-manha-1.jpg",
    annualPrice: 15.99,
    monthlyPrice: 2.99,
    advantages: ["Vantagem 1", "Vantagem 2", "Vantagem 3"],
  },
  // Adicione mais planos conforme necessário
];

export default function PlanosCards() {
  const [selectedPlano, setSelectedPlano] = useState<Plano | null>(null);
  const [planoType, setPlanoType] = useState<'annual' | 'monthly'>('annual');


  const handlePlanSelect = (plano: Plano) => {
    setSelectedPlano(plano);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-4xl">
        <h1 className="text-center mb-8 text-3xl font-bold"> Planos de Assinatura</h1>
        {/* botao de anual e mensal */}
        <div className="flex justify-center mb-4">
          <button
            className={`mx-2 px-4 py-2 rounded ${planoType === 'annual' ? 'bg-neutral-900 text-white' : 'bg-gray-300 text-gray-600'
              }`}
            onClick={() => setPlanoType('annual')}
          >
            Planos Anual
          </button>
          <button
            className={`mx-2 px-4 py-2 rounded ${planoType === 'monthly' ? 'bg-neutral-900 text-white' : 'bg-gray-300 text-gray-600'
              }`}
            onClick={() => setPlanoType('monthly')}
          >
            Planos Mensal
          </button>
        </div>

        {/* Cards com os planos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {planos.map((plano, index) => (
            <div key={index}>
              <Card className="bg-neutral-300">
                <img src={plano.image} alt={plano.title} className="w-full h-auto" />
                <CardContent className="p-4">
                  <h1 className="text-lg font-bold mb-2 flex justify-center">{plano.title}</h1>
                  <p className="text-sm text-gray-500 mb-2">{plano.description}</p>
                  <ul>
                    {plano.advantages.map((advantage, index) => (
                      <li key={index}>{advantage}</li>
                    ))}
                  </ul>
                  {/* Exibir preço anual ou mensal com base no tipo de plano selecionado */}
                  <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                    <p style={{ fontSize: '18px', fontWeight: 'bolder', color: '#333', marginTop: '10px' }}>
                      R${planoType === 'annual' ? plano.annualPrice.toFixed(2) : plano.monthlyPrice.toFixed(2)}
                    </p>
                  </div>

                  {/* botão de adicionar ao carrinho ( esta sem ação) */}
                  <button
                    onClick={() => handlePlanSelect(plano)}
                    className="bg-neutral-900 text-white px-4 py-2 rounded hover:bg-blue-600"
                    style={{ marginTop: '10px', display: 'block', margin: '0 auto' }}
                  >
                    Assinar
                  </button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
