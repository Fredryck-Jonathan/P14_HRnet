import { Link } from "react-router-dom";
import Calender from "../components/calender";

function Home() {

    return (
        <div className='home'>

            <Calender></Calender>

            <h1>HRnet</h1>
            <Link to="/employees">View Current Employees</Link>

            <h2>Create Employee</h2>
            
            <form id="form-create-employee">

                <div className="input-wrapper">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" name="firstName"></input>
                </div>

                <div className="input-wrapper">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lastName"></input>
                </div>

                <div className="input-wrapper">
                    <label htmlFor="birthDate">Date of Birth</label>
                    <input type="date" id="birthDate" name="birthDate"></input>
                </div>

                <div className="input-wrapper">
                    <label htmlFor="startDate">Start Date</label>
                    <input type="date" id="startDate" name="startDate"></input>
                </div>

                <fieldset className="address-part">

                    <legend>Address</legend>

                    <div className="input-wrapper">
                        <label htmlFor="street">Street</label>
                        <input type="text" id="street" name="street"></input>
                    </div>
                    
                    <div className="input-wrapper">
                        <label htmlFor="city">City</label>
                        <input type="text" id="city" name="city"></input>
                    </div>
                    
                    <div className="input-wrapper">
                        <label htmlFor="state">State</label>
                        <input type="text" id="state" name="state"></input>
                    </div>
                    
                    <div className="input-wrapper">
                        <label htmlFor="zipCode">Zip Code</label>
                        <input type="text" id="zipCode" name="zipCode"></input>
                    </div>
                    

                </fieldset>

                <div className="input-wrapper">
                    <label htmlFor="department">Department</label>
                    <input type="text" inputMode="department" name="department"></input>
                </div>

                <button type="submit">Save</button>

            </form>
        </div>
    )
}
export default Home