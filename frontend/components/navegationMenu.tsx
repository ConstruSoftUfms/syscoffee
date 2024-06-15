"use client"

import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import Link from "next/link"

export default function MenuNavigation() {
  return (
    <NavigationMenu className="md:w-auto lg:w-auto" >
      <NavigationMenuList className="flex flex-col md:flex-row md:gap-6 ">
        <NavigationMenuItem>
          <Link href="#planos" legacyBehavior passHref>
            <NavigationMenuLink className="dark:text-white font-semibold px-4 py-3 rounded-2xl hover:bg-blue-700 block  hidden sm:inline-block md:block"> {/* Define a fonte como semibold */}
              Planos de Assinatura
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="#produtos" legacyBehavior passHref>
            <NavigationMenuLink className="dark:text-white font-semibold px-4 py-3 rounded-2xl hover:bg-blue-700 block   hidden sm:inline-block md:block"> {/* Define a fonte como semibold */}
              Produtos
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="#sobre" legacyBehavior passHref>
            <NavigationMenuLink className="dark:text-white font-semibold px-4 py-3 rounded-2xl hover:bg-blue-700 block  hidden sm:inline-block md:block"> {/* Define a fonte como semibold */}
              Sobre
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}