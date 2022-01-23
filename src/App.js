import { useState, useEffect } from "react"
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './components/Header'
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Transactions from "./components/Transactions";
import AddCategory from "./components/AddCategory";
import CategoriesCombobox from "./components/CategoriesCombobox";
import reportWebVitals from "./reportWebVitals";
import AdminPanel from "./components/AdminPanel";

const App = () => {
  
  
  
  const [showFormAddTask, setShowFormAddTask] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const [showAdmin,setShowAdmin] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editingTransactionRowIndex, setEditingTransactionRowIndex] = useState(-1);
  const [editingCategoryValue, setEditingCategoryValue] = useState('');
  const [categoryRules, setCategoryRules] = useState([]);

  const baseUrlTransaction = 'https://localhost:5001' ;
  const baseUrlCategory = 'https://localhost:5011' ;
  // const baseUrlTransaction = 'http://localhost:8081' ;
  // const baseUrlCategory = 'http://localhost:8080' ;
  // const baseUrl = 'http://acme.com' ;



  useEffect(() => {

    const getCategories = async () => {
      await updateCategories(); 
    }
    const getCategoryRules = async () => {
      await updateCategoryRules(); 
    }

    getCategories();
    getCategoryRules();
  }, [])


  // Transactions
  const fetchTransactions = async () => {
    const res = await fetch(baseUrlTransaction + '/api/v1/transactions')
    const data = await res.json()

    console.log(data)
    return data
  }

  const displaytransactions = async () => {
    console.log(displaytransactions)
    const transactionsFromServer = await fetchTransactions()
    console.log('movementsFromServer ',transactionsFromServer);
    setTransactions(transactionsFromServer);
  }

  const updateTransaction = async (rowId) => {
    var transaction = transactions.find(row => row.id === editingTransactionRowIndex);

    const res = await fetch (baseUrlTransaction + `/api/v1/transactions/${transaction.id}`, 
    {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json' },
        body:JSON.stringify(transaction)
      })


      const data = await res.json()
      return data;

  }

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

  const addCategory =  async (category) => {
    console.log(category);
    const res = await fetch (baseUrlCategory +  `/api/v1/categories/${category.name}`, 
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
    const res = await fetch(baseUrlCategory + `/api/v1/categories/${id}`, { method:'DELETE',})
    setCategories(categories.filter((category) => category.id !== id))


    await updateCategories(); 
    // const newCategories = await fetchCategories();
    // console.log(newCategories);

    // setCategories(newCategories);
    // categories.map((cat) => console.log(cat));
  }


  // CategoryRules
  const addCategoryRule =  async (category, pattern) => {
    console.log(category, pattern);
    const res = await fetch (baseUrlCategory +  `/api/v1/rules`, 
    {
      method: 'POST',
      headers: 
      {
        'Content-type': 'application/json' 
      },
      body:JSON.stringify({"category":category, "pattern":pattern})
      });


      await updateCategoryRules(); 
    // const newCategories = await fetchCategories();

    // setCategories(newCategories);
    // categories.map((cat) => console.log(cat));
  }
  const fetchCategoryRules = async () => {
    const res = await fetch(baseUrlCategory + '/api/v1/rules')
    console.log('fetchCategoryRules res:', res);
    
    const data = await res.json()

    console.log('fetchCategoryRules data:', data);
    return data
  }
  const updateCategoryRules = async () => {
    const newCategoryRules = await fetchCategoryRules();

    setCategoryRules(newCategoryRules);
    categoryRules.map((cat) => console.log(cat));
  }
  const deleteCategoryRules = async (id) => {
    console.log(id)
    const res = await fetch(baseUrlCategory + `/api/v1/rules/${id}`, { method:'DELETE',})
    setCategoryRules(categoryRules.filter((categoryRule) => categoryRule.id !== id))


    await updateCategoryRules(); 
  }

  // Front end event
  const startEditingCategory = (rowId, categoryValue) => {
    console.log('rowId ',rowId)

    // if (categoryValue == null)
    // {
    //   categoryValue = 'None'
    // }

    console.log('categoryValue ',categoryValue)
    setEditingTransactionRowIndex(rowId);
    // setEditingCategoryValue(!categoryValue ? 'None':categoryValue)
    setEditingCategoryValue(categoryValue)
    console.log('movements ', transactions)
   setTransactions( transactions.map(
      (mvt) => mvt.id === rowId ? { ...mvt, category: categoryValue } : mvt
    ))
    console.log('movements ', transactions)

  }

  const stopEditingCategory = async (rowId) => {

    await updateTransaction(rowId);
   
    setEditingTransactionRowIndex(-1);
  }

  const onChangeTransactionCategory = (categoryIndex) =>
  {
    setEditingCategoryValue(categoryIndex);
    var movement = transactions.find(row => row.id == editingTransactionRowIndex);
    var category = categories.find(c => c.name == categoryIndex);

    console.log ('editingCategoryIndex -> ' + editingTransactionRowIndex);
    console.log ('categoryIndex -> ' + categoryIndex);
    console.log ('movement', movement);
    console.log ('category', category);
    console.log ('categories', categories);

    movement.category = category.name;

    setTransactions( transactions.map(
      (mvt) => mvt.id === editingTransactionRowIndex ? { ...mvt, category: category.name } : mvt
    ))
  }

  

  return (
    // <div className="container">
    <div>
      <Header title="Money Manager" onAdd={(showAdmin) => {setShowFormAddTask(showAdmin); console.log(showAdmin); }} showAdd={showFormAddTask} />
      { !showFormAddTask && <Transactions 
      transactions={transactions}
      categories={categories} 
      onLoadTransactions={displaytransactions}
      startEditingCategory={startEditingCategory}
      stopEditingCategory={stopEditingCategory}
      editIdx={editingTransactionRowIndex}
      onChangeTransactionCategory={onChangeTransactionCategory}
      /> }
      {showFormAddTask && <AdminPanel categories={categories} categoryRules={categoryRules} addCategory={addCategory} deleteCategory={deleteCategory} addCategoryRule={addCategoryRule} deleteCategoryRules={deleteCategoryRules}/>}

    </div>
  )
}
//       {showFormAddTask && <AddCategory categories={categories} onAdd={addCategory} onDelete={deleteCategory}  />}

export default App;

