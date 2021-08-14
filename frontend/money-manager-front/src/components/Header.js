import PropTypes from 'prop-types'
// import Button from './Button'
import Button from '@material-ui/core/Button';


const Header = ({title, onAdd, showAdd}) => {  


    return (
        <>
            <Button>Data</Button>
            <Button>Admin</Button>
        </>
    )
}

Header.defaultProps = {
    title: 'Money Manager',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

// const headingStyle = {color: 'red', backgroundColor: 'black',}

export default Header
