import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  

const CategoriesCombobox = ({categories, selectedValue, onChangeMovementCategory: onChangeTransactionCategory}) => {
    console.log(selectedValue);

        const classes = useStyles();

        const handleChange = (event) => {
            var value = event.target.value;
            onChangeTransactionCategory( value);
            console.log("handleChange ", value);
        };

        return (
            <div>
        <NativeSelect
        value={selectedValue}
        onChange={handleChange}
        >
          {categories.map((category) => ( <option key={category.id} value={category.name}>{category.name}</option>))}
          

        </NativeSelect>
            </div>
        )
}

export default CategoriesCombobox
