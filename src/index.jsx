import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './store/AuthContext.jsx'
import { Store } from './StoreOfData/store.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthContextProvider>
        <Store>
            <App />
        </Store>
    </AuthContextProvider>
)