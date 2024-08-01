var firebaseConfig = {
    apiKey: "AIzaSyBGGdqJxgpT5PZQnigaVFS-OfMD-jJxjGQ",
    authDomain: "authentication-app-2043f.firebaseapp.com",
    databaseURL: "https://authentication-app-2043f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "authentication-app-2043f",
    storageBucket: "authentication-app-2043f.appspot.com",
    messagingSenderId: "1083690050567",
    appId: "1:1083690050567:web:6c79d9fcd23a626b56f6a2",
    measurementId: "G-FTR73XSRW6"
};
firebase.initializeApp(firebaseConfig);

function displayUserInfo(user) {
    var userInfoElement = document.getElementById('user-info');

    if (user) {
        var userId = user.uid;
        var userRef = firebase.database().ref('users/' + userId);

        userRef.once('value').then(function (snapshot) {
            var userData = snapshot.val();
                    
            if (userData) {
                var userName = userData.name;
                var userSurname = userData.surname;
                userInfoElement.innerHTML = 'ผู้ใช้งานปัจจุบัน: ' + userName + ' ' + userSurname;
            } else {
                console.error('User data is null.');
            }
        }).catch(function (error) {
            console.error('Error getting user data from Realtime Database:', error);
            userInfoElement.innerHTML = 'ไม่สามารถดึงข้อมูลผู้ใช้ได้';
        });
    } else {
        userInfoElement.innerHTML = 'ไม่ได้เข้าสู่ระบบ';
    }
}

firebase.auth().onAuthStateChanged(function (user) {
    displayUserInfo(user);
    if (user) setupOnline(user);
});
