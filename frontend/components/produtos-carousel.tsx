"use client"

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";

type Produto = {
  title: string;
  description: string;
  image: string;
  price: number;
};

const produtos: Produto[] = [
  {
    title: "Café Gourmet",
    description: "Café torrado e moído de alta qualidade, proveniente de fazendas selecionadas.",
    image: "https://mediaserver.almg.gov.br/acervo/639/527/1639527.jpg",
    price: 19.99,
  },
  {
    title: "Café Espresso",
    description: "Blend especial para preparo de espresso, com notas intensas e aroma encorpado.",
    image: "https://regenerati.com.br/wp-content/uploads/2023/10/cafe-e-o-cerebro.jpg",
    price: 24.99,
  },
  {
    title: "Café Orgânico",
    description: "Café cultivado de forma orgânica, livre de pesticidas e produtos químicos.",
    image: "https://blog.bicafebrasil.com.br/wp-content/uploads/2023/01/Tipos-de-cafe-da-manha-1.jpg",
    price: 29.99,
  },
  {
    title: "Café Descafeinado",
    description: "Café descafeinado de alta qualidade, mantendo todo o sabor sem a cafeína.",
    image: "https://receitasdepesos.com.br/wp-content/uploads/2023/11/cafe-com-leite-cremoso.jpg",
    price: 22.99,
  },
];

export default function ProdutosCarousel() {
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
            {produtos.map((produto, index) => (
              <CarouselItem
                key={index}
                className={`md:basis-1/2 lg:basis-1/3 ${
                  selectedProduto === produto ? "bg-gray-200" : ""
                }`}
              >
                <div className="p-8">
                  <Card className="bg-neutral-300">
                    <img
                      src={produto.image}
                      alt={produto.title}
                      className="w-full h-auto"
                    />
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold mb-2">
                        {produto.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {produto.description}
                      </p>
                      <div style={{ textAlign: "center", marginBottom: "10px" }}>
                        <p style={{ fontSize: "20px", fontWeight: "bold", color: "#333", marginTop: "10px" }}>
                          R${produto.price.toFixed(2)}
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


