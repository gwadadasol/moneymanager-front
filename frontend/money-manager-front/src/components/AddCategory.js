import { Button, Container, TextField } from '@material-ui/core'
import { useState } from "react"
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const AddCategory = ({ categories, onAdd }) => {

    const [name, setText] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        if (!name) {
            alert('Please add a category')
            return
        }

        onAdd({ name })

        setText('')
    }

    return (
        <div>
            <Grid container spacing={3}>
            <Grid item xs={6}>
            <form className='add-category' onSubmit={onSubmit}>
                <TextField id='category-name' variant='outlined' label='Category Name' value={name} onChange={(event) => setText(event.target.value)} />
                <Button type="submit" variant="contained" >Add</Button>
            </form>
            </Grid>
            <Grid item xs={6}>
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="simple table">
                        <TableHead style={{ backgroundColor: '#546E7A' }} >
                            <TableRow>
                                <TableCell style={{ color: 'white', }}>Category</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell component="th" scope="row">{category.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            </Grid>
            
        </div>

    )
}

export default AddCategory
