export default class ThemeService {
    constructor(){
        this.themes= [
            {
                themeName: "blue",
                imageSource: require('../../assets/blue_bot.png'),
                isActiveTheme: true
            }, {
                themeName: "light",
                imageSource: require('../../assets/light_bot.png'),
                isActiveTheme: false
            }, {
                themeName: "dark",
                imageSource: require('../../assets/dark_bot.png'),
                isActiveTheme: false
            }
        ]
    }

    changeTheme(themeIndex) {
        for (let theme of this.themes) {
            theme.isActiveTheme = false;
        }
        this.themes[themeIndex].isActiveTheme = true;
    }

    getAllThemes(){
        return this.themes;
    }

    getActiveTheme(){
        for (let theme of this.themes) {
            if (theme.isActiveTheme) {
                return theme;
            }
        }
        return this.themes[0];
    }
}
