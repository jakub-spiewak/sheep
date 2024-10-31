import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {Provider as ChakraProvider} from "@/components/ui/provider.tsx";
import {App} from "@/App.tsx";
import {Provider} from "react-redux";
import {store} from "@/redux/store.ts";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <ChakraProvider>
                <App/>
            </ChakraProvider>
        </Provider>
    </StrictMode>,
)
