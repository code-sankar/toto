export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        colors: {
          primary: "#4F46E5",
          "primary-dark": "#4338CA",
          secondary: "#6B7280",
          "task-high": "#FECACA",
          "task-medium": "#FDE68A",
          "task-low": "#A7F3D0"
        },
        boxShadow: {
          card: "0px 2px 8px rgba(0, 0, 0, 0.1)",
          button: "0px 2px 4px rgba(0, 0, 0, 0.1)"
        }
      }
    },
    plugins: [require("@tailwindcss/forms")]
}