import { ReactNode } from 'react'

import { Toolbar } from '@/components/molecules/Toolbar'

interface MainLayoutProps {
  children: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <div
        style={{
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          minWidth: '100vw',
        }}
      >
        <Toolbar />
        <main
          style={{ height: `calc(100vh - 46px - 46px)`, position: 'relative' }}
        >
          {children}
        </main>
      </div>
    </>
  )
}
