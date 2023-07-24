<template>
    <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-8 col-lg-6 col-xl-5">
            <Transition appear name="fade" mode="out-in">
                <div v-if="location" class="card m-3 shadow">
                    <div class="card-body p-4">
                        <h3 class="card-title">{{ location?.name }}</h3>
                        <p class="card-text">
                            <span v-if="location?.dt">
                                {{ new Date(location.dt * 1000 + (location.timezone * 1000)).toDateString() }}
                                - {{ new Date(location.dt *
                                    1000 + (location.timezone * 1000)).getUTCHours().toString().padStart(2, '0') }}: {{
        new Date(location.dt *
            1000 + (location.timezone * 1000)).getUTCMinutes().toString().padStart(2, '0') }}
                            </span>,
                            <span class="fw-bold text-capitalize">{{ location?.weather[0].description }}
                            </span>
                        </p>
                        <div class="d-flex justify-content-between align-items-center px-4">
                            <p class="display-1">{{ new Intl.NumberFormat('de-DE', {
                                style: 'unit', unit: 'celsius'
                            }).format(Math.floor(location.main.temp)) }}</p>
                            <img :src="`https://openweathermap.org/img/wn/${location?.weather[0].icon}@2x.png`"
                                :alt="location?.weather[0].description">
                        </div>
                        <div class="d-flex justify-content-between align-items-center px-4">
                            <p class="fs-5"><i class="bi bi-thermometer-high text-danger pe-2 fs-5"></i>{{ new
                                Intl.NumberFormat('de-DE', {
                                    style: 'unit', unit: 'celsius'
                                }).format(Math.floor(location.main.temp_max)) }}
                            </p>
                            <p class="fs-5"><i class="bi bi-thermometer-low text-primary pe-2 fs-5"></i>{{ new
                                Intl.NumberFormat('de-DE',
                                    {
                                        style: 'unit', unit: 'celsius'
                                    }).format(Math.floor(location.main.temp_min)) }}</p>
                        </div>
                        <div class="d-flex justify-content-between mb-4 align-items-center px-4">
                            <p class="fs-5"><i class="bi bi-droplet-fill text-info pe-2 fs-5"></i>{{
                                location.main.humidity }}%</p>
                            <p class="fs-5"><i class="bi bi-wind pe-2 fs-5"></i>{{ location.wind?.speed }} m/sec</p>
                        </div>

                        <form @submit.prevent="getWeatherByCity" class="mt-2 mb-2">
                            <div class="input-group">
                                <input type="text" v-model="cityName" class="form-control" placeholder="Enter a city" />
                                <button type="submit" class="btn btn-primary" :disabled="!cityName">Get Weather</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useOpenWeatherMapStore } from "../stores/OpenWeatherMapStore";
import { storeToRefs } from 'pinia';

const cityName = ref("");

// Pinia Store
const openWeatherMapStore = useOpenWeatherMapStore();
const { location } = storeToRefs(openWeatherMapStore);

const getRandomLocation = async () => {
    await openWeatherMapStore.getRandomCoords();
};

const getWeatherByCity = async () => {
    await openWeatherMapStore.getSelectedCity(cityName.value);
}


onMounted(() => {
    localStorage.clear();
    getRandomLocation();
});

</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>