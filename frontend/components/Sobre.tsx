"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import React from 'react';

export default function Sobre() {
  return (
    <div className="relative lg:h-screen w-full">
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

      <div className="relative grid grid-cols-1 lg:grid-cols-2 w-full h-full gap-4 lg:gap-0 ">
        <Card className="bg-transparent flex flex-col justify-center items-center border-none p-4 lg:p-8" >
          <CardHeader>
            <CardTitle className="text-white text-center sm:text-lg md:text-xl lg:text-3xl font-bold ">
              Conheça a historia da SysCoffe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="sm:text-sm md:text-base lg:text-lg font-semi-bold text-white max-w-screen-md text-wrap">
              A SysCoffe foi fundada em 2010 por quatro colegas de universidade: Murilo, João, Marcelo e Pedro. Todos compartilhavam uma paixão por café e decidiram abrir uma pequena loja em São Paulo após se formarem. Murilo, o barista do grupo, torrefava grãos especiais, enquanto os outros três se revezavam entre as funções de atendimento e gestão. O ambiente acolhedor e a qualidade dos cafés rapidamente conquistaram uma clientela fiel.
              Em 2015, inspirados pelo sucesso da loja física, decidiram criar um site para alcançar mais pessoas. A SysCoffe online nasceu, oferecendo uma variedade de cafés de alta qualidade, todos provenientes de fazendas sustentáveis. Além disso, incluíram planos de assinatura para que os clientes pudessem receber café fresco em casa, com benefícios como descontos e brindes.
              Com o crescimento da SysCoffe, o grupo manteve seu foco na comunidade e na sustentabilidade. O site tornou-se um espaço para aprendizado, onde os clientes podiam ler sobre métodos de preparo e dicas para apreciar café. Além disso, eventos e workshops foram adicionados para fortalecer o senso de comunidade.
              Hoje, em 2024, a SysCoffe é um nome respeitado no setor de café no Brasil, tanto online quanto em suas lojas físicas. A missão dos quatro colegas, de unir pessoas por meio do café, permanece viva e se expande com cada nova xícara servida.
            </p>
          </CardContent>
        </Card>

        {/* Segundo Card: Conteúdo Personalizado */}
        <Card className="bg-transparent flex flex-col justify-center items-center border-none p-4 lg:p-8">

          <CardContent>
              <Accordion type="single" collapsible className="w-full max-w-screen-md">
              <div className='text-white text-center sm:text-lg md:text-xl lg:text-3xl font-bold  h-20 md:h-24 lg:h-24'> Perguntas Frequentes </div>
              <AccordionItem value="item-1"> 
                  <AccordionTrigger className= "text-white font-bold sm:text-base md:text-lg lg:text-xl">Como funcionam os planos de assinatura de café ?</AccordionTrigger>
                  <AccordionContent className= "sm:text-sm md:text-base lg:text-lg font-semi-bold text-white text-wrap">
                  Os planos de assinatura de café funcionam de forma simples: você escolhe o plano que melhor se adapta ao seu consumo de café e 
                  recebe grãos frescos em casa. Além disso, você pode personalizar seu plano para incluir cafés especiais, descontos e brindes exclusivos.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className= "text-white font-bold sm:text-base md:text-lg lg:text-xl">Posso trocar meu plano quando eu quiser ?</AccordionTrigger>
                  <AccordionContent className= "sm:text-sm md:text-base lg:text-lg font-semi-bold text-white text-wrap">
                  Sim, normalmente você pode trocar seu plano de café quando quiser.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className= "text-white font-bold sm:text-base md:text-lg lg:text-xl">Os planos de café incluem brindes ou descontos especiais ? </AccordionTrigger>
                  <AccordionContent className= "sm:text-sm md:text-base lg:text-lg font-semi-bold text-white text-wrap">
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