import { makeStyles } from "@mui/styles";

export default makeStyles(theme => ({
    containerSpaceAround: {
        display: "flex",
        justifyContent: "space-around",
        margin: "10px 0 !important",
        flexDirection: "column",
        flexWrap: "wrap",
    },

    poster: {
        borderRadius: "20px",
        boxShadow: theme.palette.mode === "light" && "0.5em 1em 1em rgb(64, 64, 70)",
        width: "80%",
        // height: "800px",
        marginBottom: "30px",
        [theme.breakpoints.down("md")]: {
            margin: "0 auto",
            width: "50%",
            marginBottom: "30px",
        },
        [theme.breakpoints.down("sm")]: {
            margin: "0 auto",
            width: "100%",
            height: "350px",
            marginBottom: "15px",
        },
    },

    genresContainer: {
        margin: "10px 0 !important",
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
    },

    genreImage: {
        filter: theme.palette.mode === "dark" && "invert(1)",
        marginRight: "10px",
    },

    links: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.down("sm")]: {
            padding: "0.5rem 1rem",
        },
    },
}));
