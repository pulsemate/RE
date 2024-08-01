// register.js
var database = firebase.database();
var auth = firebase.auth();

function register() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var name = document.getElementById('name').value;
    var surname = document.getElementById('surname').value;
    var age = document.getElementById('age').value;
    var weight = document.getElementById('weight').value;
    var ill = document.getElementById('ill').value;
    var height = document.getElementById('height').value;
    var tel = document.getElementById('tel').value;
    var gender = document.querySelector('input[name="gender"]:checked');
    var genderValue = gender ? gender.value : null;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;

            // Include all data in the object sent to Firebase
            var userData = {
                email: email,
                name: name,
                surname: surname,
                age: age,
                gender: genderValue,
                weight : weight,
                height : height,
                tel : tel,
                ill : ill
            };

            // Set the user data in the Firebase Realtime Database
            database.ref('users/' + user.uid).set(userData);

             alert('ลงทะเบียนสำเร็จ');
             
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error(errorCode, errorMessage);
            alert('Registration failed: ' + errorMessage);
        });
}