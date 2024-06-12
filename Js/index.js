const myinput = document.querySelector(".myinput");
const errorData = document.querySelector(".invaild");
const btnEnd = errorData.querySelector("button");
let countery;

document.querySelector(".myForm").addEventListener("submit", function (e) {
  e.preventDefault();
  countery = myinput.value;
  getCountery(countery);
});

async function getCountery(city) {
  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=47ce15eac1b84dd7add223645241106&q=${city}&days=3`
    );
    if (!res.ok) throw new Error("No matching location found.");
    const data = await res.json();
    console.log(data);
    renderData(data);
  } catch (err) {
    errorData.classList.remove("d-none");
    errorData.querySelector("p").innerHTML = `${err.message}`;
  }
}

function renderData(data) {
  const dayDate = getDate(data.forecast.forecastday[0].date);
  const day2Date = getDate(data.forecast.forecastday[1].date);
  const day3Date = getDate(data.forecast.forecastday[2].date);

  const dayMonth = new Date(data.forecast.forecastday[0].date);
  const month = dayMonth
    .toDateString()
    .split(" ")
    .slice(1, 3)
    .reverse()
    .join(" ");
  // document.querySelector(".weather").innerHTML = " ";
  let html = " ";
  html += `
    <div class="container">
        <div class="row g-0 allsection">
          <div class="col-lg-4">
            <div class="weatherdetail bor">
              <div class="date d-flex justify-content-between py-2">
                <span class="px-3">${dayDate}</span>
                <span class="px-3">${month}</span>
              </div>
              <div class="px-3 py-4">
                <span class="fs-4 city">${data.location.name}</span>
                <h4 class="py-3 temp">${data.current.temp_c}<sup>o</sup>C</h4>
                <div>
                  <img
                    class="d-block w-25"
                    src="${data.current.condition.icon}"
                    loading="lazy"
                  />
                </div>
                <span class="stats">${data.current.condition.text}</span>
                <div class="d-flex py-2 content">
                  <div>
                    <img
                      src="Images/icon-umberella.png"
                      class=""
                      loading="lazy"
                    />
                    <span>20%</span>
                  </div>
                  <div>
                    <img src="Images/icon-wind.png" class="" loading="lazy" />
                    <span>18km/h </span>
                  </div>
                  <div>
                    <img
                      src="Images/icon-compass.png"
                      class=""
                      loading="lazy"
                    />
                    <span>East</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="weatherdetail two text-center h-100">
              <div class="date d-flex justify-content-center py-2">
                <span class="px-3">${day2Date}</span>
              </div>
              <div class="px-2 py-4">
                <div class="">
                  <img class="" src="${data.forecast.forecastday[1].day.condition.icon}" loading="lazy" />
                </div>
                <h3>${data.forecast.forecastday[1].day.maxtemp_c} <sup>o</sup>C</h3>
                <p class="small">${data.forecast.forecastday[1].day.mintemp_c}</p>
                <span class="stats">${data.forecast.forecastday[1].day.condition.text}</span>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="weatherdetail text-center h-100 bor2">
              <div class="date d-flex justify-content-center py-2">
                <span class="px-3">${day3Date}</span>
              </div>
              <div class="px-2 py-4">
                <div class="">
                  <img class="" src="${data.forecast.forecastday[2].day.condition.icon}" loading="lazy" />
                </div>
                <h3>${data.forecast.forecastday[2].day.maxtemp_c} <sup>o</sup>C</h3>
                <p class="small">${data.forecast.forecastday[2].day.mintemp_c}</p>
                <span class="stats">${data.forecast.forecastday[2].day.condition.text}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  
  `;
  //document.querySelector(".weather").insertAdjacentHTML("afterbegin", html);
  document.querySelector(".weather").innerHTML = html;
}

btnEnd.addEventListener("click", function () {
  errorData.classList.add("d-none");
  myinput.value = null;
});

function getDate(dates) {
  const date = new Date(dates);
  const day = date.getDay();
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = dayNames[day];
  return dayName;
}

(function myLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async function (postion) {
        const { latitude, longitude } = postion.coords; //latitude longitude coords
        try {
          const res = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=47ce15eac1b84dd7add223645241106&days=3&q=${latitude},${longitude}`
          );
          if (!res.ok) throw new Error("Problem with location ");

          const data = await res.json();
          renderData(data);
        } catch (err) {
          console.error(`${err.message}`);
        }
      },
      function () {
        getCountery("cairo");
      }
    );
  } else {
    alert("Your browser no location");
  }
})();
