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
import { Button } from '@/components/ui/button'
import ProdutosCard from '@/components/produtos-cards'

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
      <div className="w-full max-w-6xl  ">
        <h1 className="text-center mb-8 text-xl md:text-xl lg:text-3xl font-bold text-black dark:text-white">Produtos</h1>
        <div className="flex justify-end">
          <ProdutosCard />
        </div>
        
        <Carousel opts={{ align: "start", loop: true }} className="w-full h-full">
          <CarouselContent>
            {response?.produtos.map((produto, index) => (
              <CarouselItem
                key={index}
                className={`md:basis-1/2 lg:basis-1/3 rounded-2xl border-none ${selectedProduto === produto ? "border border-red-500" : "border-none"
                  }`}
              >
                <div className="p-16 lg:p-8 bg-center">
                  <Card className=" bg-[#2f2f2f] border-none">
                    <img
                      src={produto.imagem_url}
                      alt={produto.nome}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <CardContent className="p-4">
                      <h3 className="text-xl text-center font-semibold mb-3 text-white">
                        {produto.nome}
                      </h3>
                      <div style={{ textAlign: "start"}}>
                        <p className = "text-neutral-300" style={{ fontSize: "20px", fontWeight: "bold", marginTop: "30px" }}>
                          R${produto.valor.toFixed(2)}
                        </p>
                      </div>
                      <p className="text-lg text-white mb-2 text-wrap h-36 "style={{ marginTop: "25px" }}>
                        {produto.descricao}
                      </p>
                      <p className="text-sm text-white mb-2 italic h-12">
                        Marca: {produto.marca}
                      </p>

                      <Button
                        onClick={() => handleProdutoSelect(produto)}
                        className="bg-blue-700 text-white font-bold px-20 py-3 rounded-3xl hover:bg-blue-950 "
                        style={{ marginTop: "10px", display: "block", margin: "0 auto" }}
                      >
                        Comprar
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem >
            ))}
          
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 md:left-4 lg:left-0 md:top-1/2 md:transform md:-translate-y-1/2" />
          <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 md:right-4 lg:right-0 md:top-1/2 md:transform md:-translate-y-1/2" />
        </Carousel>
      </div>
    </div>
  );
}


