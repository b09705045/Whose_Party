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
    if(document.getElementById('name').value=="")
    {
      alert("[姓名]未填寫!!");
      document.getElementById('name').focus();
      ValidationRed();
      return false;
    }
    if (document.getElementById('department').value=="")
    {
      alert("[系別]未填寫!!");
      document.appliForm.Email.focus();
      ValidationRed();
      return false;
    }
    if(document.getElementById('NTUID').value=="")
    {
      alert("[學號]未填寫!!");
      document.appliForm.Content.focus();
      ValidationRed();
      return false;
    }
    if(document.getElementById('birthday').value=="")
    {
      alert("[生日]未填寫!!");
      document.getElementById('').focus();
      ValidationRed();
      return false;
    }    
    if(document.getElementById('genders').value=="")
    {
      alert("[生理性別]未填寫!!");
      document.getElementById('name').focus();
      ValidationRed();
      return false;
    }    
    if(document.getElementById('IDnumber').value=="")
    {
      alert("[身分證字號]未填寫!!");
      document.getElementById('IDnumber').focus();
      ValidationRed();
      return false;
    }    
    if(document.getElementById('cellphone').value=="")
    {
      alert("[手機]未填寫!!");
      document.getElementById('cellphone').focus();
      ValidationRed();
      return false;
    }    
    if(document.getElementById('Email').value=="")
    {
      alert("[Email]未填寫!!");
      document.getElementById('Email').focus();
      ValidationRed();
      return false;
    }
    if(document.getElementById('emerCon').value=="")
    {
      alert("[緊急聯絡人]未填寫!!");
      document.getElementById('emerCon').focus();
      ValidationRed();
      return false;
    }
    if(document.getElementById('emerConRela').value=="")
    {
      alert("[與緊急聯絡人關係]未填寫!!");
      document.getElementById('emerConRela').focus();
      ValidationRed();
      return false;
    }
    if(document.getElementById('emerTel').value=="")
    {
      alert("[緊急聯絡人電話]未填寫!!");
      document.getElementById('emerTel').focus();
      ValidationRed();
      return false;
    }
    if(document.getElementById('benefOfInsurance').value=="")
    {
      alert("[保險受益人]未填寫!!");
      document.getElementById('benefOfInsurance').focus();
      ValidationRed();
      return false;
    }
    if(document.getElementById('benefOfInsuranceCon').value=="")
    {
      alert("[保險受益人關係]未填寫!!");
      document.getElementById('benefOfInsuranceCon').focus();
      ValidationRed();
      return false;
    }
    if(document.getElementById('benefOfInsuranceTel').value=="")
    {
      alert("[保險受益人電話]未填寫!!");
      document.getElementById('benefOfInsuranceTel').focus();
      ValidationRed();
      return false;
    }
    if(document.getElementById('specialCase').value=="")
    {
      alert("[有無特殊病例史或食物過敏]未填寫!!");
      document.getElementById('specialCase').focus();
      ValidationRed();
      return false;
    }
    if(document.getElementById('tshirtSize').value=="")
    {
      alert("[營服尺寸]未填寫!!");
      document.getElementById('tshirtSize').focus();
      ValidationRed();
      return false;
    }
    if(document.getElementById('accountL5').value=="")
    {
      alert("[匯款帳號末五碼]未填寫!!");
      document.getElementById('accountL5').focus();
      ValidationRed();
      return false;
    }
    if( document.querySelector('input[name= "diet"]:checked') == null){
      alert("[飲食習慣]未選擇");
      document.getElementsByName('diet').focus();
      return false;
    }
    if(document.querySelector('input[name="iHaveConfirmed"]:checked') == null){
      alert("[我已確認報名資料無誤並上傳必要文件]未勾選");
      document.getElementById('iHaveConfirmed').focus();
      return false;
    }
    if(document.querySelector('input[name="iWillFollowRule"]:checked') == null){
      alert("[上營期間我會遵守防疫及安全規範，保護自己也保護他人]未勾選");
      document.getElementById('iWillFollowRule').focus();
      return false;
    }

    var agree=confirm("確定要送出報名表了嗎?");
    if (agree){
      return true ;
    }
    else{
      confirm_submit = false;
      return false ;
    }
  }

  var inputs = document.querySelectorAll('input')
  inputs.forEach(input =>{
    input.addEventListener('input', function(){
      if(input.checkValidity()){
        input.classList.add('valid')
        input.classList.remove('invalid')
      }
      else{
        input.classList.add('invalid')
        input.classList.remove('valid')
      }
    })
  })


  function ValidationRed(){
    var inputs = document.querySelectorAll('input')
    inputs.forEach(input =>{
      if(input.checkValidity()){
        input.classList.add('valid')
        input.classList.remove('invalid')
      }
      else{
        input.classList.add('invalid')
        input.classList.remove('valid')
      }
    })
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
    匯款後五碼: userAccountL5Input,
    FB連結:userFBInput,
    保險受益人:userBenefOfInsuranceInput,
    保險受益人關係:userBenefOfInsuranceConInput,
    保險受益人電話:userBenefOfInsuranceTelInput,


  })
  .then(function(){
    console.log("Data saved")
  })
  .then(function(confirm_submit){
    this.location.replace("https://ntu.im/whoseparty/applicationConfirmed/")

    confirm_submit = true;
    console.log("Change")
  })
  .catch(function(error){
    console.log(error);
  })

})

