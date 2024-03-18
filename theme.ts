import { createTheme } from "@mantine/core";
const theme = createTheme({
    defaultRadius: "sm",
    primaryColor: "pink",
    primaryShade: 7,

    colors: {},
    components: {
        ActionIcon: {
            defaultProps: {
                size: "lg",
            },
        },
        Card: {
            defaultProps: {
                shadow: "sm",
                bg: "dark.8",
            },
        },
    },
});

export default theme;
