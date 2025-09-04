import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./product/productSlice.ts";
import userReducer from "./user/userSlice.ts";
import orderReducer from "./order/orderSlice.ts";
import cartReducer from "./cart/cartSlice.ts";
import adminReducer from "./admin/adminSlice.ts"
import { setAxiosStore } from "../utils/axiosConfig.ts";


export const store=configureStore({
reducer:{
    product:productReducer,
    user:userReducer,
    cart:cartReducer,
    order:orderReducer,
    admin:adminReducer
}
})

setAxiosStore(store);



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;