import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { routeTree } from './routeTree.gen';
import { AuthProvider } from './state/auth-context';
import { DataProvider } from './state/cardsDataContext';
import { SortFilterProvider } from './state/sortFilterContext';
import './index.css';

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <DataProvider>
      <SortFilterProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </SortFilterProvider>
    </DataProvider>
  </AuthProvider>
)
