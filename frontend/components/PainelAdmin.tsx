'use client'

import { Button } from "./ui/button";
import { useRouter } from 'next/navigation';

export default function AdminButton() {
    const router = useRouter();

    function handleAdmin() {
        router.push('/admin');
    }

    return (
        <Button
            className="w-full rounded-xl text-base text-white border-none bg-gray-800 hover:bg-blue-900"
            onClick={handleAdmin}
        >
            Painel Admin
        </Button>
    );
}
