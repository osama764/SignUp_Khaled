const firebaseConfig = {
  apiKey: "AIzaSyBt9O2sJ1kNdd-kAznzpOOsMBQ2s3iJXqE",
  authDomain: "khaled-b3c1a.firebaseapp.com",
  projectId: "khaled-b3c1a",
  storageBucket: "khaled-b3c1a.appspot.com",
  messagingSenderId: "742545932493",
  appId: "1:742545932493:web:7636d95a29c930cc1e6984"
};

firebase.initializeApp(firebaseConfig);
// Get a reference to  RealTime Database service
const database = firebase.database();

let signUp = document.querySelector(".signUp");
let regester = document.querySelector(".regester");


regester.addEventListener("click", (e) => {
  e.preventDefault();

  let Name = signUp.name.value;
  let email = signUp.email.value;
  let password = signUp.password.value;
  let confirmPassword = signUp.confirm.value;
  let usernamewifi = signUp.usernamewifi.value;
  let passwordwifi = signUp.passwordwifi.value;
  let confirmpasswordwifi = signUp.confirmpasswordwifi.value;

  // تم إنشاء المستخدم بنجاح

  if (password === confirmPassword && passwordwifi === confirmpasswordwifi) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // تحديث بيانات المستخدم في قاعدة البيانات
        database.ref("users/" + user.uid).set({
          Name: Name,
          email: email,
          password: password,
          usernamewifi: usernamewifi,
          passwordwifi: passwordwifi,
        });

        signUp.email.value = "";
        signUp.password.value = "";
        signUp.name.value = "";
        signUp.confirm.value = "";
        signUp.usernamewifi.value = "";
        signUp.passwordwifi.value = "";
        signUp.confirmpasswordwifi.value = "";
        console.log("User created successfully");

      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  } else {
    console.log("Password does not match");
  }
});
