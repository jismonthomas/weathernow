'use client';

import { ThemeProvider } from 'next-themes';

export function Theme({ children, ...props }) {
    return <ThemeProvider {...props}>{children}</ThemeProvider>;
}
