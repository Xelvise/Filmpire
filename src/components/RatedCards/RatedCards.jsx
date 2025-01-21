import { Typography, Box } from "@mui/material";
import { Movie } from "..";
import useStyles from "./styles";

export default function RatedCards({ title, data }) {
    const classes = useStyles();
    return (
        <Box margin="3rem 0">
            <Typography variant="h5" gutterBottom>
                {title}
            </Typography>
            <Box display="flex" flexWrap="wrap" className={classes.container}>
                {data?.map((movie, index) => (
                    <Movie key={movie.id} movie={movie} index={index} />
                ))}
            </Box>
        </Box>
    );
}
