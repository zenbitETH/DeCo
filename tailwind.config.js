module.exports = {
    mode: 'jit',
    purge: [
      './pages/**/*.{js,jsx,ts,tsx,vue}',
      './components/**/*.{js,jsx,ts,tsx,vue}',
    ],
    media: false, // or 'media' or 'class'
    variants: {},
    theme: {
        extend: {
            colors: {
                cyber: {
                    100: "#119195",
                    200: "#0b979b",
                    300: "#119195",
                    400: "#178b8f",
                    500: "#247f82",
                    600: "#376d6f",
                    700: "#3e6768",
                    800: "#4a5b5c",
                    900: "#515555",
                },

                gray: {
                    900: "#202225",
                    800: "#2f3136",
                    700: "#36393f",
                    600: "#4f545c",
                    400: "#d4d7dc",
                    300: "#e3e5e8",
                    200: "#ebedef",
                    100: "#f2f3f5",
                },

                solar: {
                    900: "#aaa6a1",
                    800: "#bfa98c",
                    700: "#cdaa7e",
                    600: "#daac71",
                    500: "#e1ad6a",
                    400: "#e8ad63",
                    300: "#efae5c",
                    200: "#f6af55",
                    100: "#fdb04e",
                },

                deco: {
                    900: "#f7f7f7",
                    800: "#C3C4C9",
                    700: "#0e213d",
                    600: "#056e78",
                    500: "#09d6ea",
                    400: "#49e9f8",
                    300: "#811567",
                    200: "#d522ab",
                    100: "#e03fba",
                },

                night: {
                    300: "#014875",
                    200: "#01304E",
                    100: "#01243b",
                    
                },

                
				backgrounds: {
					900: "#719CE4",//backgrounnd dark
					800: "#2765cc",
					700: "#75C31D",
					600: "#9E9E9E",//button
					500: "#FAFAFA",//white
					400: "#2D3134",
					300: "#5538b5",
					200: "#cec5ed",
					100: "#A898DF",//background light
				},
                
                glass: {
                    900: "#19191a00",
                    100: "#ffffff10",
                    200: "#ffffff20",
                    300: "#ffffff30",
                    400: "#ffffff40",
                    500: "#fdb04e71",
                    600: "#11919551",
                    700: "#e03fba71",
                    800: "#49e9f871",
                },

                "bookmark-purple": "#5267DF",
                "bookmark-red": "#fa5959",
                "bookmark-blue": "#242A45",
                "bookmark-grey": "#9194A2",
                "bookmark-white": "#f7f7f7",
            },
            screens: {
                'fhd': '1920px',
                'qhd': '2560px',
                'uhd': '3840px',
              },
            spacing: {
                88: "22rem",
            },
            borderRadius: {
                'tf': '25px',
            },
            fontFamily: {
                Poppins: ["Poppins, sans-serif"],
                exo: ['"Exo 2"'],
                lex: ['"Lexend"'],
                bal: ['"Baloo 2"'],
            },

            container: {
                center: true,
                padding: "1rem",
                screens: {
                    lg: "1124px",
                    xl: "1124px",
                    "2xl": "1124px",
                },
            },
        },
    },
    plugins: [],
}