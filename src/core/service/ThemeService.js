export default class ThemeService {
    constructor(){
        this.themes= [
         {
                themeName: "light",
                imageSource: require('../../assets/fromGraphics2/skin_light.svg'),
                isActiveTheme: false
            }, {
                themeName: "blue",
                imageSource: require('../../assets/fromGraphics2/skin_gradient.svg'),
                isActiveTheme: true
            }, {
                themeName: "dark",
                imageSource: require('../../assets/fromGraphics2/skin_dark.svg'),
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
