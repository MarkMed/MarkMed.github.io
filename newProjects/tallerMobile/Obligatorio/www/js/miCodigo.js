window.addEventListener("load", function () {
  console.log("START!");
  let map
  class Usuario {
    constructor(usuario, password, idDepartamento, idCiudad) {
      this.usuario = usuario;
      this.password = password;
      this.idDepartamento = idDepartamento;
      this.idCiudad = idCiudad;
    }
  }
  const LH_STRING_LOGGED_USER = "isLoggedUser";
  const LH_STRING_USER_TOKEN = "userToken";
  const env = {
    apiURL: "https://dwallet.develotion.com",
  };
  const nav = document.querySelector("ion-nav");
  const menu = document.querySelector("#menu");

  const screens = {
    login: document.querySelector("#loginScreen"),
    registration: document.querySelector("#registrationScreen"),
    home: document.querySelector("#homeScreen"),
    map: document.querySelector("#mapScreen"),
  };
  const menuOptions = {
    login: document.querySelector("#loginMenuBtn"),
    registration: document.querySelector("#registerMenuBtn"),
    home: document.querySelector("#homeMenuBtn"),
    logout: document.querySelector("#logoutMenuBtn"),
    map: document.querySelector("#mapMenuBtn"),
  };
  const registrationElem = {
    inputUser: document.querySelector("#registrationScreen #nUser"),
    inputDpto: document.querySelector("#registrationScreen #nDepartamento"),
    inputCity: document.querySelector("#registrationScreen #nCiudad"),
    inputPassword: document.querySelector("#registrationScreen #nPassword"),
    inputPasswordVerif: document.querySelector(
      "#registrationScreen #nPasswordVerif"
    ),
    submitBtn: document.querySelector("#registrationScreen #registrationBtn"),
  };
  const loginElem = {
    inputUser: document.querySelector("#loginScreen #loginUser"),
    inputPassword: document.querySelector("#loginScreen #loginPassword"),
    submitBtn: document.querySelector("#loginScreen #loginBtn"),
  };
  const loadingElems = {
    mapLoading: document.querySelector("#mapScreen div.loading"),
  }


  const presentToast = (msgParam, positionParam, status) => {
    const toast = document.createElement("ion-toast");
    toast.header = msgParam;
    toast.position = positionParam;
    toast.color = status;
    toast.duration = 3000;
    toast.buttons = [
      {
        text: "Ok",
        role: "cancel",
        handler: () => {
          console.log("Toast Closed");
        },
      },
    ];

    document.body.appendChild(toast);
    return toast.present();
  };

  const displaySection = (sectionToDisplay) => {
    screens.login.style.display = "none";
    screens.registration.style.display = "none";
    screens.home.style.display = "none";
    screens.map.style.display = "none";
    sectionToDisplay.style.display = "";
  };

  const menuOptionsToDisplay = (optionsToDisplay) => {
    //optionsToDisplay : HTMLElement[]
    for (const elem in menuOptions) {
      menuOptions[elem].style.display = "none";
    }
    for (const option of optionsToDisplay) {
      option.style.display = "";
    }
  };

  const resetInputs = () => {
    loginElem.inputPassword.value = "";
    loginElem.inputUser.value = "";
    registrationElem.inputUser.value = "";
    registrationElem.inputCity.value = "";
    registrationElem.inputDpto.value = "";
    registrationElem.inputPassword.value = "";
    registrationElem.inputPasswordVerif.value = "";
  };

  const navigateTo = (screen) => {
    nav.push(screen);
  };

  const navegation = (event) => {
    const screen = event.detail.to;
    if (screen === "/login" || screen === "/logout" || screen === "/") {
      displaySection(screens.login);
    } else if (screen === "/home") {
      displaySection(screens.home);
    } else if (screen === "/registration") {
      displaySection(screens.registration);
      loadDepartments();
    } else if (screen === "/map") {
      displaySection(screens.map);
      initializeMap();
    }
  };

  const isUserLogged = () => {
    return (
      !!localStorage.getItem(LH_STRING_LOGGED_USER) &&
      !!localStorage.getItem(LH_STRING_USER_TOKEN)
    );
  };

  const clearAppData = () => {
    if (isUserLogged) {
      localStorage.clear();
    }
    return false;
  };

  const hideAllLoadingScreens = () => {
    for (const elem in loadingElems) {
      loadingElems[elem].style.display = "none"
    }
  }

  const redirectLoginError = (errorText) => {
    navigateTo("loginScreen");
    presentToast(errorText, "top", "danger");
  };

  const loginAPI = (user, pass) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      usuario: user,
      password: pass,
    });
    console.log(raw);

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${env.apiURL}/login.php`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.mensaje) {
          throw new Error("Datos invalidos o No existe usuario");
        }

        localStorage.setItem(LH_STRING_LOGGED_USER, true);
        localStorage.setItem(LH_STRING_USER_TOKEN, JSON.stringify(result.apiKey)); // HACER PREGUNTA!
        activateSession();
        presentToast(`Login success!`, "top", "success");
      })
      .catch((errorParam) => {
        presentToast(`${errorParam}`, "top", "danger");
        return false;
      });
  };
  const loginFunc = () => {
    try {
      // let usuarioEncontrado = false;
      if (isUserLogged()) {
        throw new Error("Ya hay un usuario loggeado...");
      }
      if (!loginElem.inputUser.value || !loginElem.inputPassword.value) {
        throw new Error("Ingrese todos los datos");
      }

      loginAPI(loginElem.inputUser.value, loginElem.inputPassword.value);
    } catch (error) {
      console.log(error);
      presentToast(`${error}`, "top", "danger");
    }
    return false;
  };

  const activateSession = () => {
    try {
      if (isUserLogged()) {
        menuOptionsToDisplay([menuOptions.home, menuOptions.logout]);
        // displaySection(homeDiv);
        resetInputs();
        // getProducts();
        // displayProducts(products);
        navigateTo("homeScreen");
        return true;
      } else {
        throw new Error("Debes loggearte antes!");
      }
    } catch (errorParam) {
      console.log(errorParam);
      redirectLoginError(errorParam);
    }
  };
  const getUserToken = () => JSON.parse(localStorage.getItem("userData"));

  const logoutFunc = () => {
    if (!isUserLogged) {
      const msg = "There are no user logged in";
      presentToast(`${msg}`, "top", "warning");
      return false;
    }
    try {
      const msg = "Has finalizado la session. Adiós ";
      presentToast(`${msg}`, "top", "warning");
      clearAppData();
      // window.location.href = "./index.html"
      resetInputs();
      menuOptionsToDisplay([menuOptions.login, menuOptions.registration]);
      navigateTo("loginScreen");
      nav.popToRoot();
    } catch (error) {
      // console.log(error);
      presentToast(`${error}`, "top", "warning");
    }
  };

  //crear objeto usuario con el valor de los inputs
  const createUser = () => {
    return new Usuario(
      registrationElem.inputUser.value,
      registrationElem.inputPassword.value,
      registrationElem.inputDpto.value,
      registrationElem.inputCity.value
    );
  };
  // registro contra la API
  const registerAPI = (user) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(user),
    };

    fetch(`${env.apiURL}/usuarios.php`, requestOptions)
      .then((resp) => resp.json())
      .then((result) => {
        console.log(result);
        //si todo da bien lo auto-loguea
        if (result.codigo == "200") loginAPI(user.usuario, user.password);
        if (result.codigo == "409")
          presentToast(`${result.mensaje}`, "top", "danger");
      })
      .catch((error) => console.log(error));
  };

  const registerFunc = () => {
    try {
      let user = createUser();
      validateUser(user);
      registerAPI(user);
    } catch (error) {
      console.log(error);
      presentToast(`${error}`, "top", "danger");
    }
  };

  //validar usuario que llega por parametro
  const validateUser = (user) => {
    if (!user.usuario) {
      throw new Error("El usuario no puede estar vacío");
    }
    if (!user.idDepartamento) {
      throw new Error("El departamento no puede estar vacío");
    }
    if (!user.idCiudad) {
      throw new Error("La ciudad no puede estar vacía");
    }
    if (
      !user.password ||
      user.password.trim().length < 8 ||
      user.password.trim().length > 20
    ) {
      throw new Error(
        "La contraseña es obligatorio y debe tener entre ocho y veinte caracteres"
      );
    }
    if (
      user.password.trim() != registrationElem.inputPasswordVerif.value.trim()
    ) {
      throw new Error("Las contraseñas no coinciden");
    }
  };

  // obtener departamentos para cargar el select de registro
  const getDepartments = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${env.apiURL}/departamentos.php`, requestOptions)
      .then((response) => response.json())
      .then(function (resp) {
        let i = 0;
        let card = "";
        while (i < resp.departamentos.length) {
          card +=
            "<ion-select-option value='" +
            resp.departamentos[i].id +
            "'>" +
            resp.departamentos[i].nombre +
            "</ion-select-option>";
          i++;
        }
        registrationElem.inputDpto.innerHTML = card;
      })
      .catch((error) => console.log("error", error));
  };

  // cargo el select de departamentos
  const loadDepartments = () => {
    try {
      getDepartments();
    } catch (error) {
      console.log(error.message);
    }
  };

  // obtener ciudades para un departamento por parametro
  const getCitiesForDep = (idDep) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${env.apiURL}/ciudades.php?idDepartamento=${idDep}`, requestOptions)
      .then((response) => response.json())
      .then(function (resp) {
        let i = 0;
        let card = "";
        while (i < resp.ciudades.length) {
          card +=
            "<ion-select-option value='" +
            resp.ciudades[i].id +
            "'>" +
            resp.ciudades[i].nombre +
            "</ion-select-option>";
          i++;
        }
        registrationElem.inputCity.innerHTML = card;
      })
      .catch((error) => console.log("error", error));
  };

  // cargo el select de ciudades
  const loadCitiesForDep = (idDep) => {
    try {
      getCitiesForDep(idDep);
    } catch (error) {
      console.log(error.message);
    }
  };

  // MAP
  const renderMap = () => {
    map = L.map("map", {
      center: [-32.741082231501245, -55.98632812500001],
      zoom: 3,
    });
    const mapLayer = L.tileLayer(
      "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 19,
      }
    );
    mapLayer.addTo(map);
  };
  const setMapUbication = (lat, long, zoom) => {
    map.flyTo([lat, long], zoom)
  }
  const getMyUbication = async () => {
    const successCallback = (position) => {
      console.log("position", position)
      setMapUbication(position.coords.latitude, position.coords.longitude, 12)
    };
    
    const errorCallback = (error) => {
      console.log(error);
      presentToast(`No se ha podido acceder a su ubicación.`, "top", "danger");
    };
    
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }
  const initializeMap = () => {
    setTimeout(function () {
      renderMap();
      setTimeout(() => {
        setMapUbication(-32.741082231501245, -55.98632812500001, 8);
        hideAllLoadingScreens()
        getMyUbication();
      }, 1000);
    }, 2000);
  }

  // menuOptionsToDisplay([menuOptions.login, menuOptions.registration]);
  //Router
  document
    .querySelector("#router")
    .addEventListener("ionRouteDidChange", navegation);

  menuOptions.logout.addEventListener("click", () => {
    logoutFunc();
  });
  // Set close behavior when click a menu opt
  for (const elem in menuOptions) {
    if (Object.hasOwnProperty.call(menuOptions, elem)) {
      const element = menuOptions[elem];
      element.addEventListener("click", () => {
        menu.close();
      });
    }
  }
  loginElem.submitBtn.addEventListener("click", () => {
    loginFunc();
  });
  registrationElem.submitBtn.addEventListener("click", () => {
    registerFunc();
  });
  registrationElem.inputDpto.addEventListener("ionChange", (e) => {
    console.log(e.target.value);
    loadCitiesForDep(e.target.value);
  });

});
