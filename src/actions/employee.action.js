//import axios from "axios";
import dataEmployee from "../data/employee_data";

export const GET_EMPLOYEE = "GET_EMPLOYEE";
export const POST_EMPLOYEE = "POST_EMPLOYEE";

export const postEmployee = (data) => {
    return (dispatch) => {
        dispatch({ type: POST_EMPLOYEE, payload: data })
    }
}

export const getEmployee = () => {
    return (dispatch) => {
        console.log(dataEmployee)
        dispatch({ type: GET_EMPLOYEE, payload: dataEmployee })
    }
}