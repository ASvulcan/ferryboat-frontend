import { Link } from "wouter";
import { Ship, LogOut, ArrowLeftFromLine } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminNavbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border shadow-sm h-14">
      <div className="h-full px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center border border-primary/25">
            <Ship className="w-3.5 h-3.5 text-primary" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-serif text-base font-bold tracking-wide text-foreground">
              Ferry<span className="text-primary font-light">Booking</span>
            </span>
            <span className="text-[8px] font-sans text-muted-foreground tracking-wider uppercase leading-tight">Admin Panel</span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <span className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Admin
          </span>
          <Link href="/">
            <Button variant="outline" size="sm" className="h-8 gap-1.5 border-border text-xs">
              <ArrowLeftFromLine className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Exit Admin</span>
              <span className="sm:hidden">Exit</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}