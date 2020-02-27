<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-card
            max-width="500"
            class="mx-auto card"
    >
        <v-toolbar
                color="pink"
                dark
        >
            <v-toolbar-title>Meteo</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn class="mx-2" fab dark small color="primary" @click="removeWidget">
                <v-icon dark>mdi-minus</v-icon>
            </v-btn>

        </v-toolbar>

        <div class="content">
            <p>Enter a city to display its temperature</p>
            <div class="flexContainer">
                <v-text-field class="CityInput" label="City" hide-details="auto" v-model="city"></v-text-field>
                <v-btn
                        class="ma-2 SearchBtn"
                        :loading=false
                        :disabled=false
                        color="info"
                        @click="queryApi()"
                >
                    Search
                    <template v-slot:loader>
        <span class="custom-loader">
          <v-icon light>cached</v-icon>
        </span>
                    </template>
                </v-btn>
            </div>

          <!--  <a href="https://imgbb.com/"><img src="https://i.ibb.co/f1TVhTx/fahrenheit.png" alt="fahrenheit" border="0"></a>
            <a href="https://imgbb.com/"><img src="https://i.ibb.co/pJzD1rN/celsius.png" alt="celsius" border="0"></a>-->

            <div v-if="apiResponse.status !== null">
                <div class="tempStat">
                    <p class="subtitle-1">Temperature: {{apiResponse.temperature}}</p>
                    <v-img class="temperatureTypeLogo" id="temperatureLogo" :src="temperatureImg" @click="swichTempUnit()"></v-img>
                </div>
                <div class="otherStats">
                    <p>Feeled temperature: {{apiResponse.feeledTemperature}}</p>
                    <p>Humidity: {{apiResponse.humidity}}</p>
                    <p>Wind Speed: {{apiResponse.windSpeed}}</p>
                    <p>Weather: {{apiResponse.weather}}</p>
                </div>
            </div>
            <div>
            </div>
            <p v-if="apiError !== null">{{apiError}}</p>
        </div>
    </v-card>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "SteamServicePlayerNb",
        props: {
            widgetId: null,
        },
        data: () => ({
            apiResponse: {
                status: null,
                weather: null,
                temperature: null,
                feeledTemperature: null,
                humidity: null,
                windSpeed: null,
            },
            apiError: null,
            city: null,

            images: {
                fahrenheit: 'https://i.ibb.co/f1TVhTx/fahrenheit.png',
                celsius: 'https://i.ibb.co/pJzD1rN/celsius.png',
            },
            temperatureImg: null,
            fahrenheit: true,
        }),
        methods: {
            swichTempUnit() {
                console.log("switch temperature image");
                if (this.temperatureImg === this.images.celsius) {
                    this.temperatureImg = this.images.fahrenheit;
                    this.apiResponse.temperature = ((this.apiResponse.temperature * 9/5) + 32).toFixed(2);
                    this.apiResponse.feeledTemperature = ((this.apiResponse.feeledTemperature * 9/5) + 32).toFixed(2);
                } else {
                    this.temperatureImg = this.images.celsius;
                    this.apiResponse.temperature = ((this.apiResponse.temperature - 32) * 5/9).toFixed(2);
                    this.apiResponse.feeledTemperature = ((this.apiResponse.feeledTemperature - 32) * 5/9).toFixed(2);
                }
            },
            removeWidget() {
                this.$parent.removeChildWidget(this.widgetId);
            },
            queryApi() {
                console.log(this.city);
                if (this.city === null || this.city === '') {
                    this.apiResponse.status = null;
                    this.apiError = "No city specified";
                    return -1;
                }
                this.apiError = null;

                //reset l'image a fahrenheit quand y'a une nouvelle recherche
                this.temperatureImg = this.images.fahrenheit;

                axios.get(`http://localhost:3000/getMeteoForCity?city=${this.city}`, {
                }).then((res) => {
                    if (res.data === 404) {
                        this.apiResponse.status = null;
                        this.apiError = `City "${this.city}" not found`;
                        return (-1);
                    }
                    this.apiError = null;
                    this.apiResponse.status = "ok";
                    this.apiResponse.weather = res.data.weather[0].main;
                    this.apiResponse.temperature = res.data.main.temp;
                    this.apiResponse.feeledTemperature = res.data.main.feels_like;
                    this.apiResponse.humidity = res.data.main.humidity;
                    this.apiResponse.windSpeed = res.data.wind.speed;
                }).catch(function (error) {
                    console.log("Error response from API: ", error.data);
                });
            }
        },
        mounted() {
            this.temperatureImg = this.images.fahrenheit;
            console.log("widget id: " + this.widgetId);
        },
    }
</script>

<style scoped>
    .tempStat {
        display: flex;
        max-width: 450px;
    }

    .card {
        margin: 30px;
    }

    .content {
        padding: 10px;
    }

    .CityInput {
        margin-bottom: 16px;
        max-width: 200px;
    }

    .SearchBtn {
        margin:10px;
        bottom: 0;
    }

    .flexContainer {
        display: flex;
    }

    .temperatureTypeLogo {
        margin-left: 10px;
        max-width: 40px;
        max-height: 40px;
    }


</style>