"use client"; // Sørg for at denne er i toppen, hvis du bruger hooks som useState/useEffect

import Link from "next/link";
import { Bell, LogOut, Settings, User, ChevronDown, Moon, Sun } from "lucide-react"; // Tilføjet ChevronDown, Moon, Sun
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Antager du har AvatarImage også
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,      // Tilføjet for tema
  DropdownMenuSubTrigger, // Tilføjet for tema
  DropdownMenuPortal,    // Tilføjet for tema
  DropdownMenuSubContent, // Tilføjet for tema
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes"; // Tilføjet for tema-skift
import { useState, useEffect } from "react"; // Tilføjet for client-side rendering af tema

// Simuleret brugerdata - erstat med faktiske data fra din auth-løsning
const mockUser = {
  name: "Ahmed Bakir",
  email: "ahmed.bakir@example.com",
  avatarUrl: "/placeholder-user.jpg", // Sørg for at denne fil findes i /public, eller brug en rigtig URL
  initials: "AB",
  notifications: 3, // Simuleret antal notifikationer
};

export function UserNav() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Sørg for at komponenten er mounted før tema-specifik UI renderes, for at undgå hydration mismatch
  useEffect(() => setMounted(true), []);

  const handleLogout = () => {
    // Implementer logud funktionalitet her
    // F.eks. ryd session, redirect til login-side
    console.log("Bruger logger ud...");
    // router.push('/auth/login'); // Hvis du bruger Next.js router
  };

  if (!mounted) {
    // Vis en placeholder eller intet, mens komponenten mounter, for at undgå tema-flimmer
    return (
      <div className="flex items-center gap-2">
        <div className="h-9 w-9 rounded-full bg-muted animate-pulse"></div>
        <div className="h-9 w-9 rounded-full bg-muted animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {mockUser.notifications > 0 && (
              <span className="absolute top-0 right-0 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            )}
            <span className="sr-only">Notifikationer</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80" align="end"> {/* Justeret bredde */}
          <DropdownMenuLabel>Notifikationer</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {mockUser.notifications > 0 ? (
            <>
              <DropdownMenuItem onSelect={() => console.log("Notifikation 1 klikket")}>
                <div className="flex flex-col">
                  <span className="font-medium">Ny lektion tilgængelig!</span>
                  <span className="text-xs text-muted-foreground">
                    "Avanceret Verb Bøjning" er nu låst op.
                  </span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => console.log("Notifikation 2 klikket")}>
                <div className="flex flex-col">
                  <span className="font-medium">Din streak fortsætter!</span>
                  <span className="text-xs text-muted-foreground">
                    Godt klaret! Du har en 5-dages streak.
                  </span>
                </div>
              </DropdownMenuItem>
              {mockUser.notifications > 2 && (
                 <DropdownMenuItem onSelect={() => console.log("Notifikation 3 klikket")}>
                    <div className="flex flex-col">
                    <span className="font-medium">Ny kommentar</span>
                    <span className="text-xs text-muted-foreground">
                        Ali svarede på dit spørgsmål i forummet.
                    </span>
                    </div>
                </DropdownMenuItem>
              )}
            </>
          ) : (
            <DropdownMenuItem disabled>
              <span className="text-sm text-muted-foreground p-2">Ingen nye notifikationer</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="justify-center">
            <Link href="/notifications" className="text-sm text-primary hover:underline">
              Se alle notifikationer
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-9 w-9 rounded-full">
            <Avatar className="h-9 w-9">
              {/* Erstat med <AvatarImage src={mockUser.avatarUrl} alt={mockUser.name} /> hvis du har billeder */}
              <AvatarImage src={mockUser.avatarUrl} alt={mockUser.name} />
              <AvatarFallback className="bg-primary/20 text-primary dark:bg-primary/30 dark:text-primary-foreground">
                {mockUser.initials}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{mockUser.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {mockUser.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href="/profile" passHref>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profil</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/settings" passHref>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Indstillinger</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          {/* Tema skift sub-menu */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              {theme === 'light' && <Sun className="mr-2 h-4 w-4" />}
              {theme === 'dark' && <Moon className="mr-2 h-4 w-4" />}
              {theme === 'system' && ( // Viser et generisk ikon eller intet for system
                <Settings className="mr-2 h-4 w-4" />
              )}
              <span>Tema</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="mr-2 h-4 w-4" />
                  Lys
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="mr-2 h-4 w-4" />
                  Mørk
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Settings className="mr-2 h-4 w-4" />
                  System
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log ud</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}