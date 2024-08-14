"use client";
import {
    Avatar,
    BreadcrumbItem,
    Breadcrumbs,
    Button,
    Divider,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Link,
} from "@nextui-org/react";
import { FC, ReactNode, createElement, useEffect, useState } from "react";

import {
    ArrowBendRightDown,
    BellSimple,
    Coffee,
    GlobeHemisphereWest,
    List,
    MagnifyingGlass,
    Info,
    HouseSimple,
} from "@phosphor-icons/react";

import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import LoaderAll from "./LoaderAll";

const menus = [
    { name: "Home", link: "/", icon: HouseSimple },
    { name: "Soporte", link: "/support", icon: Info },

];

type Props = {
    children: ReactNode;
};

export const SideBar: FC<Props> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();


    const state = useSelector((state: RootState) => state.loader.state);

    const [isActivate, setIsActivate] = useState({
        name: "",
        link: "",
    });

    useEffect(() => {
        let [act] = menus.filter((m) => m.link === pathname);
        setIsActivate({
            link: act?.link,
            name: act?.name,
        });
    }, [pathname]);

    return <div className="flex">
        {state && <LoaderAll />}
        <div
            className={`${open ? "xs:w-72 " : "w-0"} 
             ${open ? "sm:w-72 " : "w-0"}
             ${open ? "md:w-72" : "md:w-20"} 
             ${open ? "lg:w-72" : "lg:w-20"}
             ${open ? "xl:w-72" : "xl:w-20"} 
             ${open ? "2xl:w-72" : "2xl:w-24"} 
             duration-300 h-screen bg-white shadow-2xl
            `}
        >
            <div
                className={`p-8 flex gap-x-4 ${open ? "justify-start" : "justify-center"
                    } items-center`}
            >
                <div className={`${open ? "" : "xs:hidden"}`}>
                    <Coffee size={32} />
                </div>
                {open && (
                    <h1 className="origin-left font-medium text-md">Admin Template</h1>
                )}
            </div>

            <div
                className={`p-8 flex flex-col gap-5 gap-x-4 ${open ? "justify-start" : "justify-center"
                    }  ${open ? "" : "xs:hidden"} items-center`}
            >
                {menus.map((m, i) => {
                    return !open ? (
                        <Link key={i} href={m.link}>
                            <Button
                                className="duration-300"
                                key={i}
                                isIconOnly
                                variant={isActivate.name === m.name ? "solid" : "bordered"}
                                color="primary"
                                aria-label={m.name}
                            >
                                {createElement(m.icon)}
                            </Button>
                        </Link>
                    ) : (
                        <Link className="w-full" key={i} href={m.link}>
                            <Button
                                className="duration-300 w-full"
                                key={i}
                                fullWidth
                                variant={isActivate.name === m.name ? "solid" : "bordered"}
                                color="primary"
                                aria-label={m.name}
                                startContent={createElement(m.icon)}
                            >
                                {m.name}
                            </Button>
                        </Link>
                    );
                })}
            </div>
        </div>

        <div className="w-full h-screen overflow-auto bg-gray-100 ">
            <div className="w-full flex flex-row justify-between items-center bg-gray-100 sticky top-0">
                <div className="flex flex-row gap-1 justify-start items-center pt-5 pb-7">
                    <Button
                        size="lg"
                        onClick={() => setOpen(!open)}
                        isIconOnly
                        variant="light"
                        aria-label="Like"
                    >
                        <List />
                    </Button>
                </div>

                <div className="flex flex-row gap-1 justify-start items-center pt-5 pb-7">
                    <Button
                        size="md"
                        onClick={() => setOpen(!open)}
                        isIconOnly
                        variant="light"
                        aria-label="Like"
                    >
                        <GlobeHemisphereWest />
                    </Button>

                    <Button
                        size="md"
                        onClick={() => setOpen(!open)}
                        isIconOnly
                        variant="light"
                        aria-label="Like"
                    >
                        <BellSimple />
                    </Button>

                    <Button
                        size="md"
                        onClick={() => setOpen(!open)}
                        isIconOnly
                        variant="light"
                        aria-label="Like"
                    >
                        <MagnifyingGlass />
                    </Button>

                    <Divider style={{ height: "2.5rem" }} orientation="vertical" />

                    <div className="flex ">
                        <Avatar src={'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png'} size="md" />
                        <Dropdown>
                            <DropdownTrigger>
                                <Button endContent={<ArrowBendRightDown />} variant="light">
                                    Hola,<b>{'Amigo'}</b>
                                </Button>
                            </DropdownTrigger>

                            <DropdownMenu aria-label="Static Actions">
                                <DropdownItem
                                    onClick={() => { }}
                                    key="delete"
                                    className="text-danger"
                                    color="danger"
                                    textValue="Cierre de sessión"
                                >
                                    Cierre de sesión
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </div>

            <div className="px-5 bg[rgb(250, 251, 251)]">
                <div className="grid grid-cols-12 gap-5 w-full">
                    <div className="col-span-12 flex flex-col  gap-5">
                        <div>
                            <h1 className="text-2xl font-black">{isActivate.name}</h1>
                        </div>
                        <div>
                            <Breadcrumbs >
                                <BreadcrumbItem>Inicio</BreadcrumbItem>
                                <BreadcrumbItem>{isActivate.name}</BreadcrumbItem>
                            </Breadcrumbs>
                        </div>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    </div>

};
