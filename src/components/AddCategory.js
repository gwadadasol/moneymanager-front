import { Button, Container } from '@mui/material';
import { useState } from "react";
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Input, TextField } from '@mui/material';

const AddCategory = ({ categories, onAdd, onDelete }) => {

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
    categories.map((cat) => {
        console.log('AddCategory cat:', cat.id, cat.name)
    }
    )

    return (

        <div>
             <Container maxWidth="xs">
            <form className='add-category' onSubmit={onSubmit}>
                <TextField id='category-name' variant='outlined' label='Category Name' value={name} onChange={(event) => setText(event.target.value)} />
                <Button type="submit" variant="contained">Submit</Button> 
            </form>
            <br/>
           
                <Table size="small" aria-label="simple table">
                    <TableHead style={{ backgroundColor: '#546E7A' }} >
                        <TableRow>
                            <TableCell style={{ color: 'white', }}>Category</TableCell>
                            <TableCell style={{ color: 'white', }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell>{category.name}</TableCell>
                                <TableCell><Button id={category.id} type='button' value='delete' onClick={(event) => onDelete(event.target.id)} >Delete</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Container>

        </div>

    )
}

export default AddCategory
