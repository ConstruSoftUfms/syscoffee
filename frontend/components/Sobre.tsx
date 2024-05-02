"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import React from 'react';

export default function Sobre() {
  return (
    <div className="relative h-screen w-full">
      {/* Imagem de fundo */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'url(https://static.vecteezy.com/system/resources/previews/023/010/446/large_2x/the-cup-of-latte-coffee-with-heart-shaped-latte-art-and-ai-generated-free-photo.jpg)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Sobreposição escura para escurecer o fundo */}
      <div className="absolute inset-0 bg-black bg-opacity-70" />

      <div className="relative flex flex-row w-full">
        <Card className="w-1/2 bg-transparent flex flex-col justify-center items-center border-none" >
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-white text-center">
              Conheça a historia da SysCoffe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className=" text-lg font-semi-bold text-white max-w-screen-md text-wrap">
                A SysCoffe foi fundada em 2010 por Henrique Almeida, um barista apaixonado por café. Começou como uma pequena loja em São Paulo, onde Henrique torrefava grãos especiais e conversava com seus clientes, sempre buscando criar um ambiente acolhedor.
                O sucesso da loja o inspirou a criar um site para alcançar mais pessoas. Assim, em 2015, a SysCoffe online nasceu, oferecendo uma variedade de cafés de alta qualidade, todos de fazendas sustentáveis. O site também incluía planos de assinatura, permitindo que os clientes recebessem café fresco em casa, junto com benefícios como descontos e brindes.
                Com o crescimento da SysCoffe, Henrique manteve seu foco na comunidade e na sustentabilidade. O site tornou-se um espaço para aprendizado, onde os clientes podiam ler sobre métodos de preparo e dicas para apreciar café. Além disso, eventos e workshops foram adicionados para fortalecer o senso de comunidade.
                Hoje, a SysCoffe é um nome respeitado no setor de café no Brasil, tanto online quanto em suas lojas físicas. A missão de Henrique, de unir pessoas por meio do café, permanece viva e se expande com cada nova xícara servida.
            </p>
          </CardContent>
        </Card>

        {/* Segundo Card: Conteúdo Personalizado */}
        <Card className="w-1/2 h-screen bg-transparent flex flex-col justify-center items-center border-none">

          <CardContent>
              <Accordion type="single" collapsible className="w-full max-w-screen-md">
              <div className='text-3xl font-bold text-white text-center h-28'> Perguntas Frequentes </div>
              <AccordionItem value="item-1"> 
                  <AccordionTrigger className= "text-white font-bold text-xl">Como funcionam os planos de assinatura de café ?</AccordionTrigger>
                  <AccordionContent className= "text-lg font-semi-bold text-white text-wrap">
                  Os planos de assinatura de café funcionam de forma simples: você escolhe o plano que melhor se adapta ao seu consumo de café e 
                  recebe grãos frescos em casa. Além disso, você pode personalizar seu plano para incluir cafés especiais, descontos e brindes exclusivos.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className= "text-white font-bold text-xl">Posso trocar meu plano quando eu quiser ?</AccordionTrigger>
                  <AccordionContent className= "text-lg font-semi-bold text-white text-wrap">
                  Sim, normalmente você pode trocar seu plano de café quando quiser.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className= "text-white font-bold text-xl">Os planos de café incluem brindes ou descontos especiais ? </AccordionTrigger>
                  <AccordionContent className= "text-lg font-semi-bold text-white text-wrap">
                  Sim, muitos planos de café incluem brindes ou descontos especiais para os assinantes. 
                  Isso pode ser em forma de amostras grátis, acessórios, ou descontos em futuras compras. 
                  Para saber mais, confira as condições do seu plano ou as promoções oferecidas pelo serviço de assinatura.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}