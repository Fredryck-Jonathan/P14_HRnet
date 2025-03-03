import { GET_EMPLOYEE, POST_EMPLOYEE } from "../actions/employee.action";

const initialState = {
    "employee_infos" : undefined
}

export default function employeeReducer(state = initialState, action) {

    switch (action.type) {
        case GET_EMPLOYEE:
            return {
                employee_infos: action.payload
            }
        case POST_EMPLOYEE:
            return {
                ...state,
                employee_infos: [...state.employee_infos, action.payload]
                
            }
        default:
            return state
    }
}