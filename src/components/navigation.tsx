"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, Plus, List } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navigation() {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/",
      label: "Job Listings",
      icon: List,
      active: pathname === "/",
    },
    {
      href: "/add-job",
      label: "Add Job",
      icon: Plus,
      active: pathname === "/add-job",
    },
  ];

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Briefcase className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">SL JobBoard</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    item.active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
