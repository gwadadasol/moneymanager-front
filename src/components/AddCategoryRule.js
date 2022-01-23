import React from 'react'
import { useState } from "react"
import NativeSelect from '@material-ui/core/NativeSelect';
import { Button, Container, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { TextField } from '@mui/material';
const AddCategoryRule = ({ categories, categoryRules, onAdd, onDelete }) => {

    const [pattern, setPattern] = useState('')
    const [category, setCategory] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(e)

        if (!pattern) {
            alert('Please define a pattern')
            return
        }

        onAdd(category, pattern);
    }

    const handleChange = (event) => {
        var value = event.target.value;
        setCategory(value);
        console.log("Rule Category ", value);
    };


    categories.map((cat) => {
        console.log("AddCategoryRule cat:", cat.id, cat.category, cat.pattern)
    }
    );

    return (
        <div>
            <form className='add-categoryRule' onSubmit={onSubmit}>
            <Container maxWidth="xs">
            <InputLabel id="category-rule-category">Category</InputLabel>
                <Select
                    // value={selectedValue}
                    onChange={handleChange}
                >
                    {categories.map((category) => (<MenuItem key={category.id} value={category.name}>{category.name}</MenuItem>))}


                </Select><br/><br/>


                <TextField id='pattern-name' variant='outlined' label='Pattern' value={pattern} onChange={(event) => setPattern(event.target.value)} />
                <br/><Button type="submit" variant="contained" value='Add' >Add</Button><br />
                <br/>
                    <Table>
                        <TableHead style={{ backgroundColor: '#546E7A' }} >
                            <TableRow>
                                <TableCell style={{ color: 'white', }}>Categories</TableCell>
                                <TableCell style={{ color: 'white', }}>Pattern</TableCell>
                                <TableCell style={{ color: 'white', }}>.</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categoryRules.map((categoryRule) => (
                                <TableRow key={categoryRule.id}>
                                    <TableCell >{categoryRule.category}</TableCell>
                                    <TableCell >{categoryRule.pattern}</TableCell>
                                    <TableCell><Button id={categoryRule.id} type='button' value='delete' onClick={(event) => onDelete(event.target.id)}>Delete</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Container>

            </form>
        </div>
    )
}

export default AddCategoryRule
