import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './authContext.jsx'
import { SubjectProvider } from './subjectContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SubjectProvider>
          <App />
        </SubjectProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
