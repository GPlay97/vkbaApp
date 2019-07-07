<template>
    <Page actionBarHidden="true">
        <FlexboxLayout class="page">
            <StackLayout class="form">
                <Image class="logo" src="~/images/logo.png"></Image>
                <Label class="header" text="VKBA"></Label>

                <GridLayout rows="auto, auto, auto">
                    <StackLayout row="0" class="input-field">
                        <TextField class="input" hint="Username" :isEnabled="!processing"
                            autocorrect="false" autocapitalizationType="none" v-model="username"
                            returnKeyType="next" @returnPress="focusPassword"></TextField>
                        <StackLayout class="hr-light"></StackLayout>
                    </StackLayout>

                    <StackLayout row="1" class="input-field">
                        <TextField class="input" ref="password" :isEnabled="!processing"
                            hint="Passwort" secure="true" v-model="password"
                            :returnKeyType="isLoggingIn ? 'done' : 'next'"
                            @returnPress="focusConfirmPassword"></TextField>
                        <StackLayout class="hr-light"></StackLayout>
                    </StackLayout>

                    <StackLayout row="2" v-show="!isLoggingIn" class="input-field">
                        <TextField class="input" ref="confirmPassword" :isEnabled="!processing"
                            hint="Passwort bestätigen" secure="true" v-model="confirmPassword"
                            returnKeyType="done"></TextField>
                        <StackLayout class="hr-light"></StackLayout>
                    </StackLayout>

                    <ActivityIndicator rowSpan="3" :busy="processing"></ActivityIndicator>
                </GridLayout>

                <Button :text="isLoggingIn ? 'Anmelden' : 'Registrieren'" :isEnabled="!processing"
                    @tap="submit" class="btn btn-primary m-t-20"></Button>
                <Label *v-show="isLoggingIn" text="Passwort vergessen?"
                    class="login-label" @tap="forgotPassword()"></Label>
            </StackLayout>

            <Label class="login-label sign-up-label" @tap="toggleForm">
                <FormattedString>
                    <Span :text="isLoggingIn ? 'Noch keinen Account? ' : 'Zurück zum Login'"></Span>
                    <Span :text="isLoggingIn ? 'Registrieren' : ''" class="bold"></Span>
                </FormattedString>
            </Label>
        </FlexboxLayout>
    </Page>
</template>

<script>
    import Home from "./Home";

    export default {
        data() {
            return {
                isLoggingIn: true,
                processing: false,
                username: '',
                password: '',
                confirmPassword: ''
            };
        },
        methods: {
            toggleForm() {
                this.isLoggingIn = !this.isLoggingIn;
            },

            submit() {
                if (!this.username || !this.password) {
                    this.alert(
                        "Bitte Benutzername und Passwort angeben."
                    );
                    return;
                }

                this.processing = true;
                if (this.isLoggingIn) {
                    this.login();
                } else {
                    this.register();
                }
            },

            login() {
                const self = this;

                setTimeout(() => {
                    self.processing = false;
                    self.$root.isLoggedIn = true;
                    self.$navigateTo(Home, { clearHistory: true });
                }, 2000);
            },

            register() {
                const self = this;

                if (self.password != self.confirmPassword) {
                    self.alert("Passwörter stimmen nicht überein.");
                    self.processing = false;
                    return;
                }
                setTimeout(() => {
                    self.processing = false;
                    self.alert(
                        "Account erfolgreich erstellt.");
                    self.isLoggingIn = true;
                }, 2000);
            },

            forgotPassword() {
                this.alert('Bitte wende Dich an contact@legendskyfall.de');
            },

            focusPassword() {
                this.$refs.password.nativeView.focus();
            },
            focusConfirmPassword() {
                if (!this.isLoggingIn) {
                    this.$refs.confirmPassword.nativeView.focus();
                }
            },

            alert(message) {
                return alert({
                    title: "VKBA",
                    okButtonText: "OK",
                    message: message
                });
            }
        }
    };
</script>

<style scoped>
    .page {
        align-items: center;
        flex-direction: column;
        background-color: #2C3251;
    }

    .form {
        margin-left: 30;
        margin-right: 30;
        flex-grow: 2;
        vertical-align: middle;
    }

    .logo {
        margin-bottom: 12;
        height: 90;
        font-weight: bold;
    }

    .header {
        horizontal-align: center;
        font-size: 25;
        font-weight: 600;
        margin-bottom: 70;
        text-align: center;
        color: white;
    }

    .input-field {
        margin-bottom: 25;
    }

    .input {
        font-size: 18;
        color: white;
        placeholder-color: #A8A8A8;
    }

    .input:disabled {
        background-color: white;
        opacity: 0.5;
    }

    .btn-primary {
        margin: 30 5 15 5;
    }

    .login-label {
        horizontal-align: center;
        color: #A8A8A8;
        font-size: 16;
    }

    .sign-up-label {
        margin-bottom: 20;
    }

    .bold {
        font-weight: bold;
        color: white;
    }
</style>
