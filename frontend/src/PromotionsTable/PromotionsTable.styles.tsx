import { createStyles } from "@material-ui/core";

const styles = () => createStyles({
    root: {
        width: '100%',
        height: '100%'
    },
    container: {
        maxHeight: '100%'
    },
    scrollable: {
        maxHeight: '80vh',
        overflowY: 'auto'
    }
});

export default styles;