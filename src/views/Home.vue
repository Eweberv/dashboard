<template>
    <v-container class="d-flex align-baseline">

        <v-row class="d-flex align-content-end justify-center">
            <div>
                <v-select v-model="selected" :items="widgets" item-text="name" label="select a widget" return-object></v-select>
                <v-btn v-on:click="addToCard()">Add</v-btn>
                <v-btn v-on:click="clearCard()">Clear</v-btn>
                <!--<p>selected value: {{selected}}</p>-->
            </div>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-row
                        align="center"
                        justify="space-around"
                >
                    <div v-for="(elem, index) in card" v-bind:key="index">
                        <div v-if="elem.name === 'Meteo'">
                            <MeteoService :widget-id="index"></MeteoService>
                        </div>
                        <div v-if="elem.name === 'Steam: players in game'">
                            <SteamServicePlayerNb :widget-id="index"></SteamServicePlayerNb>
                        </div>
                        <div v-if="elem.name === 'Steam: achievements stats for game'">
                            <SteamServiceAchievementStats :widget-id="index"></SteamServiceAchievementStats>
                        </div>
                    </div>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>
<!-- Page principale du site contenant les différents services-->

<script>
    import MeteoService from '../components/MeteoService'
    import SteamServicePlayerNb from "../components/SteamServicePlayerNb";
    import SteamServiceAchievementStats from "../components/SteamServiceAchievementStats"

    export default {
        name: "Shopping list",
        components: {SteamServicePlayerNb, MeteoService, SteamServiceAchievementStats},
        data: () => ({
            widgets: [
                {
                    name: 'Meteo',
                },
                {
                    name: 'Steam: players in game',
                },
                {
                    name: 'Steam: achievements stats for game',
                },
            ],
            selected: [],
            card: [],
            alignmentsAvailable: [
                'start',
                'center',
                'end',
                'baseline',
                'stretch',
            ],
            alignment: 'center',
            dense: false,
            justifyAvailable: [
                'start',
                'center',
                'end',
                'space-around',
                'space-between',
            ],
            justify: 'center',
        }),
        methods: {
            addToCard() {
                this.card.push(this.selected)
            },
            clearCard() {
                this.card = [];
            },
            removeChildWidget(widgetIndex) {
                console.log("remove at pos: " + widgetIndex);
                this.card.splice(widgetIndex, 1);
            }
        },
    }
</script>

<style scoped>

    #clientCard td, #clientCard th {
        border: 1px solid #ddd;
        padding: 8px;
    }

    h3 {
        margin: 40px 0 0;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }

</style>