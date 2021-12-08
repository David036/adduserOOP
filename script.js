let inputName = document.getElementById("inputName");
let inputAge = document.getElementById("inputAge");
let inputSur = document.getElementById("inputSur");
let addBtn = document.getElementById("btn");
let section = document.querySelector(".section");
section.style.display = "flex";
let arr = [];
let usersData = [];
class Parent {
  constructor(name, surName, age) {
    this.name = name;
    this.age = age;
    this.surName = surName;
  }
  myFunc = () => {
    let user = document.createElement("div");
    arr.push(user);
    user.classList.add("user");
    user.innerHTML = `<div class="user-block">
        <h3 class="user-data">${this.name}</h3>
        <h4>${this.surName}</h4>
        <h5>${this.age}</h5>
        <div class="buttons-section">
            <button id="remove-btn" class="remove-btn">Remove</button>
            <button id="edit-btn" class="edit-btn">Edit</button>
        </div>
      </div>`;
    let usersItem = user.querySelector(".user-data");
    usersData.push(usersItem);
    section.append(user);

    // EDIT //
    let editBtn = user.querySelector(".edit-btn");
    editBtn.addEventListener("click", () => {
      let bigModal = document.createElement("div");
      bigModal.classList.add("big-modal");
      document.body.append(bigModal);
      bigModal.innerHTML = `
            <div class="small-modal">
            <h3>Edit</h3>
            <input class="inputNameEd" placeholder="${this.name}" type="text" name="" id="inputNameEd" />
            <input class="inputSurNameEd" placeholder="${this.surName}" type="text" name="" id="inputSurEd" />
            <input class="inputAgeEd" placeholder="${this.age}" type="text" name="" id="inputAgeEd" />  
            <button class="edit-btn-2" id="edit-btn">Edit</button>
          </div>
            `;
      let smallModal = bigModal.querySelector(".small-modal");
      let editBtn2 = smallModal.querySelector(".edit-btn-2");
      editBtn2.addEventListener("click", () => {
        console.log(usersData);
        console.log(arr);


        let userIndexEd = arr.indexOf(user);
        if (userIndexEd != "-1") {
          arr.splice(userIndexEd, 1);
        }
        let textIndexEd = usersData.indexOf(usersItem);
        if (textIndexEd != "-1") {
          usersData.splice(textIndexEd, 1);
        }

        
        user.remove();
        bigModal.remove();
        let inputNameEd = smallModal.querySelector(".inputNameEd");
        let inputSurNameEd = smallModal.querySelector(".inputSurNameEd");
        let inputAgeEd = smallModal.querySelector(".inputAgeEd");
        if (inputNameEd !== "" && inputSurNameEd !== "" && inputAgeEd !== "") {
          let newUser = new Parent(
            inputNameEd.value,
            inputSurNameEd.value,
            inputAgeEd.value
          );
          newUser.myFunc();

          
        } 
        
      });
      bigModal.addEventListener("click", (ev) => {
        ev.stopImmediatePropagation();
        if (ev.target == bigModal && ev.target != smallModal) {
          bigModal.remove();
        }
      });
    });

    // REMOVE //
    let removeBtn = user.querySelector(".remove-btn");
    removeBtn.addEventListener("click", () => {
      let userIndex = arr.indexOf(user);
      if (userIndex != "-1") {
        arr.splice(userIndex, 1);
      }
      user.remove();
      let textIndex = usersData.indexOf(usersItem);
      if (textIndex != "-1") {
        usersData.splice(textIndex, 1);
      }
    });

    console.log(arr);
  };
}

addBtn.addEventListener("click", () => {
  if (
    inputName.value !== "" &&
    inputSur.value !== "" &&
    inputAge.value !== ""
  ) {
    let user = new Parent(inputName.value, inputSur.value, inputAge.value);
    user.myFunc();
    inputName.value = "";
    inputSur.value = "";
    inputAge.value = "";
    section.style.border = "1px solid rgba(71, 71, 71, 0.664)";
  } else {
  }
});

// SEARCH //
let searchUsers = document.querySelector("#search-users");
console.log(usersData);
let searchVal = "";
searchUsers.addEventListener("keyup", function () {
  searchVal = this.value.toLowerCase();
  for (var i = 0; i < arr.length; i++) {
    if (
      !searchVal ||
      usersData[i].textContent.toLowerCase().indexOf(searchVal) > -1
    ) {
      arr[i].style["display"] = "flex";
    } else {
      arr[i].style["display"] = "none";
    }
  }
});
