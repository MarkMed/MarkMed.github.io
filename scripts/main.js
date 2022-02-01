document.addEventListener("DOMContentLoaded", function () {
  const SIDENAV_DURATION  = 300;
  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems, {outDuration: SIDENAV_DURATION});
  let moreOptionBtn = document.getElementById("moreOptions");
  let sidenavOptions = document.getElementsByClassName("sidenavOption");
  const openSidenav = (sidenavToOpen) => {
    sidenavToOpen.open();
  };
  const closeSidenav = (sidenavToOpen) => {
    sidenavToOpen.close();
  };
  const openMainSidenav = ()=>{
    openSidenav(instances[0])
  }
  const closeMainSidenav = ()=>{
    setTimeout(()=>{closeSidenav(instances[0])}, SIDENAV_DURATION)
  }

  moreOptionBtn.addEventListener("click", openMainSidenav);
  for (const elemOption of sidenavOptions) {
    elemOption.addEventListener("click", closeMainSidenav)
  }

  // STACKWOVERGOD!
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
});
