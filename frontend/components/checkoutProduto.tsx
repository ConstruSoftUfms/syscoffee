"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription
} from '@/components/ui/dialog';
import { useCart } from '@/context/CartContext';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function CheckoutProduto() {
    const { cart, clearCart } = useCart();
    const [purchaseComplete, setPurchaseComplete] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { data: session, status } = useSession();
    const router = useRouter();

    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    const totalProductsAmount = cart.reduce((total, item) => total + item.valor * item.quantity, 0);
    const frete = totalQuantity > 1 ? 0 : totalProductsAmount * 0.3;
    const totalAmount = totalProductsAmount + frete;

    useEffect(() => {
        if (isDialogOpen && status === 'unauthenticated') {
            router.push('/?sign-in');
        }
    }, [isDialogOpen, status, router]);

    const handleDialogOpenChange = (isOpen: any) => {
        if (isOpen && status === 'authenticated') {
            setIsDialogOpen(true);
        } else if (isOpen && status !== 'authenticated') {
            router.push('/?sign-in');
            toast.error('Você precisa estar logado para finalizar a compra!');
        } else {
            setIsDialogOpen(false);
        }
    };

    const handlePurchase = () => {
        clearCart();
        setPurchaseComplete(true);
    };

    const userInfo = session?.user ? (
        <div></div>
    ) : null;

    return (
        <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
            <DialogTrigger asChild>
                <Button className="text-sm bg-green-700 text-white hover:bg-green-900 py-2 px-4 rounded-lg">
                    Finalizar compra
                </Button>
            </DialogTrigger>
            <DialogContent className='flex flex-col w-full'>
                <DialogHeader>
                    <DialogTitle className='text-center text-xl'>Checkout</DialogTitle>
                </DialogHeader>
                <div>
                    <DialogDescription>
                        <div className="p-4 space-y-4">
                            {purchaseComplete ? (
                                <>
                                    <p className="text-white text-center text-xl">Compra efetuada com sucesso!</p>
                                    <Button
                                        onClick={() => setIsDialogOpen(false)}
                                        className="mt-4 bg-blue-700 text-white hover:bg-blue-900 py-2 px-4 rounded-lg block mx-auto"
                                    >
                                        Fechar
                                    </Button>
                                </>
                            ) : (
                                <>
                                    {cart.length > 0 ? (
                                        <>
                                            {userInfo}
                                            <div className='lg:text-lg text-white font-semibold'> Dados do comprador</div>
                                            <Table className="min-w-full bg-[#2f2f2f] rounded-2xl">
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead className="text-xs text-white">Nome</TableHead>
                                                        <TableHead className="text-xs text-white">Email</TableHead>
                                                        <TableHead className="text-xs text-white">CEP</TableHead>
                                                        <TableHead className="text-xs text-white">Número</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    <TableRow>
                                                        {session && (
                                                            <>
                                                            <TableCell className="text-xs text-white">{session.user.nome}</TableCell>
                                                            <TableCell className="text-xs text-white">{session.user.email}</TableCell>
                                                            <TableCell className="text-xs text-white">{session.user.endereco_cep}</TableCell>
                                                            <TableCell className="text-xs text-white">{session.user.endereco_numero}</TableCell>
                                                            </>
                                                        )}
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                            <div className='lg:text-lg text-white font-semibold'> Resumo da compra</div>
                                            <Table className="min-w-full bg-[#2f2f2f] rounded-2xl">
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead className="text-white">Produto</TableHead>
                                                        <TableHead className="text-white">Unidades</TableHead>
                                                        <TableHead className="text-white">Preço Unitário</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {cart.map(item => (
                                                        <TableRow key={item.id}>
                                                            <TableCell className="text-white text-start">{item.nome}</TableCell>
                                                            <TableCell className="text-neutral-300 text-center">{item.quantity}</TableCell>
                                                            <TableCell className="text-neutral-300 text-right">R${item.valor.toFixed(2)}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>

                                            <Table className=" min-w-full bg-[#2f2f2f] rounded-2xl">
                                                <TableRow>
                                                    <TableCell colSpan={3} className='text-white'>Frete:</TableCell>
                                                    <TableCell className='text-right text-white'>R${frete.toFixed(2)}</TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell colSpan={3} className='text-white text-lg font-bold'>Total da compra:</TableCell>
                                                    <TableCell className='text-right text-white text-lg font-bold'>R${totalAmount.toFixed(2)}</TableCell>
                                                </TableRow>
                                            </Table>
                                            <Button
                                                onClick={handlePurchase}
                                                className="flex justify-right text-sm bg-green-700 text-white hover:bg-green-900 py-2 px-4 rounded-lg"
                                            >
                                                Finalizar compra
                                            </Button>
                                        </>
                                    ) : (
                                        <p className="text-white text-center">Seu carrinho está vazio!</p>
                                        
                                    )}
                                </>
                            )}
                        </div>
                    </DialogDescription>
                </div>
            </DialogContent>
        </Dialog>
    );
}









