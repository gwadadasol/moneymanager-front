import React from 'react'
import AddCategory from './AddCategory'
import AddCategoryRule from './AddCategoryRule'
import CategoriesCombobox from './CategoriesCombobox'

const AdminPanel = ({ categories, categoryRules, addCategory, deleteCategory, addCategoryRule, deleteCategoryRules }) => {

    return (
        <div>
            <div>
                <AddCategory categories={categories} onAdd={addCategory} onDelete={deleteCategory} />
            </div>
            <br />
            <br />
            <br />
            <div>
                <AddCategoryRule categories={categories} categoryRules={categoryRules} onAdd={addCategoryRule} onDelete={deleteCategoryRules} />
            </div>
        </div>
    )
}



export default AdminPanel
