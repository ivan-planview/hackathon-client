import '@/App.css'
import { TreeMap } from './components/organisms/TreeMap'
import { MainProvider } from './components/providers/MainProvider'
import { MainLayout } from './components/templates/MainLayout'

function App() {
  return (
    <MainProvider>
      <MainLayout>
        <TreeMap />
      </MainLayout>
    </MainProvider>
  )
}

export default App
