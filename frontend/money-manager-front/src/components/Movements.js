import Movement from "./Movement"
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

const Movements = ({movements}) => {
    const classes = useStyles();
    return (
        <Container maxWidth="sm">
    <TableContainer component={Paper}>
    <Table className={classes.table} size="small" aria-label="simple table">
        <TableHead style={{ backgroundColor: '#546E7A' }} > 
          <TableRow>
            <TableCell style={{ color: 'white', }}>Date</TableCell>
            <TableCell style={{ color: 'white', }} align="right">Amount</TableCell>
            <TableCell style={{ color: 'white', }} align="right">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movements.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">{row.date}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>  
      </TableContainer>
      </Container>
        
    )
}

export default Movements
