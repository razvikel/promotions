import { createStyles } from "@material-ui/core";

const styles = () => createStyles({
    title: {
        textAlign: 'center',
        marginTop: '1%',
        fontSize: 'xxx-large',
        marginBottom: '2%'
    },
    root: {
        height: '80vh'
    },
    buttons: {
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        display: 'flex'
    },
    dialogTitle: {
        textAlign: 'center'
    },
    selectors: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        width: '90%',
        marginLeft: '5%',
        height: '90%'
    },
    dialogPaper: {
        height: '50%'
    }
});

export default styles;