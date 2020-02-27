<template>
    <v-card
            max-width="500"
            class="mx-auto card"
    >
        <v-toolbar
                color="pink"
                dark
        >
            <v-toolbar-title>Steam</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn class="mx-2" fab dark small color="primary" @click="removeWidget()">
                <v-icon dark>mdi-minus</v-icon>
            </v-btn>

        </v-toolbar>

        <div class="content">
            <p>Enter an GameId to see its achievements stats</p>
            <a href="https://steamdb.info/apps/" target="_blank">AppID list</a>
            <div class="flexContainer">
                <v-text-field class="AppIdInput" label="App Id" hide-details="auto" v-model="gameId"></v-text-field>
                <v-btn
                        class="ma-2 SearchBtn"
                        :loading=false
                        :disabled=false
                        color="info"
                        @click="queryApi()"
                >
                    Search
                </v-btn>
            </div>
            <p v-if="apiResponse !== null">{{apiResponse}} players in game</p>
            <p v-if="apiError !== null">{{apiError}}</p>
        </div>
    </v-card>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "SteamServicePlayerNb",
        data: () => ({
            /*tableHeader: [
                {
                    text: 'City',
                    align: 'left',
                    sortable: false,
                    value: 'city',
                },
                {text: 'Cost', value: 'cost'}
            ],*/
            apiKey: '88E78A0C568F9E1D0E92B198E7BB5622',
            apiResponse: [],
            apiError: [],
            gameId: null,
        }),
        methods: {
            removeWidget() {
                this.$parent.removeChildWidget(this.widgetId);
            },
            queryApi() {
                    axios.get('http://localhost:3000/getAchievements}', {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                        }
                }).then((res) => {
                    console.log(this.appId);
                    if (this.appId === null || this.appId === '') {
                        this.apiResponse = null;
                        this.apiError = "Invalid appId";
                        return -1;
                    }
                    this.apiError = null;
                    this.apiResponse = res.data;
                }).catch(function (error) {
                    console.log("error occured");
                    if (error.response) {
                        console.log(error.response.headers);
                    }
                    else if (error.request) {
                        console.log(error.request);
                    }
                    else {
                        console.log(error.message);
                    }
                    console.log(error.config);
                });
            },
        }
    }
</script>

<style scoped>

</style>