import ReactDOM from 'react-dom/client';
import './index.css';
import React from 'react';
import { theme } from 'theme/theme.ts';
import { RouterProvider } from 'react-router-dom';
import router from 'router/router.tsx';
import { CssBaseline, ThemeProvider } from '@mui/material';
import BreakpointsProvider from 'providers/useBreakpoints';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import Providers from 'context/mainContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BreakpointsProvider>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <Providers>
            <Toaster />
            <RouterProvider
              router={router}
              future={{ v7_startTransition: true }}
            />
          </Providers>
        </QueryClientProvider>
      </BreakpointsProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
