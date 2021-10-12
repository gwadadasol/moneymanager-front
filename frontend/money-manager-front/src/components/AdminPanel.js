import React from 'react'
import AddCategory from './AddCategory'
import CategoriesCombobox from './CategoriesCombobox'

const AdminPanel = ({categories, addCategory, deleteCategory} ) => {
    return (
        <div>
        <div>
            <AddCategory categories={categories} onAdd={addCategory} onDelete={deleteCategory} />            
        </div>
        <br/>
        <br/>
        <br/>
        <div>
        

<form className='add-rule' >
<CategoriesCombobox categories={categories}/><input id='rule-name' variant='outlined' label='Rule pattern' />
<input type="submit" variant="contained" value='Create'/>

<table>
<tbody>
{categories.map((category) => (
    <tr key={category.id }>
        <td >{category.name}</td>
        <td><input id={category.id } type='button' value='delete' /></td>
    </tr>
))}
</tbody>
</table>
</form> 


</div>
</div>
    )
}



export default AdminPanel
