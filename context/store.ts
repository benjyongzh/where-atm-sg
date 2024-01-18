import { configureStore } from "@reduxjs/toolkit";

//middleware
// import { createLogger } from "redux-logger";
// const logger = createLogger();

//redux-persist
// import { persistReducer, persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import thunk from "redux-thunk";
// import { combineReducers } from "@reduxjs/toolkit";

// const persistConfig = {
//   key: "root",
//   storage,
//   blacklist: ["page"],
// };

//reducers
import atmDataReducer from "@/features/atmData/atmDataSlice";
import settingsReducer from "@/features/settings/settingsSlice";
import displayReducer from "@/features/display/displaySlice";
import errorsReducer from "@/features/errors/errorsSlice";
// const rootReducer = combineReducers({
//   auth: authReducer,
//   page: pageReducer,
//   display: displayReducer,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

//this object
export const store = configureStore({
  //the reducer key is similar to the combineReducer of the original redux
  reducer: {
    atmData: atmDataReducer,
    settings: settingsReducer,
    display: displayReducer,
    errors: errorsReducer,
  },
  //middleware takes a function that has getDefaultMiddleware. concat your middleware to it
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  // middleware: [thunk],
});

// export const persistor = persistStore(store);
// export const store = makeStore();
// export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export const storeWrapper = createWrapper<RootStore>(makeStore);

/* 
import {
  Action,
  AnyAction,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import atmDataReducer from "@/features/atmData/atmDataSlice";
import settingsReducer from "@/features/settings/settingsSlice";

const combinedReducer = combineReducers({
  atmData: atmDataReducer,
  settings: settingsReducer,
});

// const reducer = (
//   state: ReturnType<typeof combinedReducer>,
//   action: AnyAction
// ) => {
//   if (action.type === HYDRATE) {
//     const nextState = {
//       ...state, // use previous state
//       ...action.payload, // apply delta from hydration
//     };
//     return nextState;
//   } else {
//     return combinedReducer(state, action);
//   }
// };

export const makeStore = () =>
  configureStore({
    reducer: combinedReducer,
  });

type Store = ReturnType<typeof makeStore>;

export type AppDispatch = Store["dispatch"];
export type RootState = ReturnType<Store["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper(makeStore, { debug: true });
 */
