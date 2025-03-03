import { useEffect, useState } from 'react';



function Calender(props) {

    const keyCalender = props.keyCalender;

    const dayName = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

    const monthName = ['Janvier', "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre"]

    const getTodayDate = () => {

        const todayDate = new Date();
        const todayMonth = todayDate.getMonth()
        const todayYear = todayDate.getFullYear();
        const numberMonth = Number(todayMonth) + 1;
        if (numberMonth <= 9) {
            return todayYear + "-0" + numberMonth + "-";
        } else {
            return todayYear + "-" + numberMonth + "-";
        }
    }



    const [dateInfos, setDateInfos] = useState(getTodayDate());
    
    const [days, setDays] = useState(undefined)


    const createArrayYears = () => {
        const arrayYears = []
        for (let année = 1900; année <= 2025 ; année++) {
            arrayYears.push(String(année));
        }
        arrayYears.reverse()
        return arrayYears
    }

    const [arrayYears, setArrayYears] = useState(createArrayYears)

    useEffect(() => {
        const dataDateInfos = dateInfos;
        const [dataYear, dataMonth, dataDay] = dataDateInfos.split('-');
        const allCalenders = document.querySelectorAll('.calender');
        let calenderDocument = undefined
        allCalenders.forEach((element) => {
            if (element.getAttribute('data-key') == keyCalender) {
                calenderDocument = element;
            }
        })


        if (dataYear == 2025 && dataMonth == 12) {
            calenderDocument.querySelector('.previous-month-button').removeAttribute('disabled');
            calenderDocument.querySelector('.next-month-button').setAttribute('disabled', "");

        } else if (dataYear == 1900 && dataMonth == 1) {
            calenderDocument.querySelector('.next-month-button').removeAttribute('disabled');
            calenderDocument.querySelector('.previous-month-button').setAttribute('disabled', "")
        } else {

            calenderDocument.querySelector('.previous-month-button').removeAttribute('disabled');
            calenderDocument.querySelector('.next-month-button').removeAttribute('disabled');

        }


        const dataTextEvent = monthName[Number(dataMonth) - 1] + " " + dataYear;
        calenderDocument.querySelector('.button-toggle-dropdown').textContent = dataTextEvent;
        setDays(generateDays(dataYear, Number(dataMonth)-1 ));
    }, [dateInfos])


    const toggleDropdown = (e) => {
        const dropdownCalender = e.currentTarget.closest('.dropdown-calender');
        dropdownCalender.classList.toggle('active');
    }

    const toggleDropdownYear = (e) => {
        e.preventDefault();
        const dropdownCalender = e.currentTarget.closest('.year-option');
        const allDropdownCalender = document.querySelectorAll('.year-option')
        allDropdownCalender.forEach((dropdown) => {
            if (dropdown.classList.contains('active') && dropdown !== dropdownCalender) {
                dropdown.classList.toggle('active');
            }
        })
        dropdownCalender.classList.toggle('active');
    }


    const generateDays = (year, month) => {
        const days = [];
        const firstDay = new Date(Number(year), Number(month), 1);
        const lastDay = new Date(Number(year), Number(month) + 1, 0);
        for (let i = 0; i < ((firstDay.getDay() === 0 ? 7 : firstDay.getDay()) - 1); i++) {
            days.push(null);
        }
        for (let day = 1; day <= lastDay.getDate(); day++) {
            days.push(day);
        }
        return days
    }

    const changeMonth = (e) => {
        e.preventDefault();
        const dataYear = e.currentTarget.getAttribute('data-year');
        const dataMonth = e.currentTarget.getAttribute('data-month');
        const numberMonth = Number(dataMonth) + 1;
        if (numberMonth <= 9) {
            setDateInfos(dataYear + "-0" + numberMonth + "-");
        } else {
            setDateInfos(dataYear + "-" + numberMonth + "-");
        }
        const element_dropdown_calender = e.currentTarget.closest('.dropdown-calender');
        element_dropdown_calender.classList.toggle('active');
    }

    const changePreviousNextMonth = (action) => {

        const dataInfos = dateInfos;
        const [dataYear, dataMonth, dataDay] = dataInfos.split('-');



        if (action === "+") {

            let newDataMonth = Number(dataMonth) + 1;
            let newDataYear = dataYear;
            //document.getElementById('previous-month-button').removeAttribute('disabled')

            if (newDataMonth >= 13) {
                newDataMonth = 1;
                newDataYear = Number(newDataYear) + 1;
            }

            if (newDataMonth <= 9) {
                setDateInfos(newDataYear + "-0" + newDataMonth + "-");
            } else {
                setDateInfos(newDataYear + "-" + newDataMonth + "-");
            }
        } else {

            let newDataMonth = Number(dataMonth) - 1;
            let newDataYear = dataYear;

            if (newDataMonth <= 0) {
                newDataMonth = 12;
                newDataYear = Number(newDataYear) - 1;
            }

            if (newDataMonth <= 9) {
                setDateInfos(newDataYear + "-0" + newDataMonth + "-");
            } else {
                setDateInfos(newDataYear + "-" + newDataMonth + "-");
            }

        }



    }


    const getDaysInfos = (e) => {
        e.preventDefault();
        const dataInfos = e.currentTarget.getAttribute('data-date-infos');
        const [dataYear, dataMonth, dataDay] = dataInfos.split('-');

        const element_data_input = e.currentTarget.closest('.calender').querySelector('.date-input');
        element_data_input.setAttribute('data-valid', true);
        element_data_input.setAttribute('data-date', dataInfos);
        element_data_input.value = dataDay + "/" + dataMonth + "/" + dataYear;
    }


    const createDayInfo = (day) => {
        const [year, month, oldday] = dateInfos.split('-');
        if (day <= 9) {

            const data_date = year + '-' + month + "-0" + String(day);
            return data_date
        } else {

            const data_date = year + '-' + month + "-" + String(day);
            return data_date
        }
    }

    const toggleCalender = (e) => {

        const all_calendar = document.querySelectorAll('.calender-modal');
        const calender_modal = e.currentTarget.closest('.calender').querySelector('.calender-modal');
        calender_modal.classList.toggle('active');

        all_calendar.forEach((calendar) => {
            if (calendar.classList.contains('active') && calendar !== calender_modal) {
                calendar.classList.remove('active');
            }
        })

    }
    
    const setDataDateInput = (value) => {

        console.log(value)
        const [jour, mois, année] = value.split('/');
        const newDate = année+"-"+mois+"-"+jour
        setDateInfos(newDate)
        return newDate
    }


    const formatDateInput = (e) => {
        
        let value = e.currentTarget.value;
        console.log(value)

            // Empêche les caractères invalides.
            value = value.replace(/[^0-9/]/g, "");
        
            // Formate automatiquement les `/` après le jour et le mois.
            if (value.length > 2 && value[2] !== "/") {
                value = value.slice(0, 2) + "/" + value.slice(2);
            }
            if (value.length > 5 && value[5] !== "/") {
                value = value.slice(0, 5) + "/" + value.slice(5);
        }
            // Limite la longueur totale.
        e.target.value = value.slice(0, 10);

        console.log(e.target.value)

        if (validateDateFormat(value)) {
            e.currentTarget.setAttribute('data-valid', true);
            const finalValue = setDataDateInput(e.currentTarget.value);
            console.log(finalValue)
            e.currentTarget.setAttribute('data-date', finalValue);
            console.log(e.currentTarget);
        } else {
            e.currentTarget.setAttribute('data-valid', false);
            e.currentTarget.setAttribute('data-date', "undefined");
        }



    }

    const validateDateFormat = (value) => {
        const datePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        return datePattern.test(value);
    }

    const selectTodayDate = () => {
        setDateInfos(getTodayDate())
    }


    return (
        <div className='calender' data-key={keyCalender}>

            <div className='calender-input-div'>
                <input onInput={formatDateInput} type='text' data-valid="false" data-date="undefined" className='date-input' placeholder='jj/mm/aaaa' maxLength="10"></input>
                <button aria-label='toggle calender button' onClick={(e) => { e.preventDefault(); toggleCalender(e) }} className='button-open-calender'> <ion-icon name="calendar-outline"></ion-icon></button>
            </div>


            <div className='calender-modal'>
                <div className="calender-first-part">
                    
                    <div className="dropdown-calender">
                        <button className="button-toggle-dropdown" onClick={(e) => { e.preventDefault(); toggleDropdown(e) }}>Novembre 2024</button>
                        <div className="dropdown-content">
                            {arrayYears.map((year, index) => (
                                <div className="year-option" data-year={year} key={year}>
                                    <button onClick={toggleDropdownYear} className="button-toggle-year-dropdown">{year}</button>
                                    <div className="all-month-option">
                                        <button className="month-option" data-text={"Janvier " + year} data-year={year} data-month="0" onClick={(e) => changeMonth(e)}>Janvier</button>
                                        <button className="month-option" data-text={"Février " + year} data-year={year} data-month="1" onClick={(e) => changeMonth(e)}>Février</button>
                                        <button className="month-option" data-text={"Mars " + year} data-year={year} data-month="2" onClick={(e) => changeMonth(e)}>Mars</button>
                                        <button className="month-option" data-text={"Avril " + year} data-year={year} data-month="3" onClick={(e) => changeMonth(e)}>Avril</button>
                                        <button className="month-option" data-text={"Mai " + year} data-year={year} data-month="4" onClick={(e) => changeMonth(e)}>Mai</button>
                                        <button className="month-option" data-text={"Juin " + year} data-year={year} data-month="5" onClick={(e) => changeMonth(e)}>Juin</button>
                                        <button className="month-option" data-text={"Juillet " + year} data-year={year} data-month="6" onClick={(e) => changeMonth(e)}>Juillet</button>
                                        <button className="month-option" data-text={"Août " + year} data-year={year} data-month="7" onClick={(e) => changeMonth(e)}>Août</button>
                                        <button className="month-option" data-text={"Septembre " + year} data-year={year} data-month="8" onClick={(e) => changeMonth(e)}>Septembre</button>
                                        <button className="month-option" data-text={"Octobre " + year} data-year={year} data-month="9" onClick={(e) => changeMonth(e)}>Octobre</button>
                                        <button className="month-option" data-text={"Novembre " + year} data-year={year} data-month="10" onClick={(e) => changeMonth(e)}>Novembre</button>
                                        <button className="month-option" data-text={"Décembre " + year} data-year={year} data-month="11" onClick={(e) => changeMonth(e)}>Décembre</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                    <div className='div-button-calender-first-part'>

                        <div className="change-month">
                            <button aria-label='go to previous month' onClick={(e) => { e.preventDefault(); changePreviousNextMonth("-") }} className="previous-month-button"><ion-icon name="arrow-down-outline"></ion-icon></button>
                            <button aria-label='go to next month' onClick={(e) => { e.preventDefault(); changePreviousNextMonth("+") }} className="next-month-button"><ion-icon name="arrow-up-outline"></ion-icon></button>
                        </div>

                        <button aria-label='close_calender' onClick={(e) => { e.preventDefault(); toggleCalender(e)}} className='close_calender_dropdown'><ion-icon name="close-outline"></ion-icon></button>

                    </div>

                </div>


                <div className="calender-second-part">

                    {dayName.map((dayName, index) => (
                        <div className='day-name-div' key={index}>{dayName}</div>
                    ))}


                    {days && days.map((day, index) => { 
                        if (day !== null) {
                            const data_date = createDayInfo(day)
                            return(
                                <button aria-label={`select ${data_date} date button`} key={index} data-date-infos={data_date} onClick={(e) => { e.preventDefault(); getDaysInfos(e) }} >{day}</button>
                            )
                        } else {
                            return(
                                <div key={index}>{day}</div>
                            )
                        }
                    })}


                </div>

                <div className="calender-third-part">
                    <button aria-label='Select today date button' onClick={(e) => { e.preventDefault(); selectTodayDate()}} className="select-today-button">Aujourd'hui</button>
                </div>


            </div>



        </div>
    )
}
export default Calender