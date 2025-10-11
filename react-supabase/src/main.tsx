import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './pages'
import SignUp from './pages/sign-up'
import SignIn from './pages/sign-in'
import RootLayout from './pages/layout.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import CreateTopic from './pages/topics/[topic_id]/create.tsx'
import { Toaster } from './components/ui/sonner.tsx'
import TopicDetail from './pages/topics/[topic_id]/detail.tsx'
import Portfolio from './pages/portfolio/index.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
              <Route path='/' element={<App/>} />
              <Route path='/sign-up' element={<SignUp/>} />
              <Route path='/sign-in' element={<SignIn/>} />
              <Route path='/topics/:id/create' element={<CreateTopic/>} />
              <Route path='/topics/:id/detail' element={<TopicDetail/>} />
              <Route path='/portfolio' element={<Portfolio/>} />
          </Route>
        </Routes> 
      </BrowserRouter>
      <Toaster richColors position='top-center'/>
    </ThemeProvider>
  </StrictMode>,
)
