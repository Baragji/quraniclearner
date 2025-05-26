"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  Menu,
  Search,
  Home,
  Settings,
  User,
  LayoutDashboard,
  Languages,      // Tilføjet import
  GraduationCap,  // Tilføjet import
  MessageSquare,  // Tilføjet import
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { CommandMenu } from "@/components/command-menu";
import { cn } from "@/lib/utils";

interface GlassmorphismHeaderProps {
  isAdmin?: boolean;
  title?: string;
  description?: string;
  imageUrl?: string;
}

export function GlassmorphismHeader({ isAdmin = false }: GlassmorphismHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/80 shadow-md backdrop-blur-md dark:bg-gray-950/80"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4 md:gap-6">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Åbn menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-6">
              <Link
                href="/"
                className="mb-8 flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <BookOpen className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">Ata'allam al-Arabiya</span>
              </Link>
              <nav className="flex flex-col space-y-3">
                <Link
                  href="/"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-base hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Home className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <Link href="/alphabet" className="flex items-center gap-2 rounded-md px-3 py-2 text-base hover:bg-muted" onClick={() => setMobileMenuOpen(false)}><BookOpen className="h-5 w-5" /><span>Alfabet</span></Link>
                <Link href="/vocabulary" className="flex items-center gap-2 rounded-md px-3 py-2 text-base hover:bg-muted" onClick={() => setMobileMenuOpen(false)}><Languages className="h-5 w-5" /><span>Ordforråd</span></Link>
                <Link href="/grammar" className="flex items-center gap-2 rounded-md px-3 py-2 text-base hover:bg-muted" onClick={() => setMobileMenuOpen(false)}><GraduationCap className="h-5 w-5" /><span>Grammatik</span></Link>
                <Link href="/quran" className="flex items-center gap-2 rounded-md px-3 py-2 text-base hover:bg-muted" onClick={() => setMobileMenuOpen(false)}><BookOpen className="h-5 w-5" /><span>Quran</span></Link>
                <Link href="/practice" className="flex items-center gap-2 rounded-md px-3 py-2 text-base hover:bg-muted" onClick={() => setMobileMenuOpen(false)}><MessageSquare className="h-5 w-5" /><span>Øvelser</span></Link>
                
                <hr className="my-3"/>

                <Link
                  href="/profile"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-base hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                  <span>Min Profil</span>
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-base hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Settings className="h-5 w-5" />
                  <span>Indstillinger</span>
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-base hover:bg-muted"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    <span>Admin Dashboard</span>
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="hidden text-lg font-bold sm:inline">
              Ata'allam al-Arabiya
            </span>
            <span className="text-lg font-bold sm:hidden">QAT</span>
          </Link>

          <div className="hidden md:flex">
             <MainNav />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative hidden lg:block">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Søg..."
              className="h-9 w-full rounded-md border border-input bg-background/50 pl-8 pr-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring dark:bg-gray-950/50 md:w-48 lg:w-64"
            />
          </div>
          
          <div className="hidden md:block">
            <CommandMenu />
          </div>

          <UserNav />
        </div>
      </div>
    </header>
  );
}