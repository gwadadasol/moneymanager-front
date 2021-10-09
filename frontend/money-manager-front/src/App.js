import { useState, useEffect } from "react"
import Header from './components/Header'
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Movements from "./components/Movements";
import AddCategory from "./components/AddCategory";
import CategoriesCombobox from "./components/CategoriesCombobox";
import reportWebVitals from "./reportWebVitals";

const App = () => {
  
  
  
  const [showFormAddTask, setShowFormAddTask] = useState(false);
  const [movements, setMovements] = useState([]);

  const [showAdmin,setShowAdmin] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editingTransactionRowIndex, setEditingTransactionRowIndex] = useState(-1);
  const [editingCategoryValue, setEditingCategoryValue] = useState('');

  const baseUrl = 'https://localhost:5001' ;
  // const baseUrl = 'http://acme.com' ;



  useEffect(() => {

    const getCategories = async () => {
      await updateCategories(); 
    }

    getCategories()
  }, [])

  const fetchMovements = async () => {
    const res = await fetch(baseUrl + '/api/v1/transactions')
    const data = await res.json()

    console.log(data)
    return data
  }

  const displayMovements = async () => {
    console.log(displayMovements)
    const movementsFromServer = await fetchMovements()

    var movementsWithCategory = [];

    movementsFromServer.map( (mvt) =>  { movementsWithCategory.push(mvt.hasOwnProperty('category')?mvt:{...mvt, 'category':'None'})} );
    console.log(movementsWithCategory);

    setMovements(movementsWithCategory);
  }

  const fetchCategories = async () => {
    const res = await fetch(baseUrl + '/api/v1/categories')
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
    const res = await fetch (baseUrl +  `/api/v1/categories/${category.name}`, 
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
    console.log(id)
    const res = await fetch(baseUrl + `/api/v1/categories/${id}`, { method:'DELETE',})
    setCategories(categories.filter((category) => category.id !== id))


    await updateCategories(); 
    // const newCategories = await fetchCategories();
    // console.log(newCategories);

    // setCategories(newCategories);
    // categories.map((cat) => console.log(cat));
  }

  const startEditingCategory = (rowId, categoryValue) => {
    console.log('rowId ',rowId)

    if (categoryValue == null)
    {
      categoryValue = 'None'
    }

    console.log('categoryValue ',categoryValue)
    setEditingTransactionRowIndex(rowId);
    setEditingCategoryValue(!categoryValue ? 'None':categoryValue)
    console.log('movements ', movements)
   setMovements( movements.map(
      (mvt) => mvt.id === rowId ? { ...mvt, category: categoryValue } : mvt
    ))
    console.log('movements ', movements)

  }

  const updateMovement = async (rowId) => {
    var movement = movements.find(row => row.id === editingTransactionRowIndex);

    const res = await fetch (baseUrl + `/api/v1/transactions/${movement.id}`, 
    {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json' },
        body:JSON.stringify(movement)
      })


      const data = await res.json()
      return data;

  }

  const stopEditingCategory = async (rowId) => {

    await updateMovement(rowId);
   
    setEditingTransactionRowIndex(-1);
  }

  const onChangeMovementCategory = (categoryIndex) =>
  {
    setEditingCategoryValue(categoryIndex);
    var movement = movements.find(row => row.id == editingTransactionRowIndex);
    var category = categories.find(c => c.id == categoryIndex);

    console.log ('editingCategoryIndex -> ' + editingTransactionRowIndex);
    console.log ('categoryIndex -> ' + categoryIndex);
    console.log ('movement', movement);
    console.log ('category', category);
    console.log ('categories', categories);

    movement.category = category.name;
  }

  

  return (
    // <div className="container">
    <div>
      <Header title="Money Manager" onAdd={(showAdmin) => {setShowFormAddTask(showAdmin); console.log(showAdmin); }} showAdd={showFormAddTask} />
      { !showFormAddTask && <Movements 
      movements={movements}
      categories={categories} 
      onLoadMovements={displayMovements}
      startEditingCategory={startEditingCategory}
      stopEditingCategory={stopEditingCategory}
      editIdx={editingTransactionRowIndex}
      onChangeMovementCategory={onChangeMovementCategory}
      /> }
      {showFormAddTask && <AddCategory categories={categories} onAdd={addCategory} onDelete={deleteCategory}  />}

    </div>
  )
}

export default App;

