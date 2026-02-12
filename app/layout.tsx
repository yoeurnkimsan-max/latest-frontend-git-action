import type React from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, CheckSquare, FolderOpen, Plus } from 'lucide-react';
import { Providers } from '@/app/providers';
import './globals.css';

const _geist = Geist({ subsets: ['latin'] });
const _geistMono = Geist_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TaskFlow',
  description: 'Task management application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Providers>
          <div className="flex h-screen bg-background">
            {/* Sidebar */}
            <aside className="w-64 border-r border-border bg-sidebar p-6 flex flex-col">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">
                    T
                  </span>
                </div>
                <h1 className="text-xl font-bold text-sidebar-foreground">
                  TaskFlow
                </h1>
              </div>

              <nav className="flex flex-col gap-2 flex-1">
                <Link href="/">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Button>
                </Link>
                <Link href="/tasks">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2"
                  >
                    <CheckSquare className="w-4 h-4" />
                    Tasks
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2"
                  >
                    <FolderOpen className="w-4 h-4" />
                    Project
                  </Button>
                </Link>
              </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
