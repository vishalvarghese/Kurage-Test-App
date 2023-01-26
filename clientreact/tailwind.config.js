/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage:{
        'signupBg':"url('./assets/img/register_bg_2.png')"
      }
    },
  },
  plugins: [],
}