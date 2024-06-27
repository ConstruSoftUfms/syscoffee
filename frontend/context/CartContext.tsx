'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Produto = {
    id: string;
    nome: string;
    marca: string;
    valor: number;
    descricao: string;
    quantidade: number;
    imagem_url: string;
    categoria: {
        id: string;
        nome: string;
    };
};

type CartItem = Produto & { quantity: number };

type CartContextType = {
    cart: CartItem[];
    addToCart: (produto: Produto) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

const CART_STORAGE_KEY = "shopping_cart";

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    const saveCartToLocalStorage = (cart: CartItem[]) => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    };

    const addToCart = (produto: Produto) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.id === produto.id);
            let updatedCart;
            if (existingItem) {
                updatedCart = prevCart.map(item =>
                    item.id === produto.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                updatedCart = [...prevCart, { ...produto, quantity: 1 }];
            }
            saveCartToLocalStorage(updatedCart);
            return updatedCart;
        });
    };

    const removeFromCart = (id: string) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.filter(item => item.id !== id);
            saveCartToLocalStorage(updatedCart);
            return updatedCart;
        });
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem(CART_STORAGE_KEY);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
