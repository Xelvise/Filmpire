import { makeStyles } from "@mui/styles";

export default makeStyles(theme => ({
    links: {
        color: theme.palette.text.primary,
        textDecoration: "none",
    },

    genreImage: {
        filter: theme.palette.mode === "dark" && "invert(1)",
    },
}));
