const clockDisplay = document.getElementById("clock-display")
const timeChange = document.getElementById("timeChange")
const timeFormat = document.getElementById("timeFormat")
const darkModeBtn = document.getElementById("darkModeBtn")
const dateText = document.getElementById("date")
// const colon1 = document.getElementById("colon1")
// const colon2 = document.getElementById("colon2")
let is24HourFormat = true;

const clockApp = {
    // this function put a 0 in front of the given number if it is less than 10 but if not it just return the number back out
    formatNumber: function (num) {
        return num < 10 ? `0${num}` : num;
    },


    //This function gets the date from local computer and divides it into hours, minutes, and seconds. Then it returns it in a hour:minute:second format to be put into html
    getTimeString: function () {
        let now = new Date();
        let h = now.getHours();
        let m = now.getMinutes();
        let s = now.getSeconds();
        let ampm = ''

        if (!is24HourFormat) {
            ampm = h >= 12 ? ' PM' : ' AM';
            h = h % 12 || 12;
        }

        h = this.formatNumber(h)
        m = this.formatNumber(m)
        s = this.formatNumber(s)

        const blinkClass = (now.getSeconds() % 2 !== 0) ? 'opacity-0' : '';


        let result = `${h}<span id="colon1" class="${blinkClass}">:</span>${m}<span id="colon2" class="${blinkClass}">:</span>${s} ${ampm}`


        return result
    },

    getTimezoneName: function () {
        return Intl.DateTimeFormat().resolvedOptions().timeZone
    },


    // this function inserts the result of the getTimeString function into the HTML
    updateDisplay: function () {

        let now = new Date();
        let m = now.getMinutes();
        let s = now.getSeconds();

        clockDisplay.innerHTML = `<p> ${this.getTimeString()} </p>`

        const zone = this.getTimezoneName()

        if (is24HourFormat) {
            timeFormat.innerHTML = `Military time : ${zone}`
        } else {
            timeFormat.innerHTML = `Standard 12hr Time : ${zone}`

        }

        // const activeColon1 = document.getElementById("colon1")
        // const activeColon2 = document.getElementById("colon2")


        if (s === 0) {
            console.log("Minute has passed!")
        }
    }


}


// this function toggles the time between military time and 12 hour format
function timeToggle() {
    is24HourFormat = !is24HourFormat;
    clockApp.updateDisplay();
}

// this setInterval will update clock display every second so it is constantly updating

clockApp.updateDisplay()
setInterval(() => clockApp.updateDisplay(), 1000)



// click to toggle time format change
timeChange.addEventListener("click", timeToggle)


// darkMode toggle
function toggleDarkMode() {

    document.documentElement.classList.toggle("dark")

    if (document.documentElement.classList.contains("dark")) {
        darkModeBtn.textContent = "Light Mode"
    } else {
        darkModeBtn.textContent = "Dark Mode"
    }
}

darkModeBtn.addEventListener("click", toggleDarkMode);

const today = new Date()
dateText.innerHTML = today.toDateString()

