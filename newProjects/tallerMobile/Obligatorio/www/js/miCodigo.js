document.addEventListener("DOMContentLoaded", function () {
  console.log("START!")
  const LH_STRING_LOGGED_USER = "isLoggedUser";
  const LH_STRING_USER_DATA = "userData"
  const env = {
    apiURL: "https://dwallet.develotion.com"
  };
  const nav = document.querySelector("ion-nav");
  const menu = document.querySelector("#menu");

  const screens = {
    login: document.querySelector("#loginScreen"),
    registration: document.querySelector("#registrationScreen"),
    home: document.querySelector("#homeScreen"),
    map: document.querySelector("#mapScreen")
  }
  const menuOptions = {
    login: document.querySelector("#loginMenuBtn"),
    registration: document.querySelector("#registerMenuBtn"),
    home: document.querySelector("#homeMenuBtn"),
    logout: document.querySelector("#logoutMenuBtn"),
    map: document.querySelector("#mapMenuBtn"),
  }
  const registrationElem = {
    inputUser: document.querySelector("#registrationScreen #nUser"),
    inputDpto: document.querySelector("#registrationScreen #nDepartamento"),
    inputCity: document.querySelector("#registrationScreen #nCiudad"),
    inputPassword: document.querySelector("#registrationScreen #nPassword"),
    inputPasswordVerif: document.querySelector("#registrationScreen #nPasswordVerif"),
    submitBtn: document.querySelector("#registrationScreen #registrationBtn"),
  }
  const loginElem = {
    inputUser: document.querySelector("#loginScreen #loginUser"),
    inputPassword: document.querySelector("#loginScreen #loginPassword"),
    submitBtn: document.querySelector("#loginScreen #loginBtn"),

  }


  const presentToast = (msgParam, positionParam, status) => {
    const toast = document.createElement("ion-toast");
    toast.header = msgParam;
    toast.position = positionParam;
    toast.color = status;
    toast.duration = 2000;
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
    if (
      screen === "/login" ||
      screen === "/logout" ||
      screen === "/"
    ) {
      displaySection(screens.login);
    } else if (screen === "/home") {
      displaySection(screens.home);
    } else if (screen === "/registration") {
      displaySection(screens.registration);
    } else if (screen === "/map") {
      displaySection(screens.map);
    }
  };

  const isUserLogged = () => {
    return (
      !!localStorage.getItem(LH_STRING_LOGGED_USER) &&
      !!localStorage.getItem(LH_STRING_USER_DATA)
    );
  };

  const clearAppData = () => {
    if (isUserLogged) {
      localStorage.clear();
    }
    return false;
  };
  
  const redirectLoginError = (errorText) => {
    navigateTo("loginScreen");
    presentToast(errorText, "top", "danger")
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
  
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
  
      let raw = JSON.stringify({
        email: loginElem.inputUser.value,
        password: loginElem.inputPassword.value,
      });
      console.log(raw)
  
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
          localStorage.setItem(LH_STRING_USER_DATA, JSON.stringify(result.data));
          activateSession();
          presentToast(`Login success!`, "top", "success")
        })
        .catch((errorParam) => {
          presentToast( `${errorParam}`, "top", "danger")
          return false;
        });
    } catch (error) {
      console.log(error);
      presentToast( `${error}`, "top", "danger")
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

  const logoutFunc = () => {
    if (!isUserLogged) {
      const msg = "There are no user logged in"
      presentToast( `${msg}`, "top", "warning")
      return false;
    }
    try {
      clearAppData();
      // window.location.href = "./index.html"
      resetInputs()
      menuOptionsToDisplay([menuOptions.login, menuOptions.registration]);
      navigateTo("loginScreen");
      nav.popToRoot();
    } catch (error) {
      // console.log(error);
      presentToast( `${error}`, "top", "warning")
    }
  };





  // menuOptionsToDisplay([menuOptions.login, menuOptions.registration]);
  //Router
  document
  .querySelector("#router")
  .addEventListener("ionRouteDidChange", navegation);

  menuOptions.logout.addEventListener("click", ()=>{
    logoutFunc()
  })
  // Set close behavior when click a menu opt
  for (const elem in menuOptions) {
    if (Object.hasOwnProperty.call(menuOptions, elem)) {
      const element = menuOptions[elem];
      element.addEventListener("click", ()=>{
        menu.close();
      })
    }
  }
  loginElem.submitBtn.addEventListener("click", ()=>{
    loginFunc()
  })
});
