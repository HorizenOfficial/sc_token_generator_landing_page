import i18next from "i18next"
import React, { Suspense } from "react"
import ReactDOM from "react-dom"
import { I18nextProvider } from "react-i18next"
import { createStore, applyMiddleware, Store } from "redux"
import { QueryClient, QueryClientProvider } from "react-query"
import App from "./App"
import "./index.css"
import reportWebVitals from "./reportWebVitals"
import { AppAction, AppState, DispatchType } from "./types/AppState";
import reducer from "./store/reducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
})

const store: Store<AppState, AppAction> & {
    dispatch: DispatchType
} = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
    <React.StrictMode>
        <QueryClientProvider client={ queryClient }>
            <I18nextProvider i18n={ i18next }>
                <Suspense fallback="loading">
                    <Provider store={ store }>
                        <App/>
                    </Provider>
                </Suspense>
            </I18nextProvider>
        </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()