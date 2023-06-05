import { AppProvider } from '../providers/appProvider/AppProvider'
import StyleProvider from '../providers/styleProvider/StyleProvider'
import Bootstrap from '../core/bootstrap/bootstrap'

export const App = () => (
  <StyleProvider>
    <AppProvider>
      <Bootstrap />
    </AppProvider>
  </StyleProvider>
)

export default App