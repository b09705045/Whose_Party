//Unique Firebase object
var firebaseConfig = {
    apiKey: "AIzaSyComQBEvNZCgWXNykNu-cCHlbxNoREDJgQ",
    authDomain: "whoseparty-c53a7.firebaseapp.com",
    projectId: "whoseparty-c53a7",
    storageBucket: "whoseparty-c53a7.appspot.com",
    messagingSenderId: "55048849858",
    appId: "1:55048849858:web:1cdd0c72ae18418d7c2e5b"
  };

// Initialixe Firebase
  firebase.initializeApp(firebaseConfig);

  var confirm_submit = true;
  function confirmSubmit()
  {
    var agree=confirm("確定要送出報名表了嗎?");
    if (agree){
      return true ;
    }
    else{
      confirm_submit = false;
      return false ;
    }
  }


  const input = document.querySelector("#parentAg");
  const parentAg_pre = document.querySelector("#parentAg_pre");

  input.addEventListener("change", function(e){
      while(parentAg_pre.firstChild){
          parentAg_pre.removeChild(parentAg_pre.firstChild);
      }

      // gain file information
      var par_fileData = e.target.files[0];
      var par_fileName = par_fileData.name;
      const path = "/家長同意書/" + par_fileName;
      const msg = document.querySelector("#parentAg_pre");

      // gain storage position
      const storageReference = firebase.storage().ref(path);
      // .put() method put thing into the right position

      const task = storageReference.put(par_fileData);

      task.on(
          "state_changed",
          function progress(){

          },
          function error(){
              msg.textContent = "上傳失敗";
          },
          function complete(){
              msg.textContent = par_fileName;
          }

      );

  }, false);

  const health_input = document.querySelector("#healthDec");
  const healthDec_pre = document.querySelector("#healthDec_pre");

  health_input.addEventListener("change", function(e){
    while(healthDec_pre.firstChild){
        healthDec_pre.removeChild(healthDec_pre.firstChild);
    }

    var heal_fileData = e.target.files[0];
    var heal_fileName = heal_fileData.name;

    const path = "/自主健康聲明書/" + heal_fileName;
    const msg = document.querySelector("#healthDec_pre");

    // gain storage position
    const storageReference = firebase.storage().ref(path);
    // .put() method put thing into the right position

    const task = storageReference.put(heal_fileData);

    task.on(
        "state_changed",
        function progress(){},
        function error(){
            msg.textContent = "上傳失敗";
        },
        function complete(){
            msg.textContent = heal_fileName;
        }
    );

  }, false);
  
  
var firestore = firebase.firestore()

// Variable to access database collection
const db = firestore.collection("applicationForm")

// Get Submit Form
let submitButtom = document.querySelector('#submit')


// Get Form Values
let userName = document.querySelector("#name")
let userBirth = document.querySelector("#birthday")
let userEmerTel = document.querySelector("#emerTel")
let userTel = document.querySelector("#cellphone")
let userIDnumber = document.querySelector("#IDnumber")
let userEmail = document.querySelector("#Email")
let userDepartment = document.querySelector("#department")
let userNTUID = document.querySelector("#NTUID")
let userGenders = document.querySelector("#genders")
let userEmerCon = document.querySelector("#emerCon")
let userSug = document.querySelector("#suggestion")
let userspecialCase = document.querySelector("#specialCase")
let userTshirtSize = document.querySelector("#tshirtSize")
let userAccountL5 = document.querySelector("#accountL5")
let userFB = document.querySelector("#FB")
let userEmerConRela = document.querySelector("#emerConRela")
let userBenefOfInsurance = document.querySelector("#benefOfInsurance")
let userBenefOfInsuranceCon = document.querySelector("#benefOfInsuranceCon")
let userBenefOfInsuranceTel = document.querySelector("#benefOfInsuranceTel")





// Creat Event LIstener To Allow Form Submission
submitButtom.addEventListener("click", (e) =>{
  // Prevent Default Form Submission Behavior
  e.preventDefault()

  if(confirm_submit === false){
    confirm_submit = true;
    return false
  }

  let userDiet = document.querySelector('input[name= "diet"]:checked');
  let userWayAttend = document.querySelector('input[name= "wayAttend"]:checked');
  let userTshirtSizeInput = userTshirtSize.options[userTshirtSize.selectedIndex].value;
  let userNameInput = userName.value
  let userBirthInput = userBirth.value
  let userEmerTelInput = userEmerTel.value
  let userTelInput = userTel.value
  let userIDnumberInput = userIDnumber.value
  let userEmailInput = userEmail.value
  let userDepartmentInput = userDepartment.value
  let userDietInput = userDiet.value
  let userNTUIDInput = userNTUID.value 
  let userGendersInput = userGenders.value 
  let userEmerConInput = userEmerCon.value 
  let userSugInput = userSug.value 
  let userspecialCaseInput = userspecialCase.value 
  let userAccountL5Input = userAccountL5.value
  let userWayAttendInput = userWayAttend.value
  let userFBInput = userFB.value
  let userEmerConRelaInput = userEmerConRela.value
  let userBenefOfInsuranceInput = userBenefOfInsurance.value
  let userBenefOfInsuranceConInput = userBenefOfInsuranceCon.value 
  let userBenefOfInsuranceTelInput = userBenefOfInsuranceTel.value
  // Save Form Data to Firebase
  db.doc(userNameInput).set({
    名字: userNameInput,
    學號: userNTUIDInput,
    性別: userGendersInput,
    生日: userBirthInput,
    電話: userTelInput,
    緊急聯絡人: userEmerConInput,
    緊急聯絡人電話:userEmerTelInput,
    緊急連絡人關係:userEmerConRelaInput,
    身分證字號:userIDnumberInput,
    系級:userDepartmentInput,
    EMail:userEmailInput,
    營服尺寸:userTshirtSizeInput, 
    飲食習慣:userDietInput,
    建議: userSugInput,
    特殊病例史: userspecialCaseInput,
    前往方式: userWayAttendInput,
    匯款後五碼: userAccountL5Input,
    FB連結:userFBInput,
    保險受益人:userBenefOfInsuranceInput,
    保險受益人關係:userBenefOfInsuranceConInput,
    保險受益人電話:userBenefOfInsuranceTelInput,


  })
  .then(function(){
    console.log("Data saved")
  })
  .catch(function(error){
    console.log(error);
  })

  if(confirm_submit === true){
    window.location.replace("applicationAfConfirm.html")
  }
})

