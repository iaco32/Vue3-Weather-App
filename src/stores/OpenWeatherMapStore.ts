import { defineStore } from "pinia";
import { WeatherData } from "../types/WeatherDataInterface"
import { ref } from "vue";
import axios from "axios";
import Swal from 'sweetalert2'

const API_BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_ID = import.meta.env.VITE_VUE_OPENWEATHERMAP_KEY;

export const useOpenWeatherMapStore = defineStore("OpenWeatherMapStore", () => {

    // state
    const location = ref<WeatherData>();

    // action
    async function getRandomCoords() {

        //random latitude and longitude 
        const lat = Math.floor(Math.random() * (90 - (-90)) + (-90));
        const lon = Math.floor(Math.random() * (180 - (-180)) + (-180));

        try {
            const response = await axios.get(API_BASE_URL + `/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_ID}`);
            // update pinia state
            // set the location data only if there is a valid name
            if (response.data.name) {
                location.value = response.data;
            } else {
                await getRandomCoords();
            }
        } catch (error) {
            Swal.fire({
                text: "There was an error while receiving data!",
                icon: "error",
                buttonsStyling: false,
                confirmButtonText: "OK",
                customClass: {
                    confirmButton: "btn btn-danger px-4",
                },
            });
        }
    };

    async function getSelectedCity(city: string) {
        // check if selected city is already into the localStorage
        const cachedData = localStorage.getItem(city);
        if (cachedData) {
            location.value = JSON.parse(cachedData);
        }
        // call the API
        else {
            try {
                const response = await axios.get(API_BASE_URL + `/weather?q=${city}&units=metric&appid=${API_ID}`);
                // update pinia state
                location.value = response.data;
                localStorage.setItem(city, JSON.stringify(response.data));
            } catch (error) {
                Swal.fire({
                    text: "There is no weather information for the entered city or the city does not exist!",
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "OK",
                    customClass: {
                        confirmButton: "btn btn-danger px-4",
                    },
                });
            }
        }

    }


    return { location, getRandomCoords, getSelectedCity };
})