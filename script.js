//chargement du DOM

document.addEventListener("DOMContentLoaded", function () {

  //CREATION DES ANALOGIES

  //sélection des données du tableau dans data.json :
  //chargement dans une variable "data" du contenu du fichier data.json

  fetch('data.json').then(function (response) {
    response.json().then(function (data) {
      function ajouteanal(script) {
        script.forEach(function (script) {

          //déclaration de la variable à laquelle on crée une section pour chaque case du tableau
          var listeanalogies = document.createElement("section");

          //ajouter chaque section au html, dans notre liste d'analogies
          listeanalogies.innerHTML =

            '<div class="thematique" id="' + script.id + '">' +
            '<div class="wrapper-analogie" ><div id="img-desc" style="background-image:url(' + script.img + ')"></div><div class="wrapper2">' +
            '<div class="box">' +
            '<h2 class="analogie">Si j\'étais <span class="element">' + script.analogie + ',</span><br>je serais <span class="element">' + script.valeur + '</span></h2><p class="justify">' + script.justify + '</p></div></div></div>' +
            '</div></div>' +
            '<span id="page">' + script.id + '</span>'

          //ajouter cette liste à notre section id="listeanalogies"
          document.querySelector("#listeanalogies").append(listeanalogies);
        });
      }
      ajouteanal(data)
    })
  })


  //AOS animations
  AOS.init();



  //création d'une section quand on clique sur ENVOYER 
  document.querySelector('#buttonsubmit').addEventListener('click', function (event) {

    //injection d'une nouvelle analogie au html, générée par l'envoie (event)
    event.preventDefault();
    document.querySelector('#nouvelle-analogie').innerHTML +=
      '<section><div class="thematique">' +
      '<div class="wrapper-analogie"><div id="img-desc" style="background-image:url(' + document.querySelector("#file").value + ')"></div><div class="wrapper2">' +
      '<div class="box">' +
      '<h2 class="analogie">Si j\'étais <span class="element">' + document.querySelector("#analogie").value + ',</span><br>je serais <span class="element">' + document.querySelector("#valeur").value + '</span></h2><p class="justify">' + document.querySelector("#justify").value + '</p></div></div></div></div></div><span id="page">' + document.querySelector("#analogie").value + '</span><section>';

    //API, pour envoyer les données entrées dans le formulaire dans la base données de philippe gambette
    fetch("https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=amel.chabah&courriel=" + document.querySelector("#mail").value + "&message=Si j'étais " + document.querySelector("#analogie").value + ", je serais " + document.querySelector("#valeur").value + "Parce que " + document.querySelector("#justify").value).then(function (response) {
      //génération du message d'erreur ou de succès
      response.json().then(function (data) {
        if (data.status == "success") {
          document.querySelector("#message").innerHTML = "Bien reçu! :)";
        } else {
          document.querySelector("#message").innerHTML = "Oops, erreur :(";
        }
      })
    })
  });


  //MENTIONS LEGALES
  //création d'un volet, description invisible puis visible après 0.8s quand on clique dessus
  document.querySelector('.volet-invisible').addEventListener('click', function (click) {

    //"clic" apparaît dans la console après clic
    console.log("clic")

    //création du déroulement
    document.querySelector('.volet-invisible').animate([{ height: '100vh' }], { duration: 800 })

    //fixation du déroulement(le volet invisible devient 100% visible)
    setTimeout(function () {
      document.querySelector('.volet-invisible').classList.replace('volet-invisible', 'volet-visible');
    }, 800);

  })


  //apparition de la barre de navigation
  navbar = document.getElementById("navbar");
  var rootElement = document.documentElement;

  //création de la fonction
  var functionscroll = function () {

    //déclaration de y, hauteur de la page à laquelle apparaîtra la div
    var y = rootElement.scrollHeight - rootElement.clientHeight;

    //la div apparaît lorsque y est supérieur à 2 sections (2 scrolls)
    if (rootElement.scrollTop / y >= 0.2) {
      navbar.className = "bar show"
    } else {
      navbar.className = "bar hide"
    }

    //la div disparaît lorsque y est supérieur à 9 sections (9 scrolls, arrivée à la dernière analogie)
    if (rootElement.scrollTop / y >= 0.9) {
      navbar.className = "bar hide"
    }
  };

  window.addEventListener("scroll", functionscroll);




  //scroll to top button

  var scrollToTopBtn = document.querySelector(".scrollToTopBtn");

  //définition de la fonction topbouton
  function topbouton() {
    // action au scroll
    var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;

    //si la hauteur de la page a dépassé 4 sections (4 scrolls)
    if (rootElement.scrollTop / scrollTotal > 0.4) {
      // le bouton apparaît
      scrollToTopBtn.classList.add("showBtn");
    } else {
      // le bouton disparait
      scrollToTopBtn.classList.remove("showBtn");
    }
  }

  //définition de la fonction qui scroll au haut de la page (top:0) de manière fluide
  function scrollToTop() {
    rootElement.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  scrollToTopBtn.addEventListener("click", scrollToTop);
  document.addEventListener("scroll", topbouton);




})