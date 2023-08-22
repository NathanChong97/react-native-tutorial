export const SET_USER_NAME = "SET_USER_NAME";
export const SET_USER_AGE = "SET_USER_AGE";
export const INCREASE_USER_AGE = "INCREASE_USER_AGE";
export const GET_CITIES = "GET_CITIES"

const API_URL = "https://mocki.io/v1/aac8b81a-139c-4235-82e6-0dbadf33f2b7"
// "https://mocki.io/v1/39b5324f-dbf4-4c11-a03f-f59b21629f21"

export const getCities = () => {
    try {
        return async dispatch => {
            const result = await fetch(API_URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const json = await result.json()
            if(json){
                dispatch({
                    type: GET_CITIES,
                    payload: json
                })
            } else {
                console.log("Unable to fetch API!")
            }
        }
    } catch (error) {
        console.log(error)
    }
}

export const setNameInActions = (namePayload) => dispatch => {
    dispatch({
        type: SET_USER_NAME,
        payload: namePayload,
    })
}

export const setAgeInActions = (agePayload) => dispatch => {
    dispatch({
        type: SET_USER_AGE,
        payload: agePayload,
    })
}

export const increaseAgeInActions = (agePayload) => dispatch => {
    dispatch({
        type: INCREASE_USER_AGE,
        payload: agePayload
    })
}