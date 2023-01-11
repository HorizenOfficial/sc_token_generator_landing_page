module.exports = {
    mode: "jit",
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    theme: {
        extend: {
            colors: {
                gray: {
                    light: '#A1ADB7',
                    separators: '#E4E8EA',
                },
                'Main_bckgrnd': '#06060E',
                'ZBF_dark': '#041742',
                'ZBF_blue': '#0E9DE5',
                'ZBF_green': '#26DB8D',
                'ZBF_red': '#EB5757',
                'Content_gray': '#C8CFD5',
                'Gray_text': '#7A7E8C',
                'Footer_bckgrnd': '#000000',
                'Creator_border': '#031137',
                'Lightmode-2': '#F4F2FF',
                'Hover_bckgrnd': '#101019',
                'Slider_bckgrnd': '#171717'
            },
            opacity: {
                '10': '0.1',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
