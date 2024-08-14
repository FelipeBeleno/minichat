"use client";

import { NextUIProvider } from "@nextui-org/react";

import { Provider } from "react-redux";
import store from "@/redux/store";
import { FC, ReactNode } from "react";
import { SideBar } from "./SideBar";

type Props = {
    children: ReactNode;
};

const Providers: FC<Props> = ({ children }) => {
    return (
        <NextUIProvider>
            <Provider store={store}>
                <SideBar>
                    {children}
                </SideBar>
            </Provider>
        </NextUIProvider>
    );
};

export default Providers;
