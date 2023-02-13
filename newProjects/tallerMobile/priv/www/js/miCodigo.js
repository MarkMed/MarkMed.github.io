const nav = document.querySelector("ion-nav");
// Sections
const menuDiv = document.querySelector("#menu");
const registerDiv = document.querySelector("#screen-registration");
const loginDiv = document.querySelector("#screen-login");
const homeDiv = document.querySelector("#screen-home");
const productosDiv = document.querySelector("div#inicio div#divProductos");
const detalleProdDiv = document.querySelector("div#detalleProducto");

// Menu Options
const menuOptHome = document.querySelector("#menu #homeBtn");
const menuOptLogin = document.querySelector("#menu #loginBtn");
const menuOptRegister = document.querySelector("#menu #registerBtn");
const menuOptLogout = document.querySelector("#menu #logoutBtn");

// INPUTS
//Registration
const rInputName = document.querySelector(
  "div#registro form#registerForm #nUserName"
);
const rInputLastName = document.querySelector(
  "div#registro form#registerForm #nUserLastName"
);
const rInputEmail = document.querySelector(
  "div#registro form#registerForm #nUserMail"
);
const rInputAddress = document.querySelector(
  "div#registro form#registerForm #nUserAddress"
);
const rInputPassword = document.querySelector(
  "div#registro form#registerForm #nUserPassword"
);
const rInputPasswordVerif = document.querySelector(
  "div#registro form#registerForm #nUserPasswordVerif"
);
//Login
const lInputEmail = document.querySelector(
  "div#login form#loginForm #userMail"
);
const lInputPassword = document.querySelector(
  "div#login form#loginForm #userPassword"
);
// Products Display
const tagFilterInput = productosDiv.querySelector("div#filtro #tagFilter");

// BUTTONS
// Registration
const registrationBtn = document.querySelector(
  "div#registro form#registerForm #submitBtn"
);
// Login
const loginBtn = document.querySelector(
  "div#login form#loginForm #loginBtn"
);

const backBtn_DetalleProducto = detalleProdDiv.querySelector("button.backBtn");

const buscarBtn = productosDiv.querySelector("div#filtro #buscar");
// const comprarBtn = detalleProdDiv.querySelector("button#comprarBtn");

// Feedback paragraph
// Registration
const rParagraph = document.querySelector(
  "div#registro #registrationFeedback"
);
// Login
const lParagraph = document.querySelector("div#login p#loginFeedback");
// home
const loggedUserParagraph = document.querySelector("div#inicio p#loggedUser");

const productListElem = productosDiv.querySelector("#productList");
const env = {
  apiURL: "https://ort-tallermoviles.herokuapp.com/api",
  imgURL: `https://ort-tallermoviles.herokuapp.com/assets/imgs/`,
};

let hayUsuarioLogueado = false;
let datosUsuarioLoggeado = null;
let products = [];
// let usuarios = [
//   {
//     name: "Marcos",
//     lastName: "Medina",
//     email: "mmeidna@mail.com",
//     address: "Pedrito 2532 apto 8",
//     pwd: "myPwd4",
//   },
//   {
//     name: "Pablo",
//     lastName: "Pereira",
//     email: "uru@mail.com",
//     address: "England 826 calle 4",
//     pwd: "uruChallenger20",
//   },
//   {
//     name: "Maria",
//     lastName: "Vazques",
//     email: "mvas@mail.com",
//     address: "direct 1628",
//     pwd: "maria1628",
//   },
//   {
//     name: "Juan",
//     lastName: "Hernandez",
//     email: "juanHer@mail.com",
//     address: "idKnow 426",
//     pwd: "juan426",
//   },
//   {
//     name: "Floppy",
//     lastName: "Romero",
//     email: "flopRom@mail.com",
//     address: "18 de Julio 2089",
//     pwd: "floppy2089",
//   },
// ]; // ?????

const displaySection = (sectionToDisplay) => {
  //multipleSectionToDisplay : HTMLElement

  // menuDiv.style.display = "none";
  registerDiv.style.display = "none";
  loginDiv.style.display = "none";
  homeDiv.style.display = "none";
  detalleProdDiv.style.display = "none";
  sectionToDisplay.style.display = "";
};

const displayMultipleSections = (multipleSectionToDisplay) => {
  //multipleSectionToDisplay : HTMLElement[]

  // menuDiv.style.display = "none";
  registerDiv.style.display = "none";
  loginDiv.style.display = "none";
  homeDiv.style.display = "none";
  detalleProdDiv.style.display = "none";
  for (const sectionToDisplay of multipleSectionToDisplay) {
    sectionToDisplay.style.display = "";
  }
};

const menuOptionsToDisplay = (optionsToDisplay) => {
  //optionsToDisplay : HTMLElement[]

  for (const optionToHide of document.querySelectorAll("#menu ion-item")) {
    optionToHide.style.display = "none";
  }
  for (const option of optionsToDisplay) {
    option.style.display = "";
  }
};

const resetInputs = () => {
  rInputAddress.value = "";
  rInputEmail.value = "";
  rInputLastName.value = "";
  rInputName.value = "";
  rInputPassword.value = "";
  rInputPasswordVerif.value = "";

  lInputEmail.value = "";
  lInputPassword.value = "";
};

const loginFunc = () => {
  try {
    // let usuarioEncontrado = false;
    if (isUserLogged()) {
      throw new Error("<b>Ya hay un usuario loggeado...</b>");
    }
    if (!lInputEmail.value || !lInputPassword.value) {
      throw new Error("<b>Ingrese todos los datos</b>");
    }

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      email: lInputEmail.value,
      password: lInputPassword.value,
    });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${env.apiURL}/usuarios/session`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.error) {
          throw new Error("Datos invalidos o No existe usuario");
        }

        localStorage.setItem("hayUsuarioLogueado", true);
        localStorage.setItem("userData", JSON.stringify(result.data));
        activateSession();
        presentToast(`Login success!`, "top", "success")
      })
      .catch((errorParam) => {
        // lParagraph.innerHTML = `${errorParam}`;
        presentToast( `${errorParam}`, "top", "danger")
        return false;
      });
  } catch (error) {
    console.log(error);
    lParagraph.innerHTML = `${error}`;
  }
  return false;
};

const logoutFunc = () => {
  if (!isUserLogged) {
    return false;
  }
  try {
    // hayUsuarioLogueado = false;
    // datosUsuarioLoggeado = null;
    clearAppData();
    loggedUserParagraph.innerHTML = "";
    displaySection(loginDiv);
    menuOptionsToDisplay([menuOptLogin, menuOptRegister]);
    navigateTo("screen-login");
    nav.popToRoot();
  } catch (error) {
    console.log(error);
  }
};

const registerNewUser = () => {
  try {
    if (isUserLogged()) {
      throw new Error("<b>Ya hay un usuario Loggeado</b>");
    }
    if (
      rInputAddress.value &&
      rInputEmail.value &&
      rInputLastName.value &&
      rInputName.value &&
      rInputPassword.value &&
      rInputPasswordVerif.value
    ) {
      if (rInputPassword.value === rInputPasswordVerif.value) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
          nombre: rInputName.value,
          apellido: rInputLastName.value,
          email: rInputEmail.value,
          direccion: rInputAddress.value,
          password: rInputPassword.value,
        });

        let requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(`${env.apiURL}/usuarios`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            if (result.error) {
              throw new Error(result.error);
            }
            // lParagraph.innerHTML = `Se ha registrado correctamente. Puedes loggearte!`;
            resetInputs();
            displaySection(loginDiv);
            presentToast(`Se ha registrado correctamente. Puedes loggearte!`, "top", "success")
          })
          .catch((errorParam) => {
            rParagraph.innerHTML = `${errorParam}`;
            return false;
          });

        // `${env.imgURL}/${idProducto}.jpg`
      } else {
        throw new Error("Las contraseñas deben ser iguales!");
      }
    } else {
      throw new Error("Ingrese todos los datos");
    }
  } catch (error) {
    // rParagraph.innerHTML = `${error}`;
    console.log(error)
    presentToast(`${error}`, "top", "danger")
  }
};

const isUserLogged = () => {
  return (
    !!localStorage.getItem("hayUsuarioLogueado") &&
    !!localStorage.getItem("userData")
  );
};

const clearAppData = () => {
  if (isUserLogged) {
    localStorage.clear();
  }
  return false;
};

const activateSession = () => {
  try {
    if (isUserLogged) {
      menuOptionsToDisplay([menuOptHome, menuOptLogout]);
      displaySection(homeDiv);
      loggedUserParagraph.innerHTML = `Welcome, ${getUserData().nombre}`;
      resetInputs();
      getProducts();
      // displayProducts(products);
      navigateTo("screen-home");
      return true;
    } else {
      throw new Error("<b>Debes loggearte antes!</b>");
    }
  } catch (error) {
    console.log(error);
    redirectLoginError(error);
  }
};

const getUserData = () => {
  return JSON.parse(localStorage.getItem("userData"));
};

const getProducts = () => {
  try {
    if (!isUserLogged()) {
      throw new Error("<b>Debes loggearte antes!</b>");
    }
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-auth", getUserToken());

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${env.apiURL}/productos`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        products = result.data;
        displayProducts(result.data);
      })
      .catch((error) => console.log("error", error));
  } catch (error) {
    redirectLoginError(error);
  }
};

const getUserToken = () => {
  return getUserData().token;
};

const redirectLoginError = (errorText) => {
  displaySection(loginDiv);
  lParagraph.innerHTML = `${errorText}`;
};

const displayProducts = (productListParam) => {
  // productListParam: obj[]
  productListElem.innerHTML = "";
  for (const product of productListParam) {
    // getProductInfo(product)
    let tags = "";
    for (const tag of product.etiquetas) {
      tags += `${tag}, `;
    }
    const listItem = `
    <ion-item>
        <div class="imgContainer">
          <img src="${env.imgURL}${product.urlImagen}.jpg"/>
        </div>
        <div class="dataContainer">
        
          <ion-label>
            <h2>${product.nombre}</h2>
            <p>${product.codigo} | <b>$ ${product.precio}</b></p>
          </ion-label>
          <p>Estado:${product.estado} | etiquetas: <i>${tags}</i></p>
          <a class="detailProduct" href="#${product._id}">Ver más</a>
        </div>
        <br/>
    </ion-item>
    `;
    productListElem.innerHTML += listItem;
    for (const myBtn of document.querySelectorAll("#productList ion-item a")) {
      myBtn.addEventListener("click", async (ev) => {
        ev.preventDefault();
        displaySection(detalleProdDiv);
        const productIdHref = ev.target.getAttribute("href");
        const allProductData = await getProductInfo(
          productIdHref.slice(1, productIdHref.length)
        );
        displayProductDetail(allProductData);
      });
    }
  }
};

//llamada a la API para obtener el detalle del producto
const getProductInfo = (productIdParam) => {
  try {
    if (!isUserLogged()) {
      throw new Error("<b>Debes loggearte antes!</b>");
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-auth", getUserToken());

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    return fetch(`${env.apiURL}/productos/${productIdParam}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("detalle de producto> ", result.data);
        // displayDetailProduct(result.data);
        return result.data;
      })
      .catch((error) => console.log("error", error));
  } catch (error) {
    console.log(error);
  }
};

//mostrar la informacion del producto
const displayProductDetail = (productDataParam) => {
  const agregarBotonCompra = () => {
    // creo nuevo boton para compra
    let buyBtn = document.createElement("button");
    let botonCompra = document.getElementById("comprarBtn");
    if (!!botonCompra) {
      botonCompra.remove();
    }
    buyBtn.setAttribute("id", "comprarBtn");
    buyBtn.innerHTML = "Comprar";
    if (productDataParam.estado === "en stock") {
      buyBtn.addEventListener("click", () => {
        buyFunction(productDataParam);
      });
    } else {
      buyBtn.setAttribute("disabled", "true");
    }
    detalleProdDiv.appendChild(buyBtn);
  };
  // detalleProdDiv.innerHTML = "Nombre de producto: "+productDataParam.nombre
  detalleProdDiv
    .querySelector("div.imgContainer img")
    .setAttribute("src", `${env.imgURL}${productDataParam.urlImagen}.jpg`);

  detalleProdDiv.querySelector("div.dataContainer b#productName").innerHTML =
    productDataParam.nombre;
  detalleProdDiv.querySelector(
    "div.dataContainer p#productDescription"
  ).innerHTML = "Descripción: " + productDataParam.descripcion;
  detalleProdDiv.querySelector("div.dataContainer p#productCode").innerHTML =
    "Codigo: " + productDataParam.codigo;
  detalleProdDiv.querySelector("div.dataContainer p#productPrice").innerHTML =
    "Precio: $" + productDataParam.precio;
  detalleProdDiv.querySelector("div.dataContainer p#productStatus").innerHTML =
    "Estado: " + productDataParam.estado;
  detalleProdDiv.querySelector("div.dataContainer p#productRanking").innerHTML =
    "Puntaje: " + productDataParam.puntaje + " Estrella/s";

  let tags = "";
  for (const tag of productDataParam.etiquetas) {
    tags += `${tag}, `;
  }
  detalleProdDiv.querySelector("div.dataContainer i#productTags").innerHTML =
    "Etiquetas: " + tags;

  agregarBotonCompra();
};

const filtrarTags = (textParam) => {
  if (textParam) {
    // console.log(textParam);
    const productsFiltrados = [];
    for (const product of products) {
      for (const tag of product.etiquetas) {
        if (tag.includes(textParam)) {
          if (!productsFiltrados.includes(product)) {
            productsFiltrados.push(product);
          }
        }
      }
    }
    displayProducts(productsFiltrados);
  } else {
    displayProducts(products);
  }
};

const buyFunction = (productParam) => {
  if (productParam.estado === "en stock") {
    // listaDeCompras.push(productParam)
    console.log("Compraste :" + productParam.nombre);
  } else {
    console.log("NO HAY STOCK!!!");
  }
};

const navigateTo = (screen) => {
  nav.push(screen);
};
const navegation = (event) => {
  const screen = event.detail.to;
  if (
    screen === "/screen-login" ||
    screen === "/screen-logout" ||
    screen === "/"
  ) {
    displaySection(loginDiv);
  } else if (screen === "/home") {
    displaySection(homeDiv);
  } else if (screen === "/registro") {
    displaySection(registerDiv);
  }
};

const presentToast = (msgParam, positionParam, status) => {
  const toast = document.createElement('ion-toast');
  toast.header = msgParam;
  // toast.message = 'Click to Close';
  toast.position = positionParam;
  toast.color = status;
  toast.duration = 2000;
  toast.buttons = [
      // {
      //     side: 'start',
      //     icon: 'star',
      //     text: 'Favorite',
      //     handler: () => {
      //         console.log('Favorite clicked');
      //     }
      // },
      {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
              console.log('Toast Closed');
          }
      }
  ];

  document.body.appendChild(toast);
  return toast.present();
}
function inicializar() {
  //Router
  document
    .querySelector("#router")
    .addEventListener("ionRouteDidChange", navegation);

  console.log("APP RUNNING");
  /* Ejercicio 5 */
  // 1
  // displaySection(loginDiv);

  // 2
  menuOptionsToDisplay([menuOptLogin, menuOptRegister]);

  // 3
  menuOptHome.addEventListener("click", () => {
    displaySection(homeDiv);
    menuDiv.close();
  });
  menuOptLogin.addEventListener("click", () => {
    displaySection(loginDiv);
    menuDiv.close();
  });
  menuOptRegister.addEventListener("click", () => {
    displaySection(registerDiv);
    menuDiv.close();
  });
  menuOptLogout.addEventListener("click", () => {
    displaySection(loginDiv);
    menuDiv.close();
  });

  // Ejercicio 7
  loginBtn.addEventListener("click", (ev) => {
    ev.preventDefault();
    loginFunc();
  });
  menuOptLogout.addEventListener("click", (ev) => {
    ev.preventDefault();
    logoutFunc();
  });
  registrationBtn.addEventListener("click", (ev) => {
    ev.preventDefault();
    registerNewUser();
  });
  backBtn_DetalleProducto.addEventListener("click", () => {
    displaySection(homeDiv);
  });

  buscarBtn.addEventListener("click", (ev) => {
    ev.preventDefault();
    filtrarTags(tagFilterInput.value);
  });

  logoutFunc();
}

inicializar();
