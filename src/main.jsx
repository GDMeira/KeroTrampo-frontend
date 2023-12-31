import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ResetStyle from './style/ReseStyle.js'
import GlobalStyle from './style/GlobalStyle.js'
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ResetStyle />
    <GlobalStyle />
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
