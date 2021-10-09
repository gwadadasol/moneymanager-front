import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
