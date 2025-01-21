import { makeStyles } from "@mui/styles";

export default makeStyles(theme => ({
    buttonsContainer: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
        },
    },
}));
