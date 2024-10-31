import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {Provider as ChakraProvider} from "@/components/ui/provider.tsx";
import {App} from "@/App.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ChakraProvider>
            <App/>
        </ChakraProvider>
    </StrictMode>,
)
