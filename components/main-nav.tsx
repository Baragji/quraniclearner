"use client";

import Link from "next/link";
import { BookOpen, GraduationCap, Languages, MessageSquare, Home, Info, Users } from "lucide-react"; // Tilføjet Home, Info, Users for fuldstændighed
import { usePathname } from "next/navigation"; // Importer usePathname for aktiv stat
import { cn } from "@/lib/utils"; // Importer cn utility

// Definerer navigationslinks med stier og ikoner
const navLinks = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/alphabet", label: "Alfabet", icon: BookOpen },
  { href: "/vocabulary", label: "Ordforråd", icon: Languages },
  { href: "/grammar", label: "Grammatik", icon: GraduationCap },
  { href: "/quran", label: "Quran", icon: BookOpen },
  { href: "/practice", label: "Øvelser", icon: MessageSquare },
  { href: "/community", label: "Community", icon: Users }, // Eksempel på et ekstra link
  { href: "/about", label: "Om Os", icon: Info }, // Eksempel på et ekstra link
];

export function MainNav() {
  const pathname = usePathname(); // Hent den aktuelle sti

  return (
    <nav className="hidden md:flex items-center space-x-2 lg:space-x-4"> {/* Justeret spacing */}
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground",
            pathname === link.href
              ? "bg-primary/10 text-primary" // Aktiv stat styling
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <link.icon className="h-4 w-4" />
          <span>{link.label}</span>
        </Link>
      ))}
    </nav>
  );
}