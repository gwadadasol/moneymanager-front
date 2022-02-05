import React from 'react'
import { useState, useEffect } from "react"

import AddCategory from './AddCategory'
import AddCategoryRule from './AddCategoryRule'
import CategoriesCombobox from './CategoriesCombobox'

const AdminPanel = () => {
    const [categories, setCategories] = useState([]);
    const [categoryRules, setCategoryRules] = useState([]);
    // const baseUrlCategory = 'https://localhost:5011';
    const baseUrlCategory = 'http://acme.com';

    useEffect(() => {
        const getCategories = async () => { await updateCategories(); }
        const getCategoryRules = async () => { await updateCategoryRules(); }
        getCategories();
        getCategoryRules();
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

    const addCategory = async (category) => {
        console.log(category);
        const res = await fetch(baseUrlCategory + `/api/v1/categories/${category.name}`,
            {
                method: 'POST',
                headers:
                {
                    'Content-type': 'application/json'
                },
                // body:JSON.stringify(category.name)
            })


        await updateCategories();
        // const newCategories = await fetchCategories();

        // setCategories(newCategories);
        // categories.map((cat) => console.log(cat));
    }

    const deleteCategory = async (id) => {
        const res = await fetch(baseUrlCategory + `/api/v1/categories/${id}`, { method: 'DELETE', })
        setCategories(categories.filter((category) => category.id !== id))


        await updateCategories();
        // const newCategories = await fetchCategories();
        // console.log(newCategories);

        // setCategories(newCategories);
        // categories.map((cat) => console.log(cat));
    }


    // CategoryRules
    const addCategoryRule = async (category, pattern) => {
        const res = await fetch(baseUrlCategory + `/api/v1/rules`,
            {
                method: 'POST',
                headers:
                {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ "category": category, "pattern": pattern })
            });


        await updateCategoryRules();
        // const newCategories = await fetchCategories();

        // setCategories(newCategories);
        // categories.map((cat) => console.log(cat));
    }
    const fetchCategoryRules = async () => {
        const res = await fetch(baseUrlCategory + '/api/v1/rules')
        const data = await res.json()
        return data
    }
    const updateCategoryRules = async () => {
        const newCategoryRules = await fetchCategoryRules();

        setCategoryRules(newCategoryRules);
        categoryRules.map((cat) => console.log(cat));
    }
    const deleteCategoryRules = async (id) => {
        const res = await fetch(baseUrlCategory + `/api/v1/rules/${id}`, { method: 'DELETE', })
        setCategoryRules(categoryRules.filter((categoryRule) => categoryRule.id !== id))
        await updateCategoryRules();
    }



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
