import { IconButton, TableCell, TableRow, TextField, Tooltip, withStyles } from "@material-ui/core";
import { AddToPhotos, Delete, Edit, Send } from "@material-ui/icons";
import { WithStyles } from "@material-ui/styles/withStyles/withStyles";
import { useState } from "react";
import { FunctionComponent } from "react";
import { Column, Promotion } from "../App/App.types";
import styles from "./PromotionRow.styles";
import { isInvalid, labelize, matchToEdit, matchToSubmit } from "./PromotionRow.utils";

interface PromotionRowProps extends WithStyles<typeof styles> {
    columns: Column[];
    promotion: Promotion;
    removePromotion: (_id: string) => Promise<void>;
    duplicatePromotion: (promotion: Promotion) => Promise<void>;
    updatePromotion: (promotion: Promotion) => Promise<void>;
};

const PromotionRow: FunctionComponent<PromotionRowProps> = (props) => {
    const { classes, columns, promotion, removePromotion, duplicatePromotion, updatePromotion } = props;
    let [isEditMode, setIsEditMode] = useState<boolean>(false);
    let [updatedPromotion, setUpdatedPromotion] = useState<Promotion>(matchToEdit(promotion, columns));

    return (
        <TableRow hover role="checkbox" tabIndex={-1} key={promotion._id}>
            {columns.map((column) => {
                const value = promotion[column._id];
                return (
                    <TableCell key={column._id} align={'center'}>
                        {
                            isEditMode ?
                                <TextField
                                    id={column._id}
                                    label={column._id}
                                    value={updatedPromotion[column._id]}
                                    onChange={event => setUpdatedPromotion({ ...updatedPromotion, [column._id]: event.target.value })}
                                /> :
                                labelize(value, column.type)
                        }
                    </TableCell>
                );
            })}
            <TableCell key={'Actions'} align={'center'}>
                <div className={classes.buttons}>
                    <Tooltip title={'Delete Promotion'}>
                        <IconButton onClick={() => removePromotion(promotion._id)}>
                            <Delete />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={'Duplicate Promotion'}>
                        <IconButton onClick={() => duplicatePromotion(promotion)}>
                            <AddToPhotos />
                        </IconButton>
                    </Tooltip>
                    {
                        isEditMode ?
                            <Tooltip title={'Submit Edit'}>
                                <IconButton disabled={isInvalid(updatedPromotion, columns)} onClick={async () => {
                                    await updatePromotion(matchToSubmit(updatedPromotion, columns));
                                    setIsEditMode(false)
                                }}>
                                    <Send />
                                </IconButton>
                            </Tooltip> :
                            <Tooltip title={'Edit Promotion'}>
                                <IconButton onClick={() => setIsEditMode(true)}>
                                    <Edit />
                                </IconButton>
                            </Tooltip>
                    }
                </div>
            </TableCell>
        </TableRow>
    );
}

export default withStyles(styles)(PromotionRow);
