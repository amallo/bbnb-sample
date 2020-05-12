import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from '../reducers';
import thunk from 'redux-thunk';

// On déclare le moteur de stockage utilisé par redux-persist
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

// On liste ici les middleware dont on a besoin
//
const middlewares = [thunk]

// composeWithDevTools() permet le debuggage dans React Native Debugger
// 
const enhancers = [composeWithDevTools({})(applyMiddleware(...middlewares))]

const persistedReducer = persistReducer(persistConfig, reducers)
export const store = createStore(persistedReducer, compose(...enhancers));
export const persistor = persistStore(store)