<template>
    <div>
        <div>
            <ul>
                <li class="message">
                    <div><a>Wybrałeś pogode! A w jakim chcesz mieście?</a></div>
                </li>
            </ul>
        </div>
        <b-img height="30" v-bind:src="require('../../assets/light_bot.png')"></b-img>
        <div id="dropdown-button">
            <b-dropdown text="Wybór miasta" class="m-2">
                <b-dropdown-item @click="() => this.dropdownOnClick('Wrocław')">Wrocław</b-dropdown-item>
                <b-dropdown-item @click="() => this.dropdownOnClick('Szczecin')">Szczecin</b-dropdown-item>
                <b-dropdown-item @click="() => this.dropdownOnClick('Sosnowiec')">Sosnowiec</b-dropdown-item>
            </b-dropdown>
        </div>
        <div id="weather-component"></div>
    </div>
</template>
<script>

    // import { weatherService }  from './../../App'

    export default {
        name: 'weather',
        components: {},
        data: function () {
            return {
                messages: [],

            }
        },
        methods: {
            dropdownOnClick(value) {
                const newDive = document.createElement("div");
                const ulDiv = document.createElement("ul");
                const liDiv = document.createElement("li");
                liDiv.classList = "message-user";
                const newDiv = document.createElement("div");
                const aDiv = document.createElement("a");
                aDiv.textContent = `Wybieram miasto ${value}!`;
                newDiv.appendChild(aDiv);
                liDiv.appendChild(newDiv);
                ulDiv.appendChild(liDiv);
                newDive.appendChild(ulDiv);
                document.getElementById("weather-component").appendChild(newDive);
                document.getElementById("dropdown-button").remove();
            },
        },
        mounted() {
            this.messages = [];
        },
    }
</script>
<style>
    #dropdown-button {
        margin-left: 85%;
    }

    .message > div {
        border-radius: var(--chat-box-message-bot-border-radius)
    }

    .message-user {
        margin-left: 77%;
        border-radius: 20px 20px 20px 20px;
    }

</style>
