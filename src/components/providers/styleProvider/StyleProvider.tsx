import { ThemeProvider } from 'styled-components'


type StyleProviderProps = {
  children: React.ReactNode
};

export const StyleProvider = ({children}: StyleProviderProps) => (
  <ThemeProvider theme={{}}>
    {children}
  </ThemeProvider>
)

export default StyleProvider;