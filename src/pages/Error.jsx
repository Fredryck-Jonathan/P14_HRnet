import { Link } from "react-router-dom"

function Error() {
    return (
        <div className='Error'>
            <h3>Error</h3>
            <p>The page you are trying to access does not exist.</p>
            <Link to="/">Return to the homepage.</Link>
        </div>
    )
}
export default Error