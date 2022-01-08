import React from 'react'
import { useState } from "react"
import NativeSelect from '@material-ui/core/NativeSelect';

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


    categories.map( (cat) => {
        console.log("AddCategoryRule cat:", cat.id, cat.category, cat.pattern)
        }
        );

    return (
        <div>
            <form className='add-categoryRule' onSubmit={onSubmit}>
                <NativeSelect
                    // value={selectedValue}
                    onChange={handleChange}
                >
                    {categories.map((category) => (<option key={category.id} value={category.name}>{category.name}</option>))}


                </NativeSelect>
                

                <input id='pattern-name' variant='outlined' label='Pattern' value={pattern} onChange={(event) => setPattern(event.target.value)} />
                <input type="submit" variant="contained" value='Add' /><br />

                <table>
                        <tbody>
                            {categoryRules.map((categoryRule) => (
                                <tr key={categoryRule.id }>
                                    <td >{categoryRule.category}</td>
                                    <td >{categoryRule.pattern}</td>
                                    <td><input id={categoryRule.id } type='button' value='delete' onClick={(event) => onDelete(event.target.id)}/></td>
                                </tr>
                            ))}
                    </tbody>
                    </table>

            </form>
        </div>
    )
}

export default AddCategoryRule
