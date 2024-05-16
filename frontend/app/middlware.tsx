import {NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    // Assumindo que você tenha uma função para verificar a função do usuário
    const userRole = getUserRole(request);

    // Defina rotas que exigem acesso de administrador
    const adminRoutes = ['/admin/dashboard', '/admin/settings'];
    // Deina rotas que exigem acesso de usuário
    const userRoutes = ['/user/profile', '/user/settings'];

    // Redireciona para logins se não estiver autenticado
    if(!userRole && pathname.startsWith('/admin/') || pathname.startsWith('/user/')) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    // Redireciona se o usuário não tiver acesso de administrador
    if(userRole !== 'admin' && adminRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL ('/', request.url));
    }
    return NextResponse.next();
}
// Função simulada para obter a função do usuário da solicitação
function getUserRole(request: NextRequest): string | null {
    // Implementar lógica para recuperar a função do usuário do cookies, JWT, etc.
    return null;
}