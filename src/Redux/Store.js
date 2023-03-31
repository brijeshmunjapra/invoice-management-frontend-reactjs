import rootSaga from "./rootSaga";

import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./rootReducer";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

// const store = createStore(VendorReducer, applyMiddleware(...middleware));

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware)
  // other store enhancers if any
);
const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store;
