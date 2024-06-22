var myFile;
document.addEventListener("DOMContentLoaded", function () {
  const SIDENAV_DURATION = 300;
  const rootUrl = window.location.href.split("/index.html")[0];
  let elems = document.querySelectorAll(".sidenav");
  let instances = M.Sidenav.init(elems, { outDuration: SIDENAV_DURATION });
  let moreOptionBtn = document.getElementById("moreOptions");
  let sidenavOptions = document.getElementsByClassName("sidenavOption");
  let skillsModeCheckbox = document.getElementById("skillsModeCheckbox");
  let data;
  const htmlElems = {
    techList1: document.getElementById("techList1"),
    techList2: document.getElementById("techList2"),
    seeMoreBtns: {
      aboutMe: document.getElementById("seeMoreToggle_aboutMe")
    },
    hiddenElems: {
      aboutMeParagraph: document.querySelectorAll("section#aboutMe div.itemContainer article p")[document.querySelectorAll("section#aboutMe div.itemContainer article p").length-1],
      techList2: document.getElementById("techList2")
    }
  };
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

  const fetchData = async (url) => {
    try {
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
          return response.json();
        })
        .then((result) => {
          console.log("fetch response: ", result);
          myFile = result;
          return result;
        })
        .catch((error) => console.log("errror", error));
    } catch (err) {
      console.log("ERROR", err);
    }
  };
  const loadData = async () => {
    const renderLiElems = (stars, tech) => {
      return `
        <li class="flex-row flex-justify-start flex-alignItems-start fontNormalSize">
				  <div class="starsContainer flex-row flex-justify-end flex-alignItems-center">
						<mkm-star-rating current-rate="${stars}" stars-color="rgba(96, 125, 139,1)">
						</mkm-star-rating>
					</div>
					<p>${tech}</p>
				</li>
      `;
    };
    const loadSkills = () => {
      let totalTechs = 0;
      let loadedTechs = 0;
      htmlElems.techList1.innerHTML = "";
      htmlElems.techList2.innerHTML = "";
      for (const stars of data["skills"]) {
        for (let i = 0; i < stars["techs"].length; i++) {
          totalTechs++;
        }
      }
      for (const stars of data["skills"]) {
        for (let i = 0; i < stars["techs"].length; i++) {
          const listNumber = (loadedTechs > (totalTechs / 2)-1) + 1; // xd
          console.log(stars["techs"][i],"listNumber", listNumber)
          const li = renderLiElems(stars["stars"], stars["techs"][i]);
          htmlElems[`techList${listNumber}`].innerHTML += li;
          loadedTechs++;
        }
      }
      console.log("totalTechs", totalTechs);
    };
    data = await fetchData(rootUrl + "/assets/data.json");
    console.log(data["skills"]);
    loadSkills();
    // htmlElems.techList.innerHTML = "";
  };
  const displayElement = (elem) => {
    elem.style.display = ""
  }
  const hideElement = (elem) => {
    elem.style.display = "none"
  }

  const toggleSeeMore = (triggerBtn, contentToToggle)=>{
    const isDisplayed = triggerBtn.getAttribute("data-display")-1+1;
    if(isDisplayed){
      hideElement(contentToToggle)
      triggerBtn.setAttribute("data-display", isDisplayed-1)
      triggerBtn.innerHTML = "More About Me"
    } else {
      displayElement(contentToToggle)
      triggerBtn.setAttribute("data-display", isDisplayed+1)
      triggerBtn.innerHTML = "Hide this info"
    }
  }

  const toggleSkillsViewMode = ()=>{

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
  skillsModeCheckbox.addEventListener("change", ()=>{
    let skillsSummary = document.getElementById("skillsSummary");
    let rateMode = document.getElementById("rateMode");
    if(skillsModeCheckbox.checked){
      skillsSummary.classList.add("hiddenContent")
      rateMode.classList.remove("hiddenContent")
    } else {
      skillsSummary.classList.remove("hiddenContent")
      rateMode.classList.add("hiddenContent")
    }
  })

  moreOptionBtn.addEventListener("click", openMainSidenav);
  for (const elemOption of sidenavOptions) {
    elemOption.addEventListener("click", closeMainSidenav);
  }
  htmlElems.seeMoreBtns.aboutMe.addEventListener("click", ()=>{
    toggleSeeMore(htmlElems.seeMoreBtns.aboutMe, htmlElems.hiddenElems.aboutMeParagraph)
    // console.log(htmlElems.hiddenElems.aboutMeParagraph)
  })

  hideElement(htmlElems.hiddenElems.aboutMeParagraph)
  // hideElement(htmlElems.hiddenElems.techList2)

  loadData();
});
