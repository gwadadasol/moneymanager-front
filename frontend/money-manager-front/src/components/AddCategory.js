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
    categories.map( (cat) => {
    console.log(cat.id, cat.name)
    }
    )

    return (
        
        <div>
            <form className='add-category' onSubmit={onSubmit}>
                <input id='category-name' variant='outlined' label='Category Name' value={name} onChange={(event) => setText(event.target.value)} />
                <input type="submit" variant="contained" value='Add'/>
           
                    <table>
                        <tbody>
                            {categories.map((category) => (
                                <tr key={category.id }>
                                    <td >{category.name}</td>
                                    <td><input id={category.id } type='button' value='delete' onClick={(event) => onDelete(event.target.id)}/></td>
                                </tr>
                            ))}
                    </tbody>
                    </table>
                    </form> 
        </div>

    )
}

export default AddCategory
