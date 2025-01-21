import { makeStyles } from "@mui/styles";

export default makeStyles(theme => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    video: {
        width: "50%",
        height: "50%",
        [theme.breakpoints.down("sm")]: {
            width: "90%",
            height: "90%",
        },
    },
}));
