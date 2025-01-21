import { Modal } from "@mui/material";
import useStyle from "./styles";

export default function TrailerModal({ videoKey, openState, updaterFn }) {
    const classes = useStyle();
    return (
        <Modal closeAfterTransition className={classes.modal} open={openState} onClose={() => updaterFn(false)}>
            <iframe
                autoPlay
                className={classes.video}
                frameBorder="0"
                title="Trailer"
                src={`https://www.youtube.com/embed/${videoKey}`}
                allow="autoplay"
            />
        </Modal>
    );
}
