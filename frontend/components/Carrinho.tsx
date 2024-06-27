"use client"

import { useCart } from '@/context/CartContext';
import { Button } from "./ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Cart } from '@styled-icons/bootstrap/Cart';
import { Card, CardContent, CardTitle } from './ui/card';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import CheckoutProduto from '@/components/checkoutProduto';

export function Carrinho() {
    const { cart, removeFromCart } = useCart();
    const router = useRouter();

    const totalValue = cart.reduce((total, item) => total + item.valor * item.quantity, 0);
    const cartCount = cart.length;

    return (
        <Sheet>
            <SheetTrigger className="relative">
                <Cart className="text-white w-9" />
                {cartCount > 0 && (
                    <div className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {cartCount}
                    </div>
                )}
            </SheetTrigger>
            <SheetContent className="flex flex-col h-full">
                <SheetHeader>
                    <SheetTitle>Carrinho</SheetTitle>
                    <SheetClose />
                </SheetHeader>
                <div className="flex-1 overflow-y-auto">
                    <SheetDescription>
                        <div className="p-4 space-y-4">
                            {cart.length > 0 ? (
                                cart.map(item => (
                                    <Card key={item.id} className="bg-[#2f2f2f] border-none rounded-2xl p-4">
                                        <CardContent className="flex flex-col justify-between">
                                            <CardTitle className='text-lg'>
                                                <p className="text-white text-center mb-2">{item.nome}</p>
                                            </CardTitle>
                                            <p className="text-neutral-300 text-base mt-4">Preço: R${item.valor.toFixed(2)}</p>
                                            <p className="mt-2 text-neutral-300 text-base">Unidades: {item.quantity}</p>

                                            <Button className="mt-4 text-sm bg-red-700 text-white hover:bg-red-900" onClick={() => {
                                                removeFromCart(item.id);
                                                toast.error(`${item.nome} foi removido do carrinho!`);
                                            }} >
                                                Remover
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <p className="text-white text-center">Seu carrinho está vazio.</p>
                            )}
                        </div>
                    </SheetDescription>
                </div>
                <SheetFooter className=''>
                    <div className='grid grid-cols-2 w-full'>
                        <p className="text-white text-base lg:text-lg">Total: R${totalValue.toFixed(2)}</p>
                        <CheckoutProduto/>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}



