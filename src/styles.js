import { makeStyles } from "@mui/styles";

export default makeStyles(theme => ({
    root: {
        display: "flex",
        height: "100%",
        minWidth: "350px",
    },
    toolbar: {
        height: "70px",
    },
    content: {
        flexGrow: "1",
        padding: "5.5em 2em",
        width: "100%",
    },
}));
