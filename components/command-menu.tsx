"use client"

import { useEffect, useState } from "react"
import { BookOpen, FileText, Home, Search, Settings, User } from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

export function CommandMenu() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Skriv en kommando eller søg..." />
      <CommandList>
        <CommandEmpty>Ingen resultater fundet.</CommandEmpty>
        <CommandGroup heading="Forslag">
          <CommandItem>
            <Home className="mr-2 h-4 w-4" />
            <span>Gå til Dashboard</span>
          </CommandItem>
          <CommandItem>
            <BookOpen className="mr-2 h-4 w-4" />
            <span>Mine Kurser</span>
          </CommandItem>
          <CommandItem>
            <FileText className="mr-2 h-4 w-4" />
            <span>Fortsæt Læring: Pandas DataFrame Manipulation</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Kurser">
          <CommandItem>
            <Search className="mr-2 h-4 w-4" />
            <span>Søg i Kurser</span>
          </CommandItem>
          <CommandItem>
            <BookOpen className="mr-2 h-4 w-4" />
            <span>Dataanalyse med Python</span>
          </CommandItem>
          <CommandItem>
            <BookOpen className="mr-2 h-4 w-4" />
            <span>Avanceret Frontend Udvikling</span>
          </CommandItem>
          <CommandItem>
            <BookOpen className="mr-2 h-4 w-4" />
            <span>Machine Learning Grundkursus</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Konto">
          <CommandItem>
            <User className="mr-2 h-4 w-4" />
            <span>Min Profil</span>
          </CommandItem>
          <CommandItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Indstillinger</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
