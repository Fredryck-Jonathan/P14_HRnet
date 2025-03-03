import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


function Employees() {

    const allEmployees = useSelector((state) => state.employeeReducer);
    const getEmployees = async () => {
        if (allEmployees) {
            setEmployeeDataNoFilter(allEmployees.employee_infos);
            setEmployeeData(allEmployees.employee_infos);
        }
    }

    const [employeeDataNoFilter, setEmployeeDataNoFilter] = useState(undefined)
    const [employeeData, setEmployeeData] = useState(undefined)
    const [employeeDataToShow, setEmployeeDataToShow] = useState([])
    const [filterApplied, setFilterApplied] = useState(false)
    const [numberPage, setPage] = useState(1)
    const [infoEntries, setInfosEntries] = useState(false)
    const [charged, setCharged] = useState(false)

    useEffect(() => {
        if (employeeData&& employeeDataToShow) {
            setCharged(true)
        } else {
            setCharged(false)
            getEmployees()
        }
    }, [employeeData, employeeDataToShow, allEmployees])

    useEffect(() => {
        if (!filterApplied) return;
        if (document.querySelector('.up')) {
            const filterDiv = document.querySelector('.up');
            const data_filter = filterDiv.getAttribute('data-filter');
            const newFilter = {
                nameFilter: data_filter,
                typeFilter: 'up',
            };
            filterFunction(newFilter);
        } else if (document.querySelector('.down')) {
            const filterDiv = document.querySelector('.down');
            const data_filter = filterDiv.getAttribute('data-filter');
            const newFilter = {
                nameFilter: data_filter,
                typeFilter: 'down',
            };
            filterFunction(newFilter);
        }

    }, [employeeData, filterApplied])


    useEffect(() => {
        const previous_button = document.getElementById('previous-button');
        if (numberPage === 1) {
            previous_button.setAttribute("disabled", "");
        } else {
            previous_button.removeAttribute("disabled");
        }
    }, [numberPage])


    useEffect(() => {
        numberEntriesToShow()
    }, [document.getElementById('select-entries'), employeeData, numberPage])


    // fonction qui gère l'événement onCLick sur un élément de filtre pour trier les employés.
    const filterClick = (e) => {
        e.preventDefault();
        const elementEvent = e.currentTarget;
        const data_filter = elementEvent.getAttribute('data-filter');
        document.querySelectorAll('.filter-div').forEach(element => {
            if (element !== elementEvent) {
                element.classList.forEach(className => {
                    if (className === 'up' || className === "down") {
                        element.classList.remove(className)
                    }
                })
            }
        })
        if (elementEvent.classList.contains("up")) {
            elementEvent.classList.add("down");
            elementEvent.classList.remove('up');
            const newFilter = {
                nameFilter: data_filter,
                typeFilter: "down"
            }
            filterFunction(newFilter)
        } else if (elementEvent.classList.contains('down')) {
            elementEvent.classList.remove('down');
            const newFilter = {
                nameFilter: data_filter,
                typeFilter: "none"
            }
            filterFunction(newFilter)
        } else {
            elementEvent.classList.add("up");
            const newFilter = {
                nameFilter: data_filter,
                typeFilter: "up"
            }
            filterFunction(newFilter)
        }
    }

    // Fonction qui trie les employés en fonction d'un critère et d'un ordre spécifiés.
    const filterFunction = (filter) => {
        if (filter.typeFilter === "up") {
            const newEmployeeData = [...employeeData].sort((a, b) => {
                if (typeof a[filter.nameFilter] !== "number") {
                    return a[filter.nameFilter].localeCompare(b[filter.nameFilter]);
                } else {
                    return a[filter.nameFilter] - b[filter.nameFilter]
                }
            })
            setEmployeeData(newEmployeeData)
        } else if (filter.typeFilter === "down") {

    const newEmployeeData = [...employeeData].sort((a, b) => {
        if (typeof a[filter.nameFilter] !== "number") {
                    return b[filter.nameFilter].localeCompare(a[filter.nameFilter]);
        } else {
                    return b[filter.nameFilter] - a[filter.nameFilter]
            }
        })
            setEmployeeData(newEmployeeData)
        } else {
            setEmployeeData(employeeDataNoFilter)
        }
        setFilterApplied(false)
    }



    // Fonction qui gère la recherche dans les données des employés.
    const filterSearch = (e) => {
        e.preventDefault();
        setPage(1)
        const valueToSearch = e.currentTarget.value.toUpperCase();
        if (valueToSearch === "") {
            setEmployeeData(employeeDataNoFilter);
            setFilterApplied(true)
        } else {
            const newEmployeeData = [];
            [...employeeDataNoFilter].forEach(employee => {
                if (filterDataBySearch(employee, valueToSearch)) {
                    newEmployeeData.push(employee)
                }
            });
            setEmployeeData(newEmployeeData);
            setFilterApplied(true)
        }
    }

    // Fonction qui filtre les données des employés en fonction d'une valeur de recherche.
    const filterDataBySearch = (employees, valueToSearch) => {
        return Object.values(employees).some(valueEmployee => {
            if (typeof valueEmployee !== "string") {
                valueEmployee = valueEmployee.toString();
            }
            valueEmployee = valueEmployee.toUpperCase();
            if (valueEmployee.toUpperCase().includes(valueToSearch)) {
                return true
            }
            return false
        })
    }

    // Fonction qui met à jour l'affichage des entrées en fonction du nombre sélectionné par l'utilisateur.
    const numberEntriesToShow = (e) => {
        if (!employeeData) {
            return false
        } else {
            const numberOfEntries = Number(document.getElementById('select-entries').value);
            const startIndex = Number((numberPage - 1) * numberOfEntries);
            const newEmployeeDataToShow = employeeData.slice(startIndex, startIndex + numberOfEntries);
            if ((employeeData.length) <= (numberPage * numberOfEntries)) {
                const next_button = document.getElementById('next-button');
                next_button.setAttribute("disabled", "");
            } else {
                const next_button = document.getElementById('next-button');
                next_button.removeAttribute("disabled");
            }
            const newInfosEntries = {
                from: startIndex+1 ,
                to:startIndex + numberOfEntries
            }
            setInfosEntries(newInfosEntries)
            setEmployeeDataToShow(newEmployeeDataToShow);
        }
    }


    // Fonction pour modifier le numéro de page en fonction de l'action fournie
    const modifyPageNumber = (action) => {
        if (action === "+") {
            const newNumberOfPage = numberPage + 1;
            setPage(newNumberOfPage);
        } else {
            const newNumberOfPage = numberPage - 1;
            setPage(newNumberOfPage)
        }
    }

    return (
        <div className='Employees'>
            <h1>Current Employees</h1>
            <section id="first-section">
                <div className="number-entries-div">
                    <p>Show</p>
                    <select onInput={(e) => { if (numberPage === 1) { numberEntriesToShow(e); } else { setPage(1) } }} name="select-entries" id="select-entries" defaultValue={10}>
                        <option value="2">2</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="100">100</option>
                    </select>
                    <p>entries</p>
                </div>
                <div className="search-div">
                    <p>Search:</p>
                    <input onChange={filterSearch} id="input-search" type="search" />
                </div>
            </section>
            <div id="second-section">
                    <div className="table-row">
                        <div className="filter-div" data-filter="firstName" onClick={filterClick}>
                            <p className="filter-text">First Name</p>
                                <div className="filter-div-icon-element">
                                    <ion-icon className='up-arrow' name="caret-up-outline"></ion-icon>
                                    <ion-icon className='down-arrow' name="caret-down-outline"></ion-icon>
                                </div>
                        </div>
                        <div className="filter-div" data-filter="lastName" onClick={filterClick}>
                            <p className="filter-text">Last Name</p>
                                <div className="filter-div-icon-element">
                                    <ion-icon className='up-arrow' name="caret-up-outline"></ion-icon>
                                    <ion-icon className='down-arrow' name="caret-down-outline"></ion-icon>
                                </div>
                        </div>
                        <div className="filter-div" data-filter="startDate" onClick={filterClick}>
                            <p className="filter-text">Start Date</p>
                                <div className="filter-div-icon-element">
                                    <ion-icon className='up-arrow' name="caret-up-outline"></ion-icon>
                                    <ion-icon className='down-arrow' name="caret-down-outline"></ion-icon>
                                </div>
                        </div>
                        <div className="filter-div" data-filter="department" onClick={filterClick}>
                            <p className="filter-text">Department</p>
                                <div className="filter-div-icon-element">
                                    <ion-icon className='up-arrow' name="caret-up-outline"></ion-icon>
                                    <ion-icon className='down-arrow' name="caret-down-outline"></ion-icon>
                                </div>
                        </div>
                        <div className="filter-div" data-filter="dateOfBirth" onClick={filterClick}>
                            <p className="filter-text">Date of Birth</p>
                                <div className="filter-div-icon-element">
                                    <ion-icon className='up-arrow' name="caret-up-outline"></ion-icon>
                                    <ion-icon className='down-arrow' name="caret-down-outline"></ion-icon>
                                </div>
                        </div>
                        <div className="filter-div" data-filter="street" onClick={filterClick}>
                            <p className="filter-text">Street</p>
                                <div className="filter-div-icon-element">
                                    <ion-icon className='up-arrow' name="caret-up-outline"></ion-icon>
                                    <ion-icon className='down-arrow' name="caret-down-outline"></ion-icon>
                                </div>
                        </div>
                        <div className="filter-div" data-filter="city" onClick={filterClick}>
                            <p className="filter-text">City</p>
                                <div className="filter-div-icon-element">
                                    <ion-icon className='up-arrow' name="caret-up-outline"></ion-icon>
                                    <ion-icon className='down-arrow' name="caret-down-outline"></ion-icon>
                                </div>
                        </div>
                        <div className="filter-div" data-filter="state" onClick={filterClick}>
                            <p className="filter-text">State</p>
                                <div className="filter-div-icon-element">
                                    <ion-icon className='up-arrow' name="caret-up-outline"></ion-icon>
                                    <ion-icon className='down-arrow'name="caret-down-outline"></ion-icon>
                                </div>
                        </div>
                        <div className="filter-div" data-filter="zipCode" onClick={filterClick}>
                            <p className="filter-text">Zip Code</p>
                            <div className="filter-div-icon-element">
                                <ion-icon className='up-arrow-icon' name="caret-up-outline"></ion-icon>
                                <ion-icon className='down-arrow' name="caret-down-outline"></ion-icon>
                            </div>
                        </div>
                    </div>
                <div className="database-element">
                    {charged && employeeDataToShow.map((employee, index) => (
                        <div className="table-row" key={index}>
                            <div className="table-cell-infos">{ employee.firstName}</div>
                            <div className="table-cell-infos">{ employee.lastName}</div>
                            <div className="table-cell-infos">{ employee.startDate}</div>
                            <div className="table-cell-infos">{ employee.department}</div>
                            <div className="table-cell-infos">{ employee.dateOfBirth}</div>
                            <div className="table-cell-infos">{ employee.street}</div>
                            <div className="table-cell-infos">{ employee.city}</div>
                            <div className="table-cell-infos">{ employee.state}</div>
                            <div className="table-cell-infos">{ employee.zipCode}</div>
                        </div>
                    ))}
                    {employeeDataToShow.length <= 0 &&
                        <p>No employees found matching the search.</p>
                    }
                </div>
            </div>
            <section id="third-section">
                <div className="first-part-4s">
                    <p>Showing {infoEntries.from} to {infoEntries.to} of {employeeData && employeeData.length} entries</p>
                    <div id="previous-next-div">
                        <button id="previous-button" className="previous-next-button" onClick={() => modifyPageNumber("")}>Previous</button>
                        <button id="next-button"className="previous-next-button" onClick={() => modifyPageNumber("+")}>Next</button>
                    </div>
                </div>
                <Link id="link-to-home" to="/">Home</Link>
            </section>
        </div>
    )
}
export default Employees