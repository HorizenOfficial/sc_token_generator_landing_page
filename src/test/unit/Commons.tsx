import { AppState } from "../../types/AppState"
import { QueryClient, QueryClientProvider } from "react-query"
import { configureStore, PreloadedState } from '@reduxjs/toolkit'
import reducer, { initialState } from "../../store/reducer"
import { Provider, ReactReduxContext } from "react-redux"

export function TestWrapper({
                                children,
                                preloadedState
                            }: {
    children: JSX.Element;
    preloadedState?: PreloadedState<AppState>;
}) {
    const queryClient = new QueryClient()

    const mockDispatch = jest.fn().mockReturnValue(jest.fn());
    const mockSelector = jest.fn().mockReturnValue(preloadedState ?? initialState);

    jest.mock("react-redux", () => ({
        ...jest.requireActual("react-redux"),
        useDispatch: () => mockDispatch,
        useSelector: () => mockSelector,
    }));

    return (
        <Provider context={ReactReduxContext} store={configureStore({reducer, preloadedState})}>
            <QueryClientProvider client={ queryClient }>
                { children }
            </QueryClientProvider>
        </Provider>
    )
}