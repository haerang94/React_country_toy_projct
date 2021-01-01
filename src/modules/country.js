import { getCountriesApi } from "api/country";

//  actions

const GET_COUNTRIES = "GET_COUNTRIES";
const GET_COUNTRIES_SUCCESS = "GET_COUNTRIES_SUCCESS";
const GET_COUNTRIES_ERROR = "GET_COUNTRIES_ERROR";
const SET_COUNTRIES = "SET_COUNTRIES";
const SET_SEARCHED_DATA = "SET_SEARCHED_DATA";
const DELETE_INITIAL_DATA = "DELETE_INITIAL_DATA";
const DELETE_SEARCHED_DATA = "DELETE_SEARCHED_DATA";

// 정렬 관련 actions
const SET_ASCENDING_STATUS = "SET_ASCENDING_STATUS";


// action 생성 함수, api 미들웨어
export const getCountries = () => async(dispatch) => {
    dispatch({ type: GET_COUNTRIES });
    try {
        const countries = await getCountriesApi();
        dispatch({ type: GET_COUNTRIES_SUCCESS, countries });
    } catch (e) {
        dispatch({ type: GET_COUNTRIES_ERROR, error: e });
    }
};

export const setCountries = newCountries => ({
    type: SET_COUNTRIES,
    newCountries
});

export const setSearchedData = newCountries => ({
    type: SET_SEARCHED_DATA,
    newCountries
});

export const deleteInitialData = (name) => ({
    type: DELETE_INITIAL_DATA,
    name
})

export const deleteSearchedData = (name) => ({
    type: DELETE_SEARCHED_DATA,
    name
})


// 정렬 관련 액션 생성 함수

export const setAscendingStatus = newAscendingStatus => ({
    type: SET_ASCENDING_STATUS,
    newAscendingStatus
})


//  초기 countries 상태
const initialState = {
    countries: {
        loading: false,
        data: null,
        error: null,
    },
    searchedData: {
        data: null
    },
    ascendingStatus: {
        name: true,
        alpha2Code: true,
        callingCodes: true,
        capital: true,
        region: true,
    }
};
//  country reducer
export default function country(state = initialState, action) {
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: {
                    loading: true,
                    data: null,
                    error: null,
                },
            };
        case GET_COUNTRIES_SUCCESS:
            return {
                ...state,
                countries: {
                    loading: true,
                    data: action.countries,
                    error: null,
                },
            };
        case GET_COUNTRIES_ERROR:
            return {
                ...state,
                countries: {
                    loading: true,
                    data: null,
                    error: action.error,
                },
            };
        case SET_COUNTRIES:
            return {
                ...state,
                countries: {
                    loading: false,
                    error: null,
                    data: action.newCountries
                }
            }
        case SET_SEARCHED_DATA:
            return {
                ...state,
                searchedData: {
                    data: action.newCountries,
                }
            }
        case SET_ASCENDING_STATUS:
            return {
                ...state,
                ascendingStatus: action.newAscendingStatus
            }

        case DELETE_INITIAL_DATA:
            return {
                ...state,
                countries: {
                    ...state.countries,
                    data: state.countries.data.filter(country => country.name !== action.name)
                }
            }
        case DELETE_SEARCHED_DATA:
            return {
                ...state,
                searchedData: { data: state.searchedData.data.filter(country => country.name !== action.name) }
            }

        default:
            return state;
    }
}