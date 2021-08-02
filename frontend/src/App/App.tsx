import { Fab, withStyles, Tooltip, Dialog, TextField, MenuItem, Select, Button } from "@material-ui/core";
import { Add, Clear } from "@material-ui/icons";
import { WithStyles } from "@material-ui/styles/withStyles/withStyles";
import React from "react";
import { typesToFunctions } from "../PromotionRow/PromotionRow.utils";
import PromotionsTable from "../PromotionsTable/PromotionsTable";
import { addColumn, clearPromotions, duplicatePromotion, getColumns, getPromotions, initPromotions, removeColumn, removePromotion, updatePromotion } from "./App.api";
import styles from "./App.styles";
import { Column, ColumnId, ColumnType, Promotion } from "./App.types";

interface AppProps extends WithStyles<typeof styles> { };

interface AppState {
  columns: Column[];
  promotions: Promotion[];
  isDialogOpen: boolean;
  columnToAdd: string;
  columnTypeToAdd: ColumnType;
}

class App extends React.Component<AppProps, AppState> {
  private serverUrl: string;
  private columnTypes: ColumnType[];
  private scrollChunk: number;

  constructor(props: AppProps) {
    super(props);
    this.serverUrl = "http://localhost:8080";
    this.columnTypes = Object.keys(typesToFunctions) as ColumnType[];
    this.scrollChunk = 20;

    this.state = {
      columns: [],
      promotions: [],
      isDialogOpen: false,
      columnToAdd: '',
      columnTypeToAdd: this.columnTypes[0]
    };
  }

  async componentDidMount() {
    await this.getData();
  }

  getData = async () => {
    const columns = await getColumns(this.serverUrl);
    this.setState({ columns, promotions: [] }, this.fetchPromotions);
  }

  fetchPromotions = async () => {
    const promotions = await getPromotions(this.serverUrl, this.state.promotions.length, this.scrollChunk);
    this.setState(state => ({ promotions: [...state.promotions, ...promotions] }));
  }

  removeColumn = async (_id: ColumnId) => {
    await removeColumn(this.serverUrl, _id);
    await this.getData();
  };

  initPromotions = async () => {
    await initPromotions(this.serverUrl);
    await this.getData();
  }

  clearPromotions = async () => {
    await clearPromotions(this.serverUrl);
    await this.getData();
  }

  addColumn = async (columnToAdd: ColumnId, columnTypeToAdd: ColumnType) => {
    await addColumn(this.serverUrl, { _id: columnToAdd, type: columnTypeToAdd });
    await this.getData();
    this.setState({ isDialogOpen: false, columnToAdd: '', columnTypeToAdd: this.columnTypes[0] });
  }

  removePromotion = async (_id: string) => {
    await removePromotion(this.serverUrl, _id);
    await this.getData();
  }

  duplicatePromotion = async (promotion: Promotion) => {
    await duplicatePromotion(this.serverUrl, promotion);
    await this.getData();
    alert('A copy of the promotion was successfully added to the end of the list!')
  }

  updatePromotion = async (promotion: Promotion) => {
    await updatePromotion(this.serverUrl, promotion);
    await this.getData();
  }

  render() {
    const { classes } = this.props;
    const { columns, promotions, isDialogOpen, columnToAdd, columnTypeToAdd } = this.state;
    const { removeColumn, initPromotions, clearPromotions, columnTypes, addColumn, removePromotion, duplicatePromotion, updatePromotion, fetchPromotions } = this;

    return (
      <div className={classes.root}>
        <div className={classes.title}>
          Promotions Screen
        </div>
        <PromotionsTable {...{ columns, promotions, removeColumn, removePromotion, duplicatePromotion, updatePromotion, fetchPromotions }} />
        <div className={classes.buttons}>
          <Tooltip title="Generate 10000 rows of promotions">
            <Fab color="default" aria-label="add" onClick={initPromotions}>
              Init
            </Fab>
          </Tooltip>
          <Tooltip title="Remove all promotions">
            <Fab color="secondary" aria-label="add" onClick={clearPromotions}>
              <Clear />
            </Fab>
          </Tooltip>
          <Tooltip title="Add new column">
            <Fab color="primary" aria-label="add" onClick={() => this.setState({ isDialogOpen: true })}>
              <Add />
            </Fab>
          </Tooltip>
        </div>

        <Dialog open={isDialogOpen} onClose={() => this.setState({ isDialogOpen: false })} fullWidth classes={{ paper: classes.dialogPaper }}>
          <h1 className={classes.dialogTitle}>Add New Column</h1>
          <div className={classes.selectors}>
            <TextField id="column-name" label="Column Name" value={columnToAdd} onChange={event => this.setState({ columnToAdd: event.target.value })} />
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={columnTypeToAdd}
              onChange={event => this.setState({ columnTypeToAdd: event.target.value as ColumnType })}
              title="Column Type"
            >
              {columnTypes.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)}
            </Select>
            <Button color="primary" variant="contained" disabled={columnToAdd.length === 0 || columns.some(column => column._id === columnToAdd)} onClick={() => addColumn(columnToAdd as ColumnId, columnTypeToAdd)}>
              Submit
            </Button>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(App);
