// Initialize Firebase
var auth = firebase.auth();

// Function to handle sign-in
function signin() {
    var email = document.getElementById('signin-email').value;
    var password = document.getElementById('signin-password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            // alert('เข้าสู่ระบบสำเร็จ');
            // Redirect to dashboard.html after successful sign-in
            window.location.href = '../main/main.html';
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error(errorCode, errorMessage);
            alert('Signin failed: ' + errorMessage);
        });
}

// Function to display user information
function displayUserInfo(user) {
    // Assuming you have an element with id "user-info" to display user information
    var userInfoElement = document.getElementById('user-info');

    // Check if the user is signed in
    if (user) {
        // Retrieve the user's name from the Realtime Database
        var userId = user.uid;
        // alert(userId)
        var userRef = firebase.database().ref('users/' + userId);

        userRef.once('value').then(function (snapshot) {
            var userName = snapshot.val().name;
            var userSurname = snapshot.val().surname;
            userInfoElement.innerHTML = 'ยินดีต้อนรับคุณ: ' + userName + ' ' + userSurname;
        }).catch(function (error) {
            console.error('Error getting user data from Realtime Database:', error);
        });
    } else {
        userInfoElement.innerHTML = 'User is not signed in.';
    }
}

// Listen for changes in the user's sign-in state
auth.onAuthStateChanged(function (user) {
    // Call the function to display user information
    displayUserInfo(user);
});

