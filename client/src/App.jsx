import './App.css'
import { DisplayModeProvider } from './context/DisplayModeContext'
import { UserProvider } from './context/UserContext'
import AppRouter from './router/AppRouter'

function App() {

  return (
    <DisplayModeProvider>
      <UserProvider>
        <AppRouter />
      </UserProvider>
    </DisplayModeProvider>
  )
}

export default App
