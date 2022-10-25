import { configureStore } from '@reduxjs/toolkit';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { WalletReducer} from './WalletStateReducer';
import { UsersContractReducer } from './UsersContractReducer';
import {PageReducer} from './PageReducer';
import { BrowserHistory, createBrowserHistory } from 'history';
import thunk from 'redux-thunk';

export const history = createBrowserHistory();

const rootReducer = (history : BrowserHistory) => ({
    walletStateReducer : WalletReducer,
    usersContractReducer : UsersContractReducer,
    pageReducer : PageReducer, 
    router: connectRouter(history)
});

const preloadedState = {};

export const StateStore = configureStore({
    middleware: [thunk, routerMiddleware(history)],
    reducer: rootReducer(history),
    preloadedState,
});