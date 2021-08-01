import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, withStyles } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { WithStyles } from "@material-ui/styles/withStyles/withStyles";
import { FunctionComponent } from "react";
import { Column, ColumnId, Promotion } from "../App/App.types";
import PromotionRow from "../PromotionRow/PromotionRow";
import styles from "./PromotionsTable.styles";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from "react";

interface PromotionsTableProps extends WithStyles<typeof styles> {
    columns: Column[];
    promotions: Promotion[];
    removeColumn: (_id: ColumnId) => Promise<void>;
    removePromotion: (_id: string) => Promise<void>;
    duplicatePromotion: (promotion: Promotion) => Promise<void>;
    updatePromotion: (promotion: Promotion) => Promise<void>;
};

const PromotionsTable: FunctionComponent<PromotionsTableProps> = (props) => {
    const { classes, columns, promotions, removeColumn, removePromotion, duplicatePromotion, updatePromotion } = props;
    const promotionsChunk = 20;
    let [promotionsDisplayed, setPromotionsDisplayed] = useState<number>(0);

    const displayedPromotions = promotions.slice(0, promotionsDisplayed + promotionsChunk);

    return (
        <InfiniteScroll
            dataLength={displayedPromotions.length}
            next={() => setPromotionsDisplayed(Math.min(promotionsDisplayed + promotionsChunk, promotions.length - promotionsChunk))}
            hasMore={true}
            loader={null}
            scrollableTarget="scrollable"
        >
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <div id="scrollable" className={classes.scrollable}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow key="header">
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column._id}
                                            align={'center'}
                                            style={{ fontWeight: 'bold' }}
                                        >
                                            {column._id}
                                            <Tooltip title={'Delete Column (Be Careful!!!)'}>
                                                <IconButton onClick={() => removeColumn(column._id)}>
                                                    <Delete></Delete>
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    ))}
                                    <TableCell
                                        key={'Actions'}
                                        align={'center'}
                                        style={{ fontWeight: 'bold' }}
                                    >
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {displayedPromotions.map(promotion => <PromotionRow key={promotion._id} {...{ promotion, columns, removePromotion, duplicatePromotion, updatePromotion }} />)}
                            </TableBody>
                        </Table>
                    </div>
                </TableContainer>
            </Paper>
        </InfiniteScroll>
    );
}

export default withStyles(styles)(PromotionsTable);
