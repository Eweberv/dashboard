<template>
    <div class="d-flex justify-center align-center">
        <v-container>
            <v-layout
                    align-center
                    justify-center
            >
                <v-flex
                        xs12
                        sm8
                        md4
                >
                    <v-card class="elevation-12">
                        <v-toolbar
                                color="primary"
                                dark
                                flat
                        >
                            <v-toolbar-title>Login</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-form>
                                <v-text-field
                                        v-model="loginStr"
                                        label="Login"
                                        name="login"
                                        type="text"
                                ></v-text-field>

                                <v-text-field
                                        v-model="passwordStr"
                                        id="password"
                                        label="Password"
                                        name="password"
                                        type="password"
                                ></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <router-link to="/Register">No account? Register now</router-link>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="login()">Login</v-btn>
                        </v-card-actions>
                        <p>If you have trouble loggin in: <router-link to="/home">direct link to my Services</router-link></p>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import axios from "axios";
    import router from '../router/router'

    export default {
        name: 'Login',
        data: () => ({
           loginStr: null,
           passwordStr: null
        }),
        methods: {
            login() {
                axios.post(`http://localhost:3000/login`, {
                    login: this.loginStr,
                    password: this.passwordStr
                }).then((res) => {
                    console.log(res.data);
                    if (res.data.message === "logged in") {
                    router.push('/home')
                    }
                }).catch(function (error) {
                    console.log("Error response from API: ", error.message);
                });
            }
        }
    }
</script>

<style scoped>

</style>