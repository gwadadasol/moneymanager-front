
const Movement = ({movement}) => {
    return (
        <div >
            <p>Date: {movement.date}</p>
            <p>Amount: {movement.amount}</p>
            <p>Description: {movement.description}</p>
            <p>Account: {movement.account}</p>
        </div>
    )
}

export default Movement
