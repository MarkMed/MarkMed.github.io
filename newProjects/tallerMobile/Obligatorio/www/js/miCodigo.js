window.addEventListener("load", function () {
  console.log("START!");
  let map;
  let userMovements = [
    {
      descripcion: "asdkajhdk jahmovimientooo 2",
      importe: 234,
      rubro: 6,
      medio: "Efectivo",
      fecha: "22/03/2023",
    },
    {
      descripcion: "gasto F xd",
      importe: 2234,
      rubro: 6,
      medio: "Efectivo",
      fecha: "23/03/2023",
    },
    {
      descripcion: "asdasaaaaaaaaaa PAGOOOO 2",
      importe: 50400,
      rubro: 8,
      medio: "Banco",
      fecha: "26/03/2023",
    },
  ];
  class Usuario {
    constructor(usuario, password, idDepartamento, idCiudad) {
      this.usuario = usuario;
      this.password = password;
      this.idDepartamento = idDepartamento;
      this.idCiudad = idCiudad;
    }
  }

  class Movimiento {
    constructor(idUsuario, concepto, categoria, total, medio, fecha) {
      this.idUsuario = idUsuario;
      this.concepto = concepto;
      this.categoria = categoria;
      this.total = total;
      this.medio = medio;
      this.fecha = fecha;
    }
  }
  const LS_STRING_LOGGED_USER = "isLoggedUser";
  const LS_STRING_USER_TOKEN = "userToken";
  const LS_STRING_USER_ID = "userId";
  const LS_STRING_RUBROS_LIST = "rubrosList";

  const env = {
    apiURL: "https://dwallet.develotion.com",
  };
  const nav = document.querySelector("ion-nav");
  const menu = document.querySelector("#menu");

  const modals = {
    modalIngreso: document.querySelector("#ingresoModal"),
    modalGasto: document.querySelector("#gastoModal"),
  };
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
    homeLoading: document.querySelector("#homeScreen div.loading"),
    mapLoading: document.querySelector("#mapScreen div.loading"),
  };
  const homeElem = {
    newMovementBtn: document.querySelector("#homeScreen #newMovement"),
    listAllMovements: document.querySelector("#homeScreen #allMovements"),
    listIncomeMovements: document.querySelector("#homeScreen #incomeMovements"),
    listExpensesMovements: document.querySelector(
      "#homeScreen #expensesMovements"
    ),
    segmentAll: document.querySelector("#homeScreen #segmentAll"),
    segmentExpenses: document.querySelector("#homeScreen #segmentExpenses"),
    segmentIncome: document.querySelector("#homeScreen #segmentIncome"),
    totalIncome: document.querySelector("#homeScreen #totalIncome"),
    totalExpenses: document.querySelector("#homeScreen #totalExpenses"),
    totalAvailable: document.querySelector("#homeScreen #totalAvailable"),
  };

  const gastoElems = {
    inputConcepto: document.querySelector("#homeScreen #conceptoGasto"),
    inputRubro: document.querySelector("#homeScreen #rubroGasto"),
    inputMedio: document.querySelector("#homeScreen #medioGasto"),
    inputImporte: document.querySelector("#homeScreen #importeGasto"),
    inputFecha: document.querySelector("#homeScreen #datetimeGasto"),
    registrarGastoBtn: document.querySelector("#homeScreen #registrarGasto"),
    cancelBtn: document.querySelector("#homeScreen #cancelGasto"),
  };
  const ingresoElems = {
    inputConcepto: document.querySelector("#homeScreen #conceptoIngreso"),
    inputRubro: document.querySelector("#homeScreen #rubroIngreso"),
    inputMedio: document.querySelector("#homeScreen #medioIngreso"),
    inputImporte: document.querySelector("#homeScreen #importeIngreso"),
    inputFecha: document.querySelector("#homeScreen #datetimeIngreso"),
    registrarIngresoBtn: document.querySelector(
      "#homeScreen #registrarIngreso"
    ),
    cancelBtn: document.querySelector("#homeScreen #cancelIngreso"),
  };

  // LS
  const saveInLocalStorage = (keyParam, valueParam) => {
    localStorage.setItem(keyParam, valueParam);
  };

  const getFromLocalStorage = (keyParam) => localStorage.getItem(keyParam);

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

    resetInputsMovimientos();
  };
  const resetInputsMovimientos = () => {
    ingresoElems.inputConcepto.value = "";
    // ingresoElems.inputFecha.value = new Date();
    ingresoElems.inputImporte.value = 0;
    ingresoElems.inputMedio.value = "";
    ingresoElems.inputRubro.value = "";

    gastoElems.inputConcepto.value = "";
    // gastoElems.inputFecha.value = new Date();
    gastoElems.inputImporte.value = 0;
    gastoElems.inputRubro.value = "";
    gastoElems.inputMedio.value = "";
  };

  const navigateTo = (screen) => {
    nav.push(screen);
  };

  const navegation = (event) => {
    const screen = event.detail.to;
    let msg = "";
    if (screen === "/login") {
      if (!isUserLogged()) {
        displaySection(screens.login);
        navigateTo("loginScreen");
      } else {
        msg = "Cierra sesión para iniciar con otro usuario";
        displaySection(screens.home);
        presentToast(msg, "top", "warning");
      }
    } else if (screen === "/logout") {
      if (isUserLogged()) {
        displaySection(screens.login);
      } else {
        msg = "Antes debes iniciar session!";
        displaySection(screens.login);
        // nav.popToRoot();
        presentToast(msg, "top", "warning");
      }
    } else if (screen === "/home") {
      if (isUserLogged()) {
        displaySection(screens.home);
        // hideAllLoadingScreens();
      } else {
        msg = "Antes debes iniciar session!";
        // displaySection(screens.login);
        navigateTo("loginScreen");
        // nav.popToRoot();
        presentToast(msg, "top", "warning");
      }
    } else if (screen === "/") {
      if (isUserLogged()) {
        displaySection(screens.home);
        hideAllLoadingScreens();
      } else {
        displaySection(screens.login);
      }
    } else if (screen === "/registration") {
      if (!isUserLogged()) {
        displaySection(screens.registration);
        registrationElem.inputCity.setAttribute("disabled", "true");
        loadDepartments();
      } else {
        msg = "Finaliza la sesión para registrar un nuevo usuario";
        displaySection(screens.home);
        presentToast(msg, "top", "warning");
        // hideAllLoadingScreens();
      }
    } else if (screen === "/map") {
      if (isUserLogged()) {
        displaySection(screens.map);
        if (!map) {
          initializeMap();
        }
      } else {
        msg = "Antes debes iniciar session!";
        displaySection(screens.login);
        //  nav.popToRoot();
        presentToast(msg, "top", "warning");
      }
      // } else {
      //   displaySection(screens.login);
      //   presentToast(msg, "top", "warning");
    }
  };

  const isUserLogged = () => {
    return (
      !!getFromLocalStorage(LS_STRING_LOGGED_USER) &&
      !!getFromLocalStorage(LS_STRING_USER_TOKEN)
    );
  };

  const closeModal = (modal) => {
    modal.dismiss();
  };

  const clearAppData = () => {
    if (isUserLogged) {
      localStorage.clear();
    }
    return false;
  };

  const hideAllLoadingScreens = () => {
    for (const elem in loadingElems) {
      loadingElems[elem].style.display = "none";
    }
  };

  const showLoadingScreen = (elem) => {
    elem.style.display = "";
  };

  const redirectLoginError = (errorText) => {
    navigateTo("loginScreen");
    presentToast(errorText, "top", "danger");
  };

  const loginApiReq = (user, pass) => {
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

        saveInLocalStorage(LS_STRING_LOGGED_USER, true);
        saveInLocalStorage(LS_STRING_USER_TOKEN, JSON.stringify(result.apiKey));
        saveInLocalStorage(LS_STRING_USER_ID, JSON.stringify(result.id));
        activateSession();
        presentToast(`Login success! Bienvenido/a ${user}`, "top", "success");
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

      loginApiReq(loginElem.inputUser.value, loginElem.inputPassword.value);
    } catch (error) {
      console.log(error);
      presentToast(`${error}`, "top", "danger");
    }
    return false;
  };

  const activateSession = () => {
    try {
      if (isUserLogged()) {
        menuOptionsToDisplay([
          menuOptions.home,
          menuOptions.map,
          menuOptions.logout,
        ]);
        // displaySection(homeDiv);
        navigateTo("homeScreen");
        resetInputs();
        loadRubros();
        switchListTo(homeElem.listAllMovements);
        setTimeout(function () {
          renderMovementsData(userMovements);
        }, 1000);
        setTimeout(function () {
          hideAllLoadingScreens();
        }, 1500);
        // getProducts();
        // displayProducts(products);
        return true;
      } else {
        throw new Error("Debes loggearte antes!");
      }
    } catch (errorParam) {
      console.log(errorParam);
      redirectLoginError(errorParam);
    }
  };
  const getUserToken = () =>
    JSON.parse(getFromLocalStorage(LS_STRING_USER_TOKEN));
  const getUserID = () => JSON.parse(getFromLocalStorage(LS_STRING_USER_ID));

  const logoutFunc = () => {
    if (!isUserLogged) {
      const msg = "There are no user logged in";
      presentToast(`${msg}`, "top", "warning");
      return false;
    }
    try {
      console.log("deslogueando...");
      const msg = "Has finalizado la session!";
      presentToast(`${msg}`, "top", "warning");
      clearAppData();
      // window.location.href = "./index.html"
      resetInputs();
      menuOptionsToDisplay([menuOptions.login, menuOptions.registration]);
      navigateTo("loginScreen");
      // nav.popToRoot();
      resetMap();
    } catch (error) {
      // console.log(error);
      presentToast(`${error}`, "top", "warning");

      console.log("UN ERROR: ", error);
    }
  };

  //Corrige el formato de fecha para que lo pueda recibir la API
  const parseDate = (fecha) =>
    `${fecha.getFullYear()}-${
      fecha.getMonth() + 1 < 10
        ? "0" + (fecha.getMonth() + 1)
        : fecha.getMonth() + 1
    }-${fecha.getDate() < 10 ? "0" + fecha.getDate() : fecha.getDate()}`;

  //crear objeto usuario con el valor de los inputs
  const createUser = () => {
    return new Usuario(
      registrationElem.inputUser.value,
      registrationElem.inputPassword.value,
      registrationElem.inputDpto.value,
      registrationElem.inputCity.value
    );
  };

  //crear gasto con el valor de los inputs
  const createGasto = () => {
    try {
      if (isUserLogged()) {
        throw new Error("Antes debes loggearte!");
      }
      let gastoDate = new Date(gastoElems.inputFecha.value);
      let fechaFormateada = parseDate(gastoDate);
      console.log(fechaFormateada);
      return new Movimiento(
        getUserID(),
        gastoElems.inputConcepto.value,
        gastoElems.inputRubro.value,
        gastoElems.inputImporte.value,
        gastoElems.inputMedio.value,
        fechaFormateada
      );
    } catch (errorParam) {
      console.log(errorParam);
      redirectLoginError(errorParam);
    }
  };

  //creo el ingreso con el valor de los inputs
  const createIngreso = () => {
    try {
      if (isUserLogged()) {
        throw new Error("Antes debes loggearte!");
      }
      let ingresoDate = new Date(ingresoElems.inputFecha.value);
      let fechaFormateada = parseDate(ingresoDate);
      console.log(fechaFormateada);
      return new Movimiento(
        getFromLocalStorage(LS_STRING_USER_ID),
        ingresoElems.inputConcepto.value,
        ingresoElems.inputRubro.value,
        ingresoElems.inputImporte.value,
        ingresoElems.inputMedio.value,
        fechaFormateada
      );
    } catch (errorParam) {
      console.log(errorParam);
      redirectLoginError(errorParam);
    }
  };
  // registro contra la API
  const registerApiReq = (user) => {
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
        if (result.codigo == "200") loginApiReq(user.usuario, user.password);
        if (result.codigo == "409")
          presentToast(`${result.mensaje}`, "top", "danger");
      })
      .catch((error) => console.log(error));
  };

  //agrego el movimiento contra la API
  const addMovimientoApi = (movimiento) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("apikey", getUserToken());

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(movimiento),
    };

    fetch(`${env.apiURL}/movimientos.php`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.codigo == "200") {
          presentToast(`${result.mensaje}`, "top", "success");
        } else {
          presentToast(`${result.mensaje}`, "top", "danger");
        }
      })
      .catch((error) => console.log("error", error));
  };
  const registerFunc = () => {
    try {
      let user = createUser();
      validateUser(user);
      registerApiReq(user);
    } catch (error) {
      console.log(error);
      presentToast(`${error}`, "top", "danger");
    }
  };

  //creo el gasto, valido y agrego el movimiento contra la api
  const addGastoFunc = () => {
    try {
      let gasto = createGasto();
      console.log(gasto);
      validateMovimiento(gasto);
      addMovimientoApi(gasto);
    } catch (error) {
      console.log(error);
      presentToast(`${error}`, "top", "danger");
    }
  };

  //creo el ingreso, valido y agrego el movimiento contra la api
  const addIngresoFunc = () => {
    try {
      let ingreso = createIngreso();
      console.log(ingreso);
      validateMovimiento(ingreso);
      addMovimientoApi(ingreso);
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

  // valido que los inputs no esten vacios
  const validateMovimiento = (movimiento) => {
    if (!movimiento.idUsuario) {
      throw new Error("Error al identificar al usuario");
    }
    if (!movimiento.concepto) {
      throw new Error("La descripcion no puede estar vacía");
    }
    if (!movimiento.categoria) {
      throw new Error("El rubro no puede estar vacío");
    }
    if (!movimiento.total) {
      throw new Error("El importe total no puede estar vacío");
    }
    if (!movimiento.medio) {
      throw new Error("El medio no puede estar vacío");
    }
    if (!movimiento.fecha) {
      throw new Error("La fecha no puede estar vacía");
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

  // obtener rubros para cargar select
  const getRubros = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("apikey", getUserToken());

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${env.apiURL}/rubros.php`, requestOptions)
      .then((response) => response.json())
      .then(function (resp) {
        console.log("rubros", JSON.stringify(resp.rubros));
        saveInLocalStorage(LS_STRING_RUBROS_LIST, JSON.stringify(resp.rubros));
        let i = 0;
        let card = "";
        while (i < resp.rubros.length) {
          if (resp.rubros[i].id < 7) {
            card =
              "<ion-select-option value='" +
              resp.rubros[i].id +
              "'>" +
              resp.rubros[i].nombre +
              "</ion-select-option>";
            gastoElems.inputRubro.innerHTML += card;
          } else {
            card =
              "<ion-select-option value='" +
              resp.rubros[i].id +
              "'>" +
              resp.rubros[i].nombre +
              "</ion-select-option>";
            ingresoElems.inputRubro.innerHTML += card;
          }

          i++;
        }
      })
      .catch((error) => console.log("error", error));
  };
  // cargo los rubros
  const loadRubros = () => {
    try {
      getRubros();
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

  // HOME
  // funcion para verificar si el movimiento es gasto
  const isGasto = (movimiento) => movimiento.rubro < 7;
  // const skeletonElems = (cant)=>{
  //   let skeletonResult = "";
  //   for (let i = 0; i < cant; i++) {
  //     skeletonElems += `<ion-skeleton-text animated="true" style="width: 100%;"></ion-skeleton-text>`
  //   }
  //   return skeletonResult
  // }
  const resetMovementsData = () => {
    homeElem.listAllMovements.innerHTML = "";
    homeElem.listExpensesMovements.innerHTML = "";
    homeElem.listIncomeMovements.innerHTML = "";
    homeElem.totalAvailable.innerHTML = "$";
    homeElem.totalExpenses.innerHTML = "$";
    homeElem.totalIncome.innerHTML = "$";
  };
  const renderMovementsData = (movementsParam) => {
    try {
      if (!isUserLogged()) {
        throw new Error("Antes debes loggearte!");
      }
      //miniFuncion para crear y devolver list item con datos
      const renderListItem = (data) => {
        return `<ion-item><ion-label>${data.descripcion}
        ${data.importe}
        ${data.rubro}
        ${data.medio}
        ${data.fecha}
        <ion-button>
          <ion-icon slot="icon-only" name="trash"></ion-icon>
        </ion-button>
        </ion-label></ion-item>`;
      };
      let total = {
        expenses: 0,
        available: 0,
        income: 0,
      };
      console.log("renderizando movimientos");
      resetMovementsData();
      for (const movimiento of movementsParam) {
        homeElem.listAllMovements.innerHTML += renderListItem(movimiento);
        if (isGasto(movimiento)) {
          homeElem.listExpensesMovements.innerHTML +=
            renderListItem(movimiento);
          total.expenses += movimiento.importe;
          total.available -= movimiento.importe;
        } else {
          homeElem.listIncomeMovements.innerHTML += renderListItem(movimiento);
          total.income += movimiento.importe;
          total.available += movimiento.importe;
        }
      }
      homeElem.totalAvailable.innerHTML += total.available;
      homeElem.totalExpenses.innerHTML += total.expenses;
      homeElem.totalIncome.innerHTML += total.income;
    } catch (errorParam) {
      console.log(errorParam);
      redirectLoginError(errorParam);
    }
  };
  const switchListTo = (listElem) => {
    console.log("cambiando a:", listElem);
    homeElem.listAllMovements.style.display = "none";
    homeElem.listIncomeMovements.style.display = "none";
    homeElem.listExpensesMovements.style.display = "none";
    listElem.style.display = "";
  };

  // MAP
  const resetMap = () => {
    if (map) {
      map.eachLayer(function (layer) {
        map.removeLayer(layer);
      });
      map.remove();
      map = undefined;
    }
    // map = null
  };
  const renderMap = () => {
    console.log("no hay mapa, renderizando uno nuevo");
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
    map.flyTo([lat, long], zoom);
  };
  const getMyUbication = async () => {
    const successCallback = (position) => {
      console.log("position", position);
      setMapUbication(position.coords.latitude, position.coords.longitude, 12);
    };
    const errorCallback = (error) => {
      console.log(error);
      presentToast(`No se ha podido acceder a su ubicación.`, "top", "danger");
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  };
  const initializeMap = () => {
    showLoadingScreen(loadingElems.mapLoading);
    setTimeout(function () {
      renderMap();
      setTimeout(() => {
        setMapUbication(-32.741082231501245, -55.98632812500001, 8);
        hideAllLoadingScreens();
        getMyUbication();
      }, 1000);
    }, 2000);
  };

  // INICIALIZACION DE LA APP
  clearAppData();
  menuOptionsToDisplay([menuOptions.login, menuOptions.registration]);
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

  ingresoElems.cancelBtn.addEventListener("click", () => {
    resetInputsMovimientos();
    closeModal(modals.modalIngreso);
  });
  gastoElems.cancelBtn.addEventListener("click", () => {
    resetInputsMovimientos();
    closeModal(modals.modalGasto);
  });
  loginElem.submitBtn.addEventListener("click", () => {
    loginFunc();
  });
  registrationElem.submitBtn.addEventListener("click", () => {
    registerFunc();
  });
  gastoElems.registrarGastoBtn.addEventListener("click", () => {
    addGastoFunc();
  });
  ingresoElems.registrarIngresoBtn.addEventListener("click", () => {
    addIngresoFunc();
  });
  registrationElem.inputDpto.addEventListener("ionChange", (e) => {
    console.log(e.target.value);
    registrationElem.inputCity.value = "";
    loadCitiesForDep(e.target.value);
    registrationElem.inputCity.setAttribute("disabled", "false");
  });
  homeElem.segmentAll.addEventListener("click", () => {
    switchListTo(homeElem.listAllMovements);
  });
  homeElem.segmentExpenses.addEventListener("click", () => {
    switchListTo(homeElem.listExpensesMovements);
  });
  homeElem.segmentIncome.addEventListener("click", () => {
    switchListTo(homeElem.listIncomeMovements);
  });
  // homeElem.newMovementBtn.addEventListener("click", e =>{
  //   console.log(e.target);
  //   selectNewMovement();
  // })
});

// Manejo de formato fecha para API
//`${miFecha.getFullYear()}-${(miFecha.getMonth()+1 < 10)?("0"+(miFecha.getMonth()+1)):(miFecha.getMonth()+1)}-${(miFecha.getDate() < 10)?("0"+(miFecha.getDate())):(miFecha.getDate())}`
