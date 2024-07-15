//* HTML Elements

const row = document.querySelector(".my-row");
const row_2 = document.querySelector(".my-row-2");
const searchName = document.querySelector(".search-name");
var loading = document.querySelector(".loading");

//* App variable

let allDataList;
let passVal;
const nameRegex = /^[A-Z]?[a-z]{3,}$/;
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
const phoneRegex =
  /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
const ageRegex = /^(1[8-9]|[2-5][0-9]|6[0-5])$/;

//* Functions

async function getMeals(name) {
  loading.classList.remove("d-none");
  if (typeof name === "undefined") {
    let response = await fetch(
      `https://themealdb.com/api/json/v1/1/search.php?s=`
    );
    let data = await response.json();

    allDataList = data;

    console.log("allDataList", allDataList);
  } else {
    let response = await fetch(
      `https://themealdb.com/api/json/v1/1/search.php?s=${name}`
    );
    let data = await response.json();

    allDataList = data;

    console.log(allDataList);
  }
  loading.classList.add("d-none");
}

async function disblayMeals(x) {
  row.innerHTML = "";
  row_2.innerHTML = "";

  await getMeals(x);

  for (let i = 0; i < allDataList.meals.length; i++) {
    let mealCard = `
      <div class="col-sm-6 col-md-4 col-lg-4 col-xl-3" id="test">
        <div class="inner h-100" onclick="showMealDetails(${allDataList.meals[i].idMeal})">
            <img
          src="${allDataList.meals[i].strMealThumb}"
          class="card-img-top w-100 mx-auto"
          alt="..."
        />
        <div class="layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${allDataList.meals[i].strMeal}</h3>
                    </div>
  
          </div>

        </div>
  
    </div>`;

    row.innerHTML += mealCard;
  }
}

async function getCategory() {
  loading.classList.remove("d-none");
  let response = await fetch(
    `https://themealdb.com/api/json/v1/1/categories.php`
  );
  let data = await response.json();
  allData = data;
  console.log("category ", data);
  loading.classList.add("d-none");
}

async function searchByLetter(l) {
  hideSideNav();
  loading.classList.remove("d-none");
  row_2.innerHTML = "";
  let response = await fetch(
    `https://themealdb.com/api/json/v1/1/search.php?f=${l}`
  );
  let data = await response.json();
  for (var i = 0; i < data.meals.length; i++) {
    if (data.meals[i].strMeal.toLowerCase().includes(l.toLowerCase())) {
      let nameCard = `<div class="col-sm-6 col-md-4 col-lg-4 col-xl-3" onclick="showMealDetails(${data.meals[i].idMeal})" id="test">
            <div class="inner h-100">
                <img
              src="${data.meals[i].strMealThumb}"
              class="card-img-top w-100 mx-auto"
              alt="..."
            />
            <div class="layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${data.meals[i].strMeal}</h3>
                    </div>
  
          </div>
    
            </div>
      
        </div>`;
      loading.classList.add("d-none");
      row_2.classList.remove("d-none");
      row_2.innerHTML += nameCard;
    }
  }
}
async function searchByName_2(name) {
  hideSideNav();
  loading.classList.remove("d-none");
  row_2.innerHTML = "";
  let response = await fetch(
    `https://themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  let data = await response.json();
  for (var i = 0; i < data.meals.length; i++) {
    if (data.meals[i].strMeal.toLowerCase().includes(name.toLowerCase())) {
      let nameCard = `<div class="col-sm-6 col-md-4 col-lg-4 col-xl-3" onclick="showMealDetails(${data.meals[i].idMeal})" id="test">
          <div class="inner h-100">
              <img
            src="${data.meals[i].strMealThumb}"
            class="card-img-top w-100 mx-auto"
            alt="..."
          />
          <div class="layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${data.meals[i].strMeal}</h3>
                    </div>
  
          </div>
    
      </div>`;
      loading.classList.add("d-none");
      row_2.classList.remove("d-none");
      row_2.innerHTML += nameCard;
    }
  }
}

async function disblayCategory() {
  row.innerHTML = "";
  await getCategory();

  for (let i = 0; i < allData.categories.length; i++) {
    let mealCard = `
        <div class="col-sm-6 col-md-4 col-lg-4 col-xl-3" id="test">
          <div class="inner h-100" onclick="showFilteredCategory('${allData.categories[i].strCategory}')">
              <img
            src="${allData.categories[i].strCategoryThumb}"
            class="card-img-top w-100 mx-auto"
            alt="..."
          />
          <div class="layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${allData.categories[i].strCategory}</h3>
                        <p>${allData.categories[i].strCategoryDescription}</p>
                        
                    </div>
  
          </div>
  
          </div>
    
      </div>`;

    row.innerHTML += mealCard;
    row_2.classList.add("d-none");
  }
}
async function filterByCategory(c) {
  loading.classList.remove("d-none");
  hideSideNav();
  row.innerHTML = "";
  let response = await fetch(
    `https://themealdb.com/api/json/v1/1/filter.php?c=${c}`
  );
  let data = await response.json();

  console.log("filter category ", data);

  for (let i = 0; i < data.meals.length; i++) {
    let filteredCategory = `
      <div class="col-sm-6 col-md-4 col-lg-4 col-xl-3" id="test">
        <div class="inner h-100" onclick="showMealDetails(${data.meals[i].idMeal})">
            <img
          src="${data.meals[i].strMealThumb}"
          class="card-img-top w-100 mx-auto"
          alt="..."
        />
        <div class="layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${data.meals[i].strMeal}</h3>
                    </div>
  
          </div>

        </div>
  
    </div>`;
    loading.classList.add("d-none");
    row.innerHTML += filteredCategory;
  }
}

async function getArea() {
  loading.classList.remove("d-none");
  let response = await fetch(
    `https://themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let data = await response.json();
  allData = data;
  console.log("area ", data);
  loading.classList.add("d-none");
}

async function disblayArea() {
  row.innerHTML = "";
  await getArea();

  for (let i = 0; i < allData.meals.length; i++) {
    let areaCard = `
          <div  class="col-sm-6 col-md-4 col-lg-4 col-xl-3 rounded-2 text-center cursor-pointer" onclick="showFilteredArea('${allData.meals[i].strArea}')"  id="test" >
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${allData.meals[i].strArea}</h3>
                </div>`;

    row.innerHTML += areaCard;
    hideSideNav();
    row_2.classList.add("d-none");
  }
}
async function filterByArea(a) {
  hideSideNav();
  loading.classList.remove("d-none");

  row.innerHTML = "";
  let response = await fetch(
    `https://themealdb.com/api/json/v1/1/filter.php?a=${a}`
  );
  let data = await response.json();

  console.log("filter category ", data);

  for (let i = 0; i < data.meals.length; i++) {
    let filteredArea = `
        <div class="col-sm-6 col-md-4 col-lg-4 col-xl-3" id="test">
          <div class="inner h-100" onclick="showMealDetails(${data.meals[i].idMeal})">
              <img
            src="${data.meals[i].strMealThumb}"
            class="card-img-top w-100 mx-auto"
            alt="..."
          />
          <div class="layer position-absolute d-flex align-items-center text-black p-2">
                          <h3>${data.meals[i].strMeal}</h3>
                      </div>
    
            </div>
  
          </div>
    
      </div>`;
    loading.classList.add("d-none");
    row.innerHTML += filteredArea;
  }
}
async function getIngredients() {
  loading.classList.remove("d-none");
  let response = await fetch(
    `https://themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let data = await response.json();
  allData = data;
  /* console.log("Ingredients ", data); */
  loading.classList.add("d-none");
}
async function getMealDetails(id) {
  loading.classList.remove("d-none");
  row.innerHTML = "";
  let response = await fetch(
    `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let data = await response.json();
  loading.classList.add("d-none");
  /* console.log("Meal details ", data); */
  function tags(tag) {
    const value = tag;
    let li = "";

    // Split by comma and trim surrounding spaces
    const splitArray = value.split(",").map((item) => item.trim());

    console.log(splitArray); // ["Hello", "World!"]
    for (let i = 0; i < splitArray.length; i++) {
      li += `<li class="alert alert-danger m-2 p-1">${splitArray[i]}</li>`;

      console.log(splitArray[i]);
    }
    return li;
  }
  let details = `<div class="min-vh-100 position-relative">
        <div class="container">
          <div class="row py-5 g-4">
            <div class="col-md-4">
              <img
                class="w-100 rounded-3"
                src="${data.meals[0].strMealThumb}"
                alt=""
              />
              <h2>${data.meals[0].strMeal}</h2>
            </div>
            <div class="col-md-8">
              <h2>Instructions</h2>
              <p>
                ${data.meals[0].strInstructions}
              </p>
              <h3><span class="fw-bolder">Area : </span>${
                data.meals[0].strArea
              }</h3>
              <h3><span class="fw-bolder">Category : </span>${
                data.meals[0].strCategory
              }</h3>
              <h3>Recipes :</h3>
              <ul class="list-unstyled d-flex g-3 flex-wrap">
                <li class="alert alert-info m-2 p-1 ${
                  data.meals[0].strMeasure1 == ""
                    ? "d-none"
                    : data.meals[0].strMeasure1 == null
                    ? "d-none"
                    : data.meals[0].strMeasure1 == " "
                    ? "d-none"
                    : "d-block"
                }">${data.meals[0].strMeasure1} ${
    data.meals[0].strIngredient1
  }</li>
                <li class="alert alert-info m-2 p-1 ${
                  data.meals[0].strMeasure2 == ""
                    ? "d-none"
                    : data.meals[0].strMeasure2 == null
                    ? "d-none"
                    : data.meals[0].strMeasure2 == " "
                    ? "d-none"
                    : "d-block"
                }">${data.meals[0].strMeasure2} ${
    data.meals[0].strIngredient2
  }</li>
                <li class="alert alert-info m-2 p-1 ${
                  data.meals[0].strMeasure3 == ""
                    ? "d-none"
                    : data.meals[0].strMeasure3 == null
                    ? "d-none"
                    : data.meals[0].strMeasure3 == " "
                    ? "d-none"
                    : "d-block"
                }">${data.meals[0].strMeasure3} ${
    data.meals[0].strIngredient3
  }</li>
                <li class="alert alert-info m-2 p-1 ${
                  data.meals[0].strMeasure4 == ""
                    ? "d-none"
                    : data.meals[0].strMeasure4 == null
                    ? "d-none"
                    : data.meals[0].strMeasure4 == " "
                    ? "d-none"
                    : "d-block"
                }">${data.meals[0].strMeasure4} ${
    data.meals[0].strIngredient4
  }</li>
                <li class="alert alert-info m-2 p-1 ${
                  data.meals[0].strMeasure5 == ""
                    ? "d-none"
                    : data.meals[0].strMeasure5 == null
                    ? "d-none"
                    : data.meals[0].strMeasure5 == " "
                    ? "d-none"
                    : "d-block"
                }">${data.meals[0].strMeasure5} ${
    data.meals[0].strIngredient5
  }</li>
                <li class="alert alert-info m-2 p-1 ${
                  data.meals[0].strMeasure6 == ""
                    ? "d-none"
                    : data.meals[0].strMeasure6 == null
                    ? "d-none"
                    : data.meals[0].strMeasure6 == " "
                    ? "d-none"
                    : "d-block"
                }">${data.meals[0].strMeasure6} ${
    data.meals[0].strIngredient6
  }</li>
                <li class="alert alert-info m-2 p-1 ${
                  data.meals[0].strMeasure7 == ""
                    ? "d-none"
                    : data.meals[0].strMeasure7 == null
                    ? "d-none"
                    : data.meals[0].strMeasure7 == " "
                    ? "d-none"
                    : "d-block"
                }">${data.meals[0].strMeasure7} ${
    data.meals[0].strIngredient7
  }</li>
                <li class="alert alert-info m-2 p-1 ${
                  data.meals[0].strMeasure8 == ""
                    ? "d-none"
                    : data.meals[0].strMeasure8 == null
                    ? "d-none"
                    : data.meals[0].strMeasure8 == " "
                    ? "d-none"
                    : "d-block"
                }">${data.meals[0].strMeasure8} ${
    data.meals[0].strIngredient8
  }</li>
                <li class="alert alert-info m-2 p-1 ${
                  data.meals[0].strMeasure9 == ""
                    ? "d-none"
                    : data.meals[0].strMeasure9 == null
                    ? "d-none"
                    : data.meals[0].strMeasure9 == " "
                    ? "d-none"
                    : "d-block"
                }">${data.meals[0].strMeasure9} ${
    data.meals[0].strIngredient9
  }</li>
                <li class="alert alert-info m-2 p-1 ${
                  data.meals[0].strMeasure10 == ""
                    ? "d-none"
                    : data.meals[0].strMeasure10 == null
                    ? "d-none"
                    : data.meals[0].strMeasure10 == " "
                    ? "d-none"
                    : "d-block"
                }">${data.meals[0].strMeasure10} ${
    data.meals[0].strIngredient10
  }</li>
                <li class="alert alert-info m-2 p-1 ${
                  data.meals[0].strMeasure11 == ""
                    ? "d-none"
                    : data.meals[0].strMeasure11 == null
                    ? "d-none"
                    : data.meals[0].strMeasure11 == " "
                    ? "d-none"
                    : "d-block"
                }">${data.meals[0].strMeasure11} ${
    data.meals[0].strIngredient11
  }</li>
                <li class="alert alert-info m-2 p-1 ${
                  data.meals[0].strMeasure12 == ""
                    ? "d-none"
                    : data.meals[0].strMeasure12 == null
                    ? "d-none"
                    : data.meals[0].strMeasure12 == " "
                    ? "d-none"
                    : "d-block"
                }">${data.meals[0].strMeasure12} ${
    data.meals[0].strIngredient12
  }</li>
                <li class="alert alert-info m-2 p-1 ${
                  data.meals[0].strMeasure13 == ""
                    ? "d-none"
                    : data.meals[0].strMeasure13 == null
                    ? "d-none"
                    : data.meals[0].strMeasure13 == " "
                    ? "d-none"
                    : "d-block"
                }">${data.meals[0].strMeasure13} ${
    data.meals[0].strIngredient13
  }</li>
                <li class="alert alert-info m-2 p-1 ${
                  data.meals[0].strMeasure14 == ""
                    ? "d-none"
                    : data.meals[0].strMeasure14 == null
                    ? "d-none"
                    : data.meals[0].strMeasure14 == " "
                    ? "d-none"
                    : "d-block"
                }">${data.meals[0].strMeasure14} ${
    data.meals[0].strIngredient14
  }</li>
                <li class="alert alert-info m-2 p-1 ${
                  data.meals[0].strMeasure15 == ""
                    ? "d-none"
                    : data.meals[0].strMeasure15 == null
                    ? "d-none"
                    : data.meals[0].strMeasure15 == " "
                    ? "d-none"
                    : "d-block"
                }">${data.meals[0].strMeasure15} ${
    data.meals[0].strIngredient15
  }</li>
                <li class="alert alert-info m-2 p-1 ${
                  data.meals[0].strMeasure16 == ""
                    ? "d-none"
                    : data.meals[0].strMeasure16 == null
                    ? "d-none"
                    : data.meals[0].strMeasure16 == " "
                    ? "d-none"
                    : "d-block"
                }">${data.meals[0].strMeasure16} ${
    data.meals[0].strIngredient16
  }</li>
                <li class="alert alert-info m-2 p-1 ${
                  data.meals[0].strMeasure17 == ""
                    ? "d-none"
                    : data.meals[0].strMeasure17 == null
                    ? "d-none"
                    : data.meals[0].strMeasure17 == " "
                    ? "d-none"
                    : "d-block"
                }">${data.meals[0].strMeasure17} ${
    data.meals[0].strIngredient17
  }</li>
                <li class="alert alert-info m-2 p-1 ${
                  data.meals[0].strMeasure18 == ""
                    ? "d-none"
                    : data.meals[0].strMeasure18 == null
                    ? "d-none"
                    : data.meals[0].strMeasure18 == " "
                    ? "d-none"
                    : "d-block"
                }">${data.meals[0].strMeasure18} ${
    data.meals[0].strIngredient18
  }</li>
                <li class="alert alert-info m-2 p-1 ${
                  data.meals[0].strMeasure19 == ""
                    ? "d-none"
                    : data.meals[0].strMeasure19 == null
                    ? "d-none"
                    : data.meals[0].strMeasure19 == " "
                    ? "d-none"
                    : "d-block"
                }">${data.meals[0].strMeasure19} ${
    data.meals[0].strIngredient19
  }</li>
                <li class="alert alert-info m-2 p-1 ${
                  data.meals[0].strMeasure20 == ""
                    ? "d-none"
                    : data.meals[0].strMeasure20 == null
                    ? "d-none"
                    : data.meals[0].strMeasure20 == " "
                    ? "d-none"
                    : "d-block"
                }">${data.meals[0].strMeasure20} ${
    data.meals[0].strIngredient20
  }ff</li>            
              </ul>

              <h3>Tags :</h3>
              <ul class="list-unstyled d-flex g-3 flex-wrap ${
                data.meals[0].strTags ?? "d-none"
              }">
              ${
                data.meals[0].strTags != null ??
                data.meals[0].strTags.includes(",")
                  ? `${tags(data.meals[0].strTags)}`
                  : `<li class="alert alert-danger m-2 p-1">${data.meals[0].strTags}</li>`
              }
                
              </ul>

              <a
                target="_blank"
                href="${data.meals[0].strSource}"
                class="btn btn-success"
                >Source</a
              >
              <a
                target="_blank"
                href="${data.meals[0].strYoutube}"
                class="btn btn-danger"
                >Youtube</a
              >
            </div>
          </div>
        </div>
      </div>`;
  row.innerHTML += details;
  hideSideNav();
}

async function disblayIngredients() {
  row.innerHTML = "";
  await getIngredients();
  console.log(allData.meals[5]);

  for (let i = 0; i < 20; i++) {
    let ingredientsCard = `
            <div  class="col-sm-6 col-md-4 col-lg-4 col-xl-3 rounded-2 text-center cursor-pointer" onclick="showFilteredIngredients('${allData.meals[i].strIngredient}')"  id="test" >
                          <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                          <h3>${allData.meals[i].strIngredient}</h3>
                          <p class="max-lines">${allData.meals[i].strDescription}</p>
                  </div>`;

    row.innerHTML += ingredientsCard;
    hideSideNav();
    row_2.classList.add("d-none");
  }
}
async function filterByIngredients(i) {
  hideSideNav();
  loading.classList.remove("d-none");
  row.innerHTML = "";
  let response = await fetch(
    `https://themealdb.com/api/json/v1/1/filter.php?i=${i}`
  );
  let data = await response.json();

  console.log("filter category ", data);

  for (let i = 0; i < data.meals.length; i++) {
    let filteredIngredients = `
          <div class="col-sm-6 col-md-4 col-lg-4 col-xl-3" id="test">
            <div class="inner h-100" onclick="showMealDetails(${data.meals[i].idMeal})">
                <img
              src="${data.meals[i].strMealThumb}"
              class="card-img-top w-100 mx-auto"
              alt="..."
            />
            <div class="layer position-absolute d-flex align-items-center text-black p-2">
                            <h3>${data.meals[i].strMeal}</h3>
                        </div>
      
              </div>
    
            </div>
      
        </div>`;
    loading.classList.add("d-none");
    row.innerHTML += filteredIngredients;
  }
}
function displayContact() {
  row.innerHTML = "";

  let contact = `
           <div
      class=" min-vh-100 d-flex justify-content-center align-items-center"
    >
      <div class="container w-75 text-center">
        <div class="row g-4">
          <div class="col-md-6">
            <input
              id="nameInput"
              type="text"
              class="form-control"
              placeholder="Enter Your Name"
              oninput="validate(nameRegex, this)"
              
            />
            <p id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
              start from 3 letters
            </p>
          </div>
          <div class="col-md-6">
            <input
              id="emailInput"
              type="email"
              class="form-control"
              placeholder="Enter Your Email"
              oninput="validate(emailRegex, this)"
            />
            <p id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
              Email not valid *exemple@yyy.zzz
            </p>
          </div>
          <div class="col-md-6">
            <input
              id="phoneInput"
              type="text"
              class="form-control"
              placeholder="Enter Your Phone"
              oninput="validate(phoneRegex, this)"
            />
            <p id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
              Enter valid Phone Number
            </p>
          </div>
          <div class="col-md-6">
            <input
              id="ageInput"
              type="number"
              class="form-control"
              placeholder="Enter Your Age"
              oninput="validate(ageRegex, this)"
            />
            <p id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
              Enter valid age from 18 to 65
            </p>
          </div>
          <div class="col-md-6">
            <input
              id="passwordInput"
              type="password"
              class="form-control"
              placeholder="Enter Your Password"
              oninput="validate(passwordRegex, this)"
              onkeyup ="passRegex(this)"
            />
            <p id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
              Enter valid password *Password contains 1 special character, 1 Numeric, 1 uppercase1, 1
              lowercase, range [8-15]*
            </p>
          </div>
          <div class="col-md-6">
            <input
              id="repasswordInput"
              type="password"
              class="form-control"
              placeholder="Repassword"
              oninput="confirmPass(this)"
            />
            <p
              id="repasswordAlert"
              class="alert alert-danger w-100 mt-2 d-none"
            >
              Enter valid repassword
            </p>
          </div>
        </div>
        <button id="submitBtn" class="btn btn-outline-danger px-2 mt-3" disabled >
          Submit
        </button>
      </div>
    </div>`;

  row.innerHTML += contact;
  hideSideNav();
  row_2.classList.add("d-none");
}
function disblaySearch() {
  row.innerHTML = "";

  let search = `
            <div class="container w-75" id="searchContainer">
      <div class="row py-4">
        <div class="col-md-6">
          <input
            class="form-control bg-transparent text-white search-name"
            type="text"
            placeholder="Search By Name"
            onkeyup="test(this)"
            
          />
        </div>
        <div class="col-md-6">
          <input
            maxlength="1"
            class="form-control bg-transparent text-white"
            type="text"
            placeholder="Search By First Letter"
            onkeyup="showSearchByLetter(this)"
          />
        </div>
      </div>
    </div>`;

  row.innerHTML += search;
  hideSideNav();
  row_2.classList.add("d-none");
}

function displaySideNav() {
  $(".side-nav").css("left", "0");
  $(".open-bar").addClass("d-none");
  $(".close-bar").removeClass("d-none");
  $(".search").toggleClass(
    "animate__animated animate__backInUp animate__faster"
  );
  $(".category").toggleClass(
    "animate__animated animate__backInUp animate__fast"
  );
  $(".area").toggleClass("animate__animated animate__backInUp animate__slow");
  $(".ingredients").toggleClass(
    "animate__animated animate__backInUp animate__slower"
  );
  $(".contact").toggleClass(
    "animate__animated animate__backInUp animate__slower"
  );
}
function hideSideNav() {
  $(".side-nav").css("left", "-256.562px");
  $(".open-bar").removeClass("d-none");
  $(".close-bar").addClass("d-none");
  row_2.classList.add("d-none");
  $(".search").removeClass(
    "animate__animated animate__backInUp animate__faster"
  );
  $(".category").removeClass(
    "animate__animated animate__backInUp animate__fast"
  );
  $(".area").removeClass("animate__animated animate__backInUp animate__slow");
  $(".ingredients").removeClass(
    "animate__animated animate__backInUp animate__slower"
  );
  $(".contact").removeClass(
    "animate__animated animate__backInUp animate__slower"
  );
}
disblayMeals();

async function test(v) {
  await searchByName_2(v.value);
}
async function showSearchByLetter(v) {
  await searchByLetter(v.value ? v.value : "C");
}
async function showMealDetails(v) {
  await getMealDetails(v);
}
async function showFilteredCategory(v) {
  await filterByCategory(v);
}
async function showFilteredArea(v) {
  await filterByArea(v);
}
async function showFilteredIngredients(v) {
  console.log(v);
  await filterByIngredients(v);
}
function validate(regex, element) {
  if (regex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.add("d-none");
    return true;
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    element.nextElementSibling.classList.remove("d-none");
  }
}
function passRegex(v) {
  passVal = v.value;
}
function confirmPass(v) {
  if (passVal == v.value) {
    v.classList.add("is-valid");
    v.classList.remove("is-invalid");
    v.nextElementSibling.classList.add("d-none");
    document.querySelector("#submitBtn").removeAttribute("disabled");

    return true;
  } else {
    v.classList.remove("is-valid");
    v.classList.add("is-invalid");
    v.nextElementSibling.classList.remove("d-none");
    document.querySelector("#submitBtn").setAttribute("disabled", "true");

    return false;
  }
}

//* Events

$(".logo").click(() => {
  disblayMeals();
  hideSideNav();
});
$(".search-name").on("input", (e) => {
  /* searchByName(e.target.value); */
  log(e.target.value);
});
$(".open-bar").click(displaySideNav);
$(".search").click(disblaySearch);
$(".area").click(disblayArea);
$(".ingredients").click(disblayIngredients);
$(".contact").click(displayContact);
$(".close-bar").click(hideSideNav);
$(".category").click(() => {
  disblayCategory();
  hideSideNav();
});
