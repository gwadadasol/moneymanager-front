import Transaction from "./Transaction"
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import DoneIcon from '@material-ui/icons/Done';
import { Rowing } from "@material-ui/icons";
import CategoriesCombobox from "./CategoriesCombobox";

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

const Transactions = ({
  transactions, 
  categories,
  onLoadTransactions, 
  startEditingCategory,
  stopEditingCategory,
  editIdx,
  onChangeTransactionCategory
}) => {
    const classes = useStyles();
    console.log('transaction Values ', transactions)
    console.log('editIdx ', editIdx)
    return (
      <>  
        <Container maxWidth="md">
        <Button onClick={() => {onLoadTransactions() }} >Load Data</Button>
    <TableContainer component={Paper}>
    <Table className={classes.table} size="small" aria-label="simple table">
        <TableHead style={{ backgroundColor: '#546E7A' }} > 
          <TableRow>
            <TableCell style={{ color: 'white', }}>Id</TableCell>
            <TableCell style={{ color: 'white', }}>Date</TableCell>
            <TableCell style={{ color: 'white', }} align="right">Amount</TableCell>
            <TableCell style={{ color: 'white', }} align="right">Description</TableCell>
            <TableCell style={{ color: 'white', }} align="right">Category</TableCell>
            <TableCell style={{ color: 'white', }} align="right">Edit</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{(new Date(row.date)).toLocaleDateString()}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell> {row.id ==  editIdx? (<CategoriesCombobox categories={categories} selectedValue={row.category==null?'None':row.category} onChangeMovementCategory={onChangeTransactionCategory}/>):(row.category)}</TableCell> 
              <TableCell> {row.id ==  editIdx? (<DoneIcon  onClick={() => stopEditingCategory(row.id)}/> ) : (<EditIcon onClick={() => startEditingCategory(row.id, row.category)}/>)} </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>  
      </TableContainer>
      </Container>
      </>
        
    )
}

export default Transactions

// <TextField name={row.id} value={row.category} />