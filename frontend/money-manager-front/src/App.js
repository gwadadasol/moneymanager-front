import { useState, useEffect } from "react"
import Header from './components/Header'
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Movements from "./components/Movements";
import AddCategory from "./components/AddCategory";
import CategoriesCombobox from "./components/CategoriesCombobox";

const App = () => {
  
  
  
  const [showFormAddTask, setShowFormAddTask] = useState(false);
  const [movements, setMovements] = useState([]);

  const [showAdmin,setShowAdmin] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editingCategoryIndex, setEditingCategoryIndex] = useState(-1);
  const [editingCategoryValue, setEditingCategoryValue] = useState('');





  useEffect(() => {

    const getCategories = async () => {
      await updateCategories(); 
    }

    getCategories()
  }, [])

  const fetchMovements = async () => {
    const res = await fetch('https://localhost:5001/check/api/v1/transactions')
    const data = await res.json()

    // console.log(data)
    return data
  }

  const displayMovements = async () => {
    const movementsFromServer = await fetchMovements()

    var movementsWithCategory = [];

    movementsFromServer.map( (mvt) =>  { movementsWithCategory.push(mvt.hasOwnProperty('category')?mvt:{...mvt, 'category':'None'})} );
    // console.log(movementsWithCategory);

    setMovements(movementsWithCategory);
  }

  const fetchCategories = async () => {
    const res = await fetch('https://localhost:5001/api/v1/categories')
    const data = await res.json()

    return data
  }

  const updateCategories = async () => {
    const newCategories = await fetchCategories();

    setCategories(newCategories);
    categories.map((cat) => console.log(cat));
  }


  const addCategory =  async (category) => {
    console.log(category);
    const res = await fetch ('https://localhost:5001/api/v1/categories', 
    {
      method: 'POST',
      headers: 
      {
        'Content-type': 'application/json' 
      },
      body:JSON.stringify(category.name)
      })


      await updateCategories(); 
    // const newCategories = await fetchCategories();

    // setCategories(newCategories);
    // categories.map((cat) => console.log(cat));
  }

  const deleteCategory = async (id) => {
    console.log(id)
    const res = await fetch(`https://localhost:5001/api/v1/categories/${id}`, { method:'DELETE',})
    setCategories(categories.filter((category) => category.id !== id))


    await updateCategories(); 
    // const newCategories = await fetchCategories();
    // console.log(newCategories);

    // setCategories(newCategories);
    // categories.map((cat) => console.log(cat));
  }

  const startEditingCategory = (rowId, categoryValue) => {
    setEditingCategoryIndex(rowId);
    setEditingCategoryValue(categoryValue);
  }

  const stopEditingCategory = () => {
    setEditingCategoryIndex(-1);
  }

  const onChangeMovementCategory = (value) =>
  {
    setEditingCategoryValue(value);
  }

  

  return (
    // <div className="container">
    <div>
      <Header title="Money Manager" onAdd={(showAdmin) => {setShowFormAddTask(showAdmin); console.log(showAdmin); }} showAdd={showFormAddTask} />
      {<CategoriesCombobox categories={categories} selectedValue='' onChangeMovementCategory={onChangeMovementCategory}/>}
      { !showFormAddTask && <Movements 
      movements={movements}
      categories={categories} 
      onLoadMovements={displayMovements}
      startEditingCategory={startEditingCategory}
      stopEditingCategory={stopEditingCategory}
      editIdx={editingCategoryIndex}
      onChangeMovementCategory={onChangeMovementCategory}
      /> }
      {showFormAddTask && <AddCategory categories={categories} onAdd={addCategory} onDelete={deleteCategory}  />}

    </div>
  )
}

export default App;

