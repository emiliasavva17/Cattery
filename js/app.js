async function fetchData() {
  const response = await fetch("./cats.json");
  const data = await response.json();

  return data;
}
async function initApp() {
  _cats = await fetchData();

  appendCat(_cats);
  console.log("test");
}
initApp();

// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  clearMessage();
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  clearMessage();
};

function appendCat(cats) {
  let king,
    queen = false;

  for (let cat of cats) {
    // looping trough all cats

    if (cat.who == "king") king = true;
    if (cat.who == "queen") queen = true;

    if (cat.who != "kitten") {
      //creating person data, HTML tags and adding to the DOM, the element
      let insert = document.querySelector(`#${cat.who}`);
      insert.innerHTML += /*html*/ `
        <div class="card ourCatCard">
          <h3>${cat.name} </h3>
          <hr>
          <img src="${cat.image}" class="gradient_img" alt="">
          <br><hr>
          <p><b>Birth: </b> ${cat.birth}<br>
          <b>Cattery: </b> ${cat.Cattery}<br>
          <b>Color: </b> ${cat.Color}<br>
          <b>SQR LOOF: </b> ${cat.SQR_LOOF}<br>
          <b>FIV/FELV test: </b> ${cat.FELV_test}<br>
          <b>HCM/PKD test: </b> ${cat.PKD_test}<br>  </p>
          <br>
        </div>`;
    } else {
      if (cat.status === "Available" || cat.status === "Reserved") {
        let mom_id = cat.mom_id;
        let dad_id = cat.dad_id;
        const mom = _cats.find((cat) => cat.id === mom_id);
        const dad = _cats.find((cat) => cat.id === dad_id);

        document.querySelector("#kittens_for_adoption").innerHTML += /*html*/ `
        <div class="card space_bottom kitten_card" id="${cat.id + cat.name}" >
          <div>
            <h3>${cat.name} </h3>
            <hr>
            <img src="${cat.image}" class="gradient_img" alt="">
            <br><hr>
            <div class="card_text">
              <b>Birth: </b> ${cat.birth}<br>
              <b>Color: </b> ${cat.Color}<br>
              <b>Gender: </b> ${cat.gender}<br>
              <b>Litter: </b> ${cat.Litter}<br>
              <b>Available: </b> ${cat.availableFrom} <br>
              <b>Status: <span class='${cat.status}'>${
          cat.status
        }</span></b> <br>
            
            <p class='exclude_line'>Parents: </p>  
            
              <div class='parents'>
                <div class="father"> Father -<b> <span style="color:#4792b1"  > ${
                  dad.name
                }</span> </b></div>
                <div class="hide_father">${parentCard(dad.id)}</div>

                <div class="mother"> Mother - <b><span style="color:#B22222 " > ${
                  mom.name
                }</span> </b></div>
                <div class="hide_mother">${parentCard(mom.id)}</div>
                </div>
                <b>Price: <span style="color:#001667">${cat.price} €</span></b>
              </div>
            <br>
    
          <button onclick="showDetailView(${cat.id})">Read more</button>
        </div>`;
      } else {
        document.querySelector("#previous_litters").innerHTML += /*html*/ `
        <div class="card" id="${cat.id + cat.name}" >
           <h3>${cat.name} </h3>
          <hr>
          <img src="${cat.image}" class="gradient_img" alt="">
          <br><hr>
          <p><b>Birth: </b> ${cat.birth}<br>
          <b>Color: </b> ${cat.Color}<br>
          <b>Gender: </b> ${cat.gender}<br>
          <b>Litter: </b> ${cat.Litter}<br>
          <b>Status: <span class='${cat.status}'>${
          cat.status
        }</span></b> </p>          
        </div>`;
      }
    }
  }

  if ((king = false))
    document.getElementsByClassName("king").style.display = "none";
  if ((queen = false))
    document.getElementsByClassName("queen").style.display = "none";
}

function parentCard(id) {
  const cat = _cats.find((cat) => cat.id === id);

  insert = /*html*/ `
        <div class="card_parent">
          <h3>${cat.name} </h3>
          <hr>
          <img src="${cat.image}" class="gradient_img" alt="">
          <br><hr>
          <p><b>Birth: </b> ${cat.birth}<br>
          <b>Cattery: </b> ${cat.Cattery}<br>
          <b>Color: </b> ${cat.Color}<br>
          <b>SQR LOOF: </b> ${cat.SQR_LOOF}<br>
          <b>FIV/FELV test: </b> ${cat.FELV_test}<br>
          <b>HCM/PKD test: </b> ${cat.PKD_test}<br>  </p>
          <br>
        </div>`;

  return insert;
}
function showDetailView(id) {
  const catToShow = _cats.find((cat) => cat.id === id);
  let mom_id = catToShow.mom_id;
  let dad_id = catToShow.dad_id;
  const mom = _cats.find((cat) => cat.id === mom_id);
  const dad = _cats.find((cat) => cat.id === dad_id);

  navigateTo(`#/detail-view`);
  // document.querySelector("#detail-view .title").innerHTML = productToShow.model;
  document.querySelector("#detail-view-container").innerHTML = /*html*/ `
    <div class="info_container ">
      <div class="pyramids_H1">
        <img class="pyramid" src="img/Component 13 – 2.png" alt="" />
        <p class="pagesH1">${catToShow.name}</p>
        <img class="pyramid" src="img/Component 13 – 2.png" alt="" />
    </div> 
    </div> <br>
    <div class="round_container detail_card">
    <div id="image"class="detail_mobile" ><img src="${catToShow.image}" ></div>
      <div id='text'>
        <p><b>Birth: </b> ${catToShow.birth}<br>
          <b>Color: </b> ${catToShow.Color}<br>
          <b>Gender: </b> ${catToShow.gender}<br>
          <b>Litter: </b> ${catToShow.Litter}<br></p>     
          <b>Status: <span class='${catToShow.status}'>${
    catToShow.status
  }</span></b> 
        </p> 
        <p style="text-align:justify">${catToShow.description}</p>

        <p style="text-align:center">Parents: </p>  
            
              <div class='parents'>
                <div class="father"> Father -<b> <span style="color:#4792b1"  > ${
                  dad.name
                }</span> </b></div>
                <div class="hide_father">${parentCard(dad.id)}</div>

                <div class="mother"> Mother - <b><span style="color:#B22222 " > ${
                  mom.name
                }</span> </b></div>
                <div class="hide_mother">${parentCard(mom.id)}</div>
                </div>

      </div>
      <div id="image" class="desktop"><img src="${catToShow.image}"></div>
    </div>
    <br>
    <div class=detail_card_btn_container>
      <button class="${catToShow.status}" id="myBtn"  value='${catToShow.name +
    catToShow.id}'>I want to adopt</button>
      <p class="${
        catToShow.status
      }">This kitten is already reserved, but your welcome to contact us and inquire about possible options</p>
    </div>
     <div class="divider" style='margin-top:-80px'></div>

     `;

  if (catToShow.status !== "Available") {
    document.querySelector(
      " .detail_card_btn_container button"
    ).disabled = true;
  }
  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");
  // When the user clicks the button, open the modal
  btn.onclick = function() {
    modal.style.display = "block";
  };
}

const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#email");
const telephone = document.querySelector("#telephone");

const errorNodes = document.querySelectorAll(".error");
async function validateForm() {
  clearMessage();
  let errorFlag = false;

  if (firstName.value.length < 1) {
    errorNodes[0].innerText = "Enter your first name";
    firstName.classList.add("error-border");
    errorFlag = true;
  }

  if (lastName.value.length < 1) {
    errorNodes[1].innerText = "Enter your last name";
    lastName.classList.add("error-border");
    errorFlag = true;
  }

  if (!emailIsValid(email.value)) {
    errorNodes[2].innerText = "Invalid email address";
    email.classList.add("error-border");
    errorFlag = true;
  }

  return errorFlag;
}

function clearMessage() {
  for (let i = 0; i < errorNodes.length; i++) {
    errorNodes[i].innerText = "";
    firstName.classList.remove("error-border");
    lastName.classList.remove("error-border");
    email.classList.remove("error-border");
  }
  document.querySelector(".submit_form").style.display = "block";
  document.querySelector(".succeseful_message").style.display = "none";
}
function emailIsValid(email) {
  let pattern = /\S+@\S+\.\S+/;
  return pattern.test(email);
}

async function submitForm() {
  id = document.querySelector(".detail_card_btn_container button").value;
  let errorFlagPromise = await validateForm();

  var params = {
    first_name: document.querySelector("#firstName").value,
    last_name: document.querySelector("#lastName").value,
    email: document.querySelector("#email").value,
    id: id,
    telephone: document.querySelector("#telephone").value,
    message: document.querySelector("#message").value,
  };
  if (!errorFlagPromise) {
    let testx = await emailjs
      .send("service_kpnu2nk", "template_2h7upbz", params)
      .then(function(res) {
        return res.status;
      });

    if (testx == "200") {
      document.querySelector(".submit_form").style.display = "none";
      document.querySelector(".succeseful_message").style.display = "block";
    }
  }
}

document
  .querySelector(".popup_info_close")
  .addEventListener("click", function ClosePopUp() {
    let box = document.querySelector(".popup_info");
    box.style.width = "0";
    if (box.style.width == "0px") {
      document.querySelector(".popup_info").style.transform =
        "translateX(55px)";

      document.querySelector(".popup_info").style.transitiondelay = "250ms";
    }
  });
