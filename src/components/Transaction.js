
const Transaction = ({transaction}) => {
    return (
        <div >
            <p>Date: {transaction.date}</p>
            <p>Amount: {transaction.amount}</p>
            <p>Description: {transaction.description}</p>
            <p>Account: {transaction.account}</p>
        </div>
    )
}

export default Transaction
