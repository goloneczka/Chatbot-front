<template>
    <div class="container login-container">
        <div class="row">
            <div class="col-md-6 login-form-1">
                <h3>{{$t('login.title')}}</h3>
                <form @submit.prevent="handleSubmit">
                    <div class="form-group">
                        <input v-model="login" type="text" class="form-control" :placeholder="$t('login.login')"
                               value=""/>
                    </div>
                    <div class="form-group">
                        <input v-model="password" type="password" class="form-control"
                               :placeholder="$t('login.password')"
                               value=""/>
                    </div>
                    <div class="form-group">
                        <input type="submit" class="btnSubmit" :value="$t('login.button')"/>
                    </div>
                    <div class="form-group">
                        <a href="#" class="ForgetPwd">{{$t('login.forgetPassword')}}</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>

    import { httpRequest, authorizationStorage }  from '../../App'
    import { routesNames } from '../../routes';

    export default {
        name: 'login',
        components: {},
        data() {
            return {
                login: '',
                password: ''
            }
        },
        methods: {
            handleSubmit() {
                httpRequest.get('admin/login').then(response => {
                    if (response.errors)
                        this.$root.$emit('showDanger', response.errors.toString());
                    else {
                        authorizationStorage.setAuthorization(this.login, this.password);
                        this.$router.push(routesNames.adminHome)
                    }
                })
            },
        }
    }
</script>
<style scoped>
    .login-container {
        margin-top: 5%;
        margin-bottom: 5%;
    }

    .login-form-1 {
        padding: 5%;
        margin: auto;
        box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
    }

    .login-form-1 h3 {
        text-align: center;
        color: #333;
    }

    .login-container form {
        padding: 10%;
    }

    .btnSubmit {
        width: 50%;
        border-radius: 1rem;
        padding: 1.5%;
        border: none;
        cursor: pointer;
    }

    .login-form-1 .btnSubmit {
        font-weight: 600;
        color: #fff;
        background-color: #9933ff;
    }

    .login-form-1 .ForgetPwd {
        color: #9933ff;
        font-weight: 600;
        text-decoration: none;
    }
</style>
