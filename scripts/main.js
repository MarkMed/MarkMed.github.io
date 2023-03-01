document.addEventListener("DOMContentLoaded", function () {
  const SIDENAV_DURATION = 300;
  const rootUrl = window.location.href.split("/index.html")[0]
  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems, { outDuration: SIDENAV_DURATION });
  let moreOptionBtn = document.getElementById("moreOptions");
  let sidenavOptions = document.getElementsByClassName("sidenavOption");
  const openSidenav = (sidenavToOpen) => {
    sidenavToOpen.open();
  };
  const closeSidenav = (sidenavToOpen) => {
    sidenavToOpen.close();
  };
  const openMainSidenav = () => {
    openSidenav(instances[0]);
  };
  const closeMainSidenav = () => {
    setTimeout(() => {
      closeSidenav(instances[0]);
    }, SIDENAV_DURATION);
  };

  moreOptionBtn.addEventListener("click", openMainSidenav);
  for (const elemOption of sidenavOptions) {
    elemOption.addEventListener("click", closeMainSidenav);
  }

  // STACKWOVERGOD!
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  async function fetchData(url) {
    try {
      console.log("tru to fetch data from: ", url)
      let reqHeaders = new Headers();
      reqHeaders.append("Content-Type", "application/json");

      let requestOptions = {
        method: "GET",
        headers: reqHeaders,
        // mode: 'no-cors'
      };
      return fetch(`${url}`, requestOptions)
        .then((response) => {
          console.log("fetch 1st response: ", response);
          return response.json()
        })
        .then((result) => {
          console.log("fetch response: ", result);
          return result
        })
        .catch((error) => console.log("error", error));

      // for (const cajero of cajeros) {
      //   L.marker([cajero.latitud, cajero.longitud])
      //   .addTo(map)
      //   .bindPopup(
      //     `Disponibilidad Dinero: ${(cajero.disponible)?("Si"):("No")}, Recibe depositos: ${(cajero.depositos)?("Si"):("No")}`
      //   );

      // }
    } catch (err) {
      console.log("ERROR", err);
    }
  }

  async function jsonTest() {
    console.log("RUNNING JSONTEST");
    let data = "";
    try {
      data = await fetchData(rootUrl+"/scripts/data.json");
      // data = await fetchData("../scripts/data.json");
      // data = await fetchData("https://dwallet.develotion.com/ciudades.php?idDepartamento=3218");
      console.log("data", data)
    } catch (err) {
      console.log("ERROR", err);
    }
  }
  jsonTest();
});
