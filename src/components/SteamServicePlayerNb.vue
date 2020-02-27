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

            <v-btn class="mx-2" fab dark small color="primary" @click="removeWidget">
                <v-icon dark>mdi-minus</v-icon>
            </v-btn>

        </v-toolbar>

        <div class="content">
            <p>Enter an AppID to see how many players are in game</p>
            <a href="https://steamdb.info/apps/" target="_blank">AppID list</a>
            <div class="flexContainer">
                <v-text-field class="AppIdInput" label="App Id" hide-details="auto" v-model="appId"></v-text-field>
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
        props: {
            widgetId: null,
        },
        data: () => ({
            apiResponse: null,
            apiError: null,
            appId: null,
        }),
        methods: {
            removeWidget() {
                this.$parent.removeChildWidget(this.widgetId);
            },
            queryApi() {
                console.log(this.appId);
                if (this.appId === null || this.appId === '') {
                    this.apiResponse = null;
                    this.apiError = "Invalid appId";
                    return -1;
                }
                this.apiError = null;
                axios.get(`http://localhost:3000/getGamePlayerNb?appId=${this.appId}`, {
                }).then((res) => {
                    this.apiResponse = res.data.response.player_count;
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
            }
        },
        mounted() {
            console.log("widget id: " + this.widgetId);
        },
    }
</script>

<style scoped>
    .card {
        margin: 30px;
    }

    .content {
        padding: 10px;
    }

    .AppIdInput {
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


</style>