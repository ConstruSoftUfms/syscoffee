"use client"

import getProdutos, { Produto } from "@/app/actions/getProdutos";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";


export default function ProdutosCarousel() {
  const {
    data: response
  } = useQuery({
    queryKey: ["produtos"],
    queryFn: () => getProdutos(),
  });

  const [selectedProduto, setSelectedProduto] = useState<Produto | null>(
    null
  );

  const handleProdutoSelect = (produto: Produto) => {
    setSelectedProduto(produto);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-4xl">
        <h1 className="text-center mb-8 text-3xl font-bold">Produtos</h1>

        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent>
            {response?.produtos.map((produto, index) => (
              <CarouselItem
                key={index}
                className={`md:basis-1/2 lg:basis-1/3 ${selectedProduto === produto ? "bg-gray-200" : ""
                  }`}
              >
                <div className="p-8">
                  <Card className="bg-neutral-300">
                    <img
                      src={produto.imagem_url}
                      alt={produto.nome}
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold mb-2">
                        {produto.nome}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {produto.descricao}
                      </p>
                      <p className="text-sm text-gray-500 mb-2">
                        Marca: {produto.marca}
                      </p>
                      <div style={{ textAlign: "center", marginBottom: "10px" }}>
                        <p style={{ fontSize: "20px", fontWeight: "bold", color: "#333", marginTop: "10px" }}>
                          R${produto.valor.toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => handleProdutoSelect(produto)}
                        className="bg-neutral-900 text-white px-4 py-2 rounded hover:bg-blue-600"
                        style={{ marginTop: "10px", display: "block", margin: "0 auto" }}
                      >
                        Comprar
                      </button>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}


