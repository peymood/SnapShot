import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient()


createRoot(document.getElementById('root')!).render(

  <BrowserRouter>
    <StrictMode>
      <QueryClientProvider client={queryClient} >
        <App />
      </QueryClientProvider>
    </StrictMode>
  </BrowserRouter>
)
