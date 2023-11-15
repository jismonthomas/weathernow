'use client';

import { Monitor, Moon, MoonStar, Sun, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

export default function ThemeToggler() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className=" rounded-full flex justify-start p-1 relative bg-secondary">
            <Button
                variant="ghost"
                size="icon"
                className="rounded-full relative"
                onClick={() => setTheme('light')}>
                <SunIcon
                    className="relative z-10 text-accent dark:text-accent-foreground"
                    size={16}
                />

                {theme === 'light' && (
                    <motion.div
                        layout
                        layoutId="switch-bg"
                        className="absolute aspect-square h-full w-full rounded-full bg-accent-foreground z-0"></motion.div>
                )}
            </Button>

            <Button
                variant="ghost"
                size="icon"
                className="rounded-full relative"
                onClick={() => setTheme('system')}>
                <Monitor
                    className={clsx('relative z-10', {
                        'text-background': theme === 'system',
                    })}
                    size={16}
                />
                {theme === 'system' && (
                    <motion.div
                        layout
                        layoutId="switch-bg"
                        className="absolute aspect-square h-full w-full rounded-full bg-accent-foreground z-0"></motion.div>
                )}
            </Button>

            <Button
                variant="ghost"
                size="icon"
                className="rounded-full relative"
                onClick={() => setTheme('dark')}>
                <MoonStar
                    className={clsx('relative z-10', {
                        'text-background': theme === 'dark',
                    })}
                    size={16}
                />
                {theme === 'dark' && (
                    <motion.div
                        layout
                        layoutId="switch-bg"
                        className="absolute aspect-square h-full w-full rounded-full bg-accent-foreground z-0"></motion.div>
                )}
            </Button>
        </div>
        // <Button
        //     variant="outline"
        //     className=" w-14 h-7 rounded-full flex justify-start p-1 dark:justify-end relative bg-secondary"
        //     size=""
        //     onClick={changeTheme}>
        //     <motion.div
        //         layout
        //         className=" aspect-square h-5 rounded-full bg-accent-foreground z-0"></motion.div>

        //     <SunIcon
        //         className="absolute left-1.5 z-10 text-accent dark:text-accent-foreground"
        //         size={16}
        //     />
        //     <MoonStar
        //         className="absolute right-1.5 z-10 dark:text-background"
        //         size={16}
        //     />
        //     <span className="sr-only">Toggle theme</span>
        // </Button>

        // <DropdownMenu>
        //     <DropdownMenuTrigger asChild>
        //         <Button variant="outline" size="icon">
        //             <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        //             <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        //             <span className="sr-only">Toggle theme</span>
        //         </Button>
        //     </DropdownMenuTrigger>
        //     <DropdownMenuContent align="end">
        //         <DropdownMenuItem onClick={() => setTheme('light')}>
        //             Light
        //         </DropdownMenuItem>
        //         <DropdownMenuItem onClick={() => setTheme('dark')}>
        //             Dark
        //         </DropdownMenuItem>
        //         <DropdownMenuItem onClick={() => setTheme('system')}>
        //             System
        //         </DropdownMenuItem>
        //     </DropdownMenuContent>
        // </DropdownMenu>
    );
}
