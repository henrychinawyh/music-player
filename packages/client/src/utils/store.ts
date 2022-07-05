import { applyMiddleware, compose, legacy_createStore as createStore } from 'redux'

import createSagaMiddleware from 'redux-saga'
import reducers from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware()


const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

const store = createStore(reducers,enhancer)

sagaMiddleware.run(rootSaga) // 监听异步操作



export default store