import {
    IoHomeOutline,
    IoSearchOutline,
    IoCreateOutline,
    IoPeopleOutline,
    IoPaperPlaneOutline,
    IoPersonOutline,
} from "react-icons/io5";

export type NLink = {
    label: string;
    icon: React.ReactNode;
    link: string;
};

export const links = [
    {
        label: "Home",
        icon: <IoHomeOutline />,
        link: "/",
    },
    {
        label: "Search",
        icon: <IoSearchOutline />,
        link: "/search",
    },
    {
        label: "Create Thread",
        icon: <IoCreateOutline />,
        link: "/threads/create",
    },
    {
        label: "Messages",
        icon: <IoPaperPlaneOutline />,
        link: "/messages",
    },
    {
        label: "Network",
        icon: <IoPeopleOutline />,
        link: "/network",
    },
    {
        label: "Profile",
        icon: <IoPersonOutline />,
        link: "/profile",
    },
] as NLink[];
