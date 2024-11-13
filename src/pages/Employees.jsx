import { Link } from "react-router-dom"
import employeeDataFree from "../data/employee_data"
import { useEffect, useState } from "react";

function Employees() {

    const [employeeData, setEmployeeData] = useState(employeeDataFree)
    const [employeeDataToShow, setEmployeeDataToShow] = useState(employeeData)
    const [filterApplied, setFilterApplied] = useState(false)
    const [numberPage, setPage] = useState(1)
    const [infoEntries, setInfosEntries] = useState(false)

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
        console.log(numberPage, "page number tu coco")
        if (numberPage === 1) {
            console.log(previous_button);
            previous_button.setAttribute("disabled", "");
        } else {
            previous_button.removeAttribute("disabled");
            console.log(previous_button)
        }
    }, [numberPage])

    useEffect(() => {
        numberEntriesToShow()
    }, [document.getElementById('select-entries'), employeeData, numberPage])



    const filterClick = (e) => {
        e.preventDefault();

        const elementEvent = e.currentTarget;
        console.log(elementEvent);
        const data_filter = elementEvent.getAttribute('data-filter');
        console.log(data_filter)

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


    const filterFunction = (filter) => {
        console.log(filter)

        if (filter.typeFilter === "up") {
            console.log(employeeData)
            const test = employeeData[0];
            console.log(test[filter.nameFilter])
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
            setEmployeeData(employeeDataFree)
        }
        setFilterApplied(false)
    }

    const filterSearch = (e) => {
        e.preventDefault();
        setPage(1)
        const valueToSearch = e.currentTarget.value.toUpperCase();
        if (valueToSearch === "") {
            setEmployeeData(employeeDataFree);
            setFilterApplied(true)
        } else {
            const newEmployeeData = [];
            [...employeeDataFree].forEach(employee => {
                if (filterDataBySearch(employee, valueToSearch)) {
                    newEmployeeData.push(employee)
                }
            });
            setEmployeeData(newEmployeeData);
            setFilterApplied(true)
        }
    }

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

    const numberEntriesToShow = (e) => {
        const numberOfEntries = Number(document.getElementById('select-entries').value);
        const startIndex = Number((numberPage - 1) * numberOfEntries);
        console.log(employeeData.length - 1, startIndex + numberOfEntries, startIndex);
        const newEmployeeDataToShow = employeeData.slice(startIndex, startIndex + numberOfEntries);
        if ((employeeData.length - 1) <= (numberPage * numberOfEntries)) {
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

        console.log(newEmployeeDataToShow)
        setEmployeeDataToShow(newEmployeeDataToShow);
    }

    const modifyPageNumber = (action) => {
        console.log(action)
        if (action === "+") {
            const newNumberOfPage = numberPage + 1;
            console.log(newNumberOfPage)
            setPage(newNumberOfPage);
        } else {
            const newNumberOfPage = numberPage - 1;
            console.log(newNumberOfPage)
            setPage(newNumberOfPage)
        }
    }


    return (
        <div className='Employees'>
            <h1>Current Employees</h1>
            <section id="first-section">
                <div className="number-entries-div">
                    <p>Show</p>
                    <select onChange={numberEntriesToShow} name="select-entries" id="select-entries" defaultValue={10}>
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

                    {employeeDataToShow.map((employee, index) => (
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
                    
                </div>
            </div>


            <section id="third-section">

                <div className="first-part-4s">
                    <p>Showing {infoEntries.from} to {infoEntries.to} of {employeeData.length} entries</p>
                    <div id="previous-next-div">
                        <button id="previous-button" className="previous-next-button" onClick={() => modifyPageNumber("")}>Previous</button>
                        <button id="next-button"className="previous-next-button" onClick={() => modifyPageNumber("+")}>Next</button>
                    </div>
                </div>
                <Link to="/">Home</Link>

            </section>

        </div>
    )
}
export default Employees