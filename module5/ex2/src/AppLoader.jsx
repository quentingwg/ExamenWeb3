import App from "./App"
import { ProviderWrapper } from "./contexts/opinionContext"
const AppLoader = () => {
    return ( 
   <ProviderWrapper> <App/>
    </ProviderWrapper>
    )
}

export default AppLoader