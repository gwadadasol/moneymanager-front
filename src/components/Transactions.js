import * as React from 'react';
import { useState, useEffect } from "react"
import Transaction from "./Transaction"
import { makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import TableContainer from '@material-ui/core/TableContainer';
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

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [editIdx, setEditingTransactionRowIndex] = useState(-1);
  const [editingCategoryValue, setEditingCategoryValue] = useState('');
  const [categories, setCategories] = useState([]);
  // const baseUrlTransaction = 'https://localhost:5001';
  // const baseUrlCategory = 'https://localhost:5011' ;
  const baseUrlTransaction = 'http://acme.com';
  const baseUrlCategory = 'http://acme.com';
  useEffect(() => {

    const getCategories = async () => {
      await updateCategories(); 
    }
    getCategories();
  }, [])

   //  Categories
   const fetchCategories = async () => {
    const res = await fetch(baseUrlCategory + '/api/v1/categories')
    const data = await res.json()

    return data
  }

  const updateCategories = async () => {
    const newCategories = await fetchCategories();

    setCategories(newCategories);
    categories.map((cat) => console.log(cat));
  }


  const fetchTransactions = async () => {
    const res = await fetch(baseUrlTransaction + '/api/v1/transactions');
    const data = await res.json();
    return data;
  }

  const onLoadTransactions = async () => {
    const transactionsFromServer = await fetchTransactions();
    setTransactions(transactionsFromServer);
  }

  const updateTransaction = async (rowId) => {
    var transaction = transactions.find(row => row.id === editIdx);

    const res = await fetch(baseUrlTransaction + `/api/v1/transactions/${transaction.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(transaction)
      }
    );
    const data = await res.json();
    return data;

  }


  const startEditingCategory = (rowId, categoryValue) => {
    setEditingTransactionRowIndex(rowId);
    // setEditingCategoryValue(!categoryValue ? 'None':categoryValue)
    setEditingCategoryValue(categoryValue);
    setTransactions(transactions.map(
      (mvt) => mvt.id === rowId ? { ...mvt, category: categoryValue } : mvt
    ));
  }

  const stopEditingCategory = async (rowId) => {

    await updateTransaction(rowId);
    setEditingTransactionRowIndex(-1);
  }

  const onChangeTransactionCategory = (categoryIndex) => {
    setEditingCategoryValue(categoryIndex);
    var movement = transactions.find(row => row.id == editIdx);
    var category = categories.find(c => c.name == categoryIndex);
    movement.category = category.name;

    setTransactions(transactions.map(
      (mvt) => mvt.id === editIdx ? { ...mvt, category: category.name } : mvt
    ))
  }



  const classes = useStyles();
  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Button onClick={() => { onLoadTransactions() }} >Load Data</Button>
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
                  <TableCell> {row.id == editIdx ? (<CategoriesCombobox categories={categories} selectedValue={row.category == null ? 'None' : row.category} onChangeMovementCategory={onChangeTransactionCategory} />) : (row.category)}</TableCell>
                  <TableCell> {row.id == editIdx ? (<DoneIcon onClick={() => stopEditingCategory(row.id)} />) : (<EditIcon onClick={() => startEditingCategory(row.id, row.category)} />)} </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </React.Fragment>

  )
}

export default Transactions

// <TextField name={row.id} value={row.category} />