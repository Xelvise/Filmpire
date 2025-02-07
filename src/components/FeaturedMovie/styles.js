import { makeStyles } from "@mui/styles";

export default makeStyles(theme => ({
    featuredCardContainer: {
        marginBottom: "20px",
        display: "flex",
        justifyContent: "center",
        height: "490px",
        textDecoration: "none",
    },

    card: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
    },

    cardRoot: {
        position: "relative",
    },

    cardMedia: {
        position: "absolute",
        top: 0,
        right: 0,
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.575)",
        backgroundBlendMode: "darken",
        borderRadius: "15px",
    },

    cardContent: {
        color: "#fff",
        width: "40%",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
    },

    cardContentRoot: {
        position: "relative",
        backgroundColor: "transparent",
    },

    movieHeadline: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%", // Ensure it takes the full height of the parent
        textAlign: "center", // Center text horizontally
        color: "#fff",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
    },
}));
