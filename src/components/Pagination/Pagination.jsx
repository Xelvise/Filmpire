import { Typography, Button } from "@mui/material";
import useStyles from "./styles";

export default function Pagination({ currentPage, totalPages, updatePage }) {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Button
                className={classes.button}
                variant="contained"
                color="primary"
                type="button"
                onClick={() => updatePage(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Prev
            </Button>
            <Typography variant="h6" className={classes.pageNumber}>
                {currentPage} / {totalPages}
            </Typography>
            <Button
                className={classes.button}
                variant="contained"
                color="primary"
                type="button"
                onClick={() => updatePage(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </Button>
        </div>
    );
}
