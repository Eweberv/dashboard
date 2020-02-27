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
                                <v-toolbar-title>Register</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field
                                            v-model="name"
                                            label="Name"
                                            name="name"
                                            type="text"
                                    ></v-text-field>

                                    <v-text-field
                                            v-model="password"
                                            id="password"
                                            label="Password"
                                            name="password"
                                            type="password"
                                    ></v-text-field>
                                    <v-text-field
                                            v-model="email"
                                            id="email"
                                            label="Email"
                                            name="email"
                                            type="email"
                                    ></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <router-link to="/Login">Back to Login</router-link>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="register()">Register</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Register',
        data: () => ({
            name: null,
            password: null,
            email: null,
            snackbar: false,
            color: null,
            snackbarText: null,
        }),
        methods: {
            register() {

                axios.post(`http://localhost:3000/register`, {
                    name: this.name,
                    password: this.password,
                    email: this.email
                }).then((res) => {
                    this.color = "success";
                    this.snackbarText = res.data;
                    this.snackbar = true;
                }).catch(error => {
                    this.snackbarText = error.response.data.err;
                    this.color = "error";
                    this.snackbar = true;

                });
            }
        }
    }
</script>

<style scoped>

</style>