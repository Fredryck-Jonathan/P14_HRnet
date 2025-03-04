import { Link } from "react-router-dom";
import Calender from "../components/calender";
import usStates from "../data/usStates";
import departmentData from "../data/department_data";

import { useDispatch } from "react-redux";
import { postEmployee } from "../actions/employee.action";

import ModalComponent from "../components/modal";

function Home() {

    const dispatch = useDispatch();


    // Fonction qui déclenche les vérifications et active/désactive le bouton submit.
    const verifyElements = () => {
        const allInputs = document.querySelectorAll('input');
        const [firstName, lastName, dateOfBirth, startDate, street, city, zipCode] = allInputs;
        const selectDepartment = document.getElementById('department');
        const selectStates = document.getElementById('states');
        const regexName = /^[a-zA-Z]{3,}$/;
        const regexTextwithNumber = /^[a-zA-Z0-9À-ÖØ-öø-ÿ\s]{3,}$/;
        const regexNumber = /^\d{5}$/;
        if (verifyElement(firstName, regexName) && verifyElement(lastName, regexName) && verifyDate(dateOfBirth) && verifyDate(startDate) && verifyElement(street, regexTextwithNumber) && verifyElement(city, regexTextwithNumber) && verifyElement(selectStates, regexName) && verifyElement(zipCode, regexNumber) && verifyElement(selectDepartment, regexName)) {
            document.getElementById('button-submit').removeAttribute('disabled');
            return true
        } else {
            document.getElementById('button-submit').setAttribute('disabled', "");
            return false
        }
    }


    // Fonction qui vérifie si une valeur correspond à une expression régulière
    const verifyElement = (element, regexToTest) => {
        const value = element.value;
        if (regexToTest.test(value)) {
            return true
        } else {
            return false
        }
    }


    // Fonction qui vérifie si un élément possède un attribut data-valid égal à true
    const verifyDate = (element) => {
        const data_valid = element.getAttribute('data-valid');
        if (data_valid === "true") {
            return true
        } else {
            return false
        }
    }


    // Fonction qui gère la soumission du formulaire d'ajout d'un employé.
    const submitEvent = (e) => {
        e.preventDefault()
        if (verifyElements()) {
            const allInputs = document.querySelectorAll('input');
            const [firstName, lastName, dateOfBirth, startDate, street, city, zipCode] = allInputs;
            const selectDepartment = document.getElementById('department');
            const selectStates = document.getElementById('states');
            const valueDateOfBirth = dateOfBirth.getAttribute('data-date');
            const valueStartDate = startDate.getAttribute('data-date');
            const objectEmployee = {
                firstName: firstName.value,
                lastName: lastName.value,
                startDate: valueStartDate,
                department: selectDepartment.value,
                dateOfBirth: valueDateOfBirth,
                street: street.value,
                city: city.value,
                state: selectStates.value,
                zipCode: Number(zipCode.value)
            }
            try {
                dispatch(postEmployee(objectEmployee))
                const modalDiv = document.querySelector('.modal-div');
                const message = modalDiv.querySelector('.message-modal');
                message.textContent = "Nouvel employé créé avec succès";
                modalDiv.classList.add('active');
                e.currentTarget.reset()
            } catch (error) {
                console.error(error);
                const modalDiv = document.querySelector('.modal-div');
                const message = modalDiv.querySelector('.message-modal');
                message.textContent = "L'employée n'a pas pu être enregistré";
                modalDiv.classList.add('active');
            }
        } else {
            document.getElementById('button-submit').setAttribute('disabled', "");
        }
    }

    return (
        <div className='home'>
            <img id="logo-hrnet" alt="logo hrnet" src={require("../assets/hrnet.webp")}></img>
            <Link id="link-to-employees" to="/employees">View Current Employees</Link>
            <div className="div-home-content">
                <h2>Create Employee</h2>
                <form onSubmit={(e) => { submitEvent(e) }} id="form-create-employee">
                    <div className="input-wrapper">
                        <label htmlFor="firstName">First Name</label>
                        <input onInput={verifyElements} type="text" id="firstName" name="firstName" required></input>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="lastName">Last Name</label>
                        <input onInput={verifyElements} type="text" id="lastName" name="lastName" required></input>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="birthDate">Date of Birth</label>
                        <Calender keyCalender='birthDate'></Calender>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="startDate">Start Date</label>
                        <Calender keyCalender='startDate'></Calender>
                    </div>
                    <fieldset className="address-part">
                        <legend>Address</legend>
                        <div className="input-wrapper">
                            <label htmlFor="street">Street</label>
                            <input onInput={verifyElements} type="text" id="street" name="street" required></input>
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="city">City</label>
                            <input onInput={verifyElements} type="text" id="city" name="city" required></input>
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="state">State</label>
                            <select onChange={verifyElements} id="states" name="states" defaultValue="">
                                <option value="" disabled >Choose a state</option>
                            {usStates.map((element, index) => (
                                <option key={index} value={element}>{element}</option>
                            ))}
                        </select>
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="zipCode">Zip Code</label>
                            <input onInput={verifyElements} type="text" id="zipCode" name="zipCode" required></input>
                        </div>
                    </fieldset>
                    <div className="input-wrapper">
                        <label htmlFor="department">Department</label>
                        <select onChange={verifyElements} id="department" name="department" defaultValue="">
                                <option value="" disabled >Choose a department</option>
                            {departmentData.map((element, index) => (
                                <option key={index} value={element}>{element}</option>
                            ))}
                        </select>
                    </div>
                    <button id="button-submit" type="submit" disabled>Save</button>
                </form>
            </div>
            <ModalComponent></ModalComponent>
        </div>
    )
}
export default Home