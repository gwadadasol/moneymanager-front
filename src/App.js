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
import CategoryChart from "./components/CategoryChart";

const App = () => {
  
  
  
  const [showFormAddTask, setShowFormAddTask] = useState(false);
  const [showAdmin,setShowAdmin] = useState(false);

  return (
    // <div className="container">
    <div>
      <Header title="Money Manager" onAdd={(showAdmin) => {
        setShowFormAddTask(showAdmin); 
        console.log(showAdmin); }
        } showAdd={showFormAddTask} />

      

      { !showFormAddTask && <CategoryChart />  }
      { !showFormAddTask && <Transactions /> }
      {showFormAddTask && <AdminPanel />}

    </div>
  )
}
//       {showFormAddTask && <AddCategory categories={categories} onAdd={addCategory} onDelete={deleteCategory}  />}

export default App;

