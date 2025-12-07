import './App.css'
import { DisplayModeProvider } from './context/DisplayModeContext'
import { SessionContextProvider } from './context/SessionContext'
import { UserProvider } from './context/UserContext'
import AppRouter from './router/AppRouter'

function App() {

  return (
    <DisplayModeProvider>
      <UserProvider>
        <SessionContextProvider>
          <AppRouter />
        </SessionContextProvider>
      </UserProvider>
    </DisplayModeProvider>
  )
}

export default App
