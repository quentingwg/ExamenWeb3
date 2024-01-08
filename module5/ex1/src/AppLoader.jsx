import { ProviderWrapper } from "./contexts/CountProvider"
import App  from './App'
const AppLoader= () => {
  return (
    < ProviderWrapper>
        <App />
 
      </ ProviderWrapper>
  )
}

export default AppLoader