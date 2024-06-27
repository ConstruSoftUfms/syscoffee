"use client"

import getProdutos, { Produto } from "@/app/actions/getProdutos";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Button } from '@/components/ui/button';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription
} from '@/components/ui/dialog';
import { toast } from "sonner"
import { useCart } from '@/context/CartContext';


export default function ProdutosCard() {
    const { data: response } = useQuery({
        queryKey: ["produtos"],
        queryFn: () => getProdutos(),
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    
    const { addToCart } = useCart();


    useEffect(() => {
        const isProdutos = searchParams.get('produtos');
        if (isProdutos) {
            setIsDialogOpen(true);
        }
    }, [searchParams]);

    const handleOpenChange = (isOpen: boolean) => {
        setIsDialogOpen(isOpen);
        const pathName = isOpen ? `${pathname}?produtos=true` : pathname;
        router.push(pathName);
    };

    const filteredProducts = response?.produtos.filter((produto) => {
        const matchesSearchTerm = produto.nome.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesBrand = selectedBrand ? produto.marca === selectedBrand : true;
        const matchesCategory = selectedCategory ? produto.categoria.nome === selectedCategory : true;
        return matchesSearchTerm && matchesBrand && matchesCategory;
    });

    return (
        <div className="">  
            <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
                <DialogTrigger asChild>
                    <Button variant="secondary" className="mb-4">
                        Ver todos os produtos
                    </Button>
                </DialogTrigger>
                <DialogContent className="w-full max-w-screen-lg h-[80vh] overflow-hidden p-4 flex flex-col">
                    <DialogTitle className="flex justify-center">Produtos</DialogTitle>
                    <DialogDescription className="flex flex-col h-full">
                        <div className="flex flex-wrap justify-center my-4 gap-4">
                            <input
                                type="text"
                                placeholder="Buscar produtos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className=" w-11/12 lg:w-1/3 text-white p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <select
                                value={selectedBrand}
                                onChange={(e) => setSelectedBrand(e.target.value)}
                                className=" w-46 lg:w-1/4 p-2 border text-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Todas as marcas</option>
                                {Array.from(new Set(response?.produtos.map(p => p.marca))).map(marca => (
                                    <option key={marca} value={marca}>{marca}</option>
                                ))}
                            </select>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-46 lg:w-1/4 p-2 text-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Todas as categorias</option>
                                {Array.from(new Set(response?.produtos.map(p => p.categoria.nome))).map(categoria => (
                                    <option key={categoria} value={categoria}>{categoria}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1 overflow-y-auto my-8">
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {filteredProducts?.map((produto, index) => (
                                    <Card
                                        key={index}
                                        className="bg-[#2f2f2f] border-none rounded-2xl"
                                        style={{ minHeight: '50px', maxWidth: '210px'}}
                                    >
                                        <img
                                            src={produto.imagem_url}
                                            alt={produto.nome}
                                            className="w-full lg:h-24 h-16 object-cover rounded-t-lg"
                                        />
                                        <CardContent className="p-4">
                                            <h3 className="text-xs lg:text-base text-center font-semibold mb-4 text-white">
                                                {produto.nome}
                                            </h3>
                                            <div style={{ textAlign: "start" }}>
                                                <p className="text-neutral-300 text-xs lg:text-base " style={{ fontWeight: "bold"}}>
                                                    R${produto.valor.toFixed(2)}
                                                </p>
                                            </div>
                                            <p className="text-xs lg:text-sm text-white mb-4 h-12" style={{ marginTop: "10px" }}>
                                                {produto.descricao}
                                            </p>
                                            <p className="text-xs text-white italic h-12" style={{fontSize: "10px" }}>
                                                Marca: {produto.marca}
                                            </p>
                                        <Button
                                            className="text-xs lg:text-sm w-full bg-blue-700 text-white rounded-3xl hover:bg-blue-950"
                                            onClick={() => {
                                                addToCart(produto);
                                                toast.success(`${produto.nome} adicionado ao carrinho!`);
                                            }}
                                        >
                                            Comprar
                                        </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </div>
    );
}


