const setupOnline = (user) => {
	var userId = user.uid;
	var userRef = firebase.database().ref("users/" + userId);
	let thisName = "";

	userRef.once("value").then((snapshot) => {
		var userData = snapshot.val();
		thisName = userData ? userData.name + " " + userData.surname : "";
		fetch("https://pulsemate-backend.vercel.app/setId?name=" + thisName);
		// fetch("http://localhost:3000/setId?name=" + thisName);

		const myInterval = setInterval(() => {
			const http = new XMLHttpRequest();
			const url = "https://pulsemate-backend.vercel.app/getData";
			// const url = "http://localhost:3000/getData";
			http.open("GET", url);
			http.onreadystatechange = (e) => {
				try {
					const data = JSON.parse(http.responseText);
					if (data.user) {
						if (data.user.name != thisName) {
							alert("another person measuring");
							setTimeout(
								window.location.replace("../main/main.html"),
								3000
							);
							clearInterval(myInterval);
							return;
						}
					} else {
						fetch(
							"https://pulsemate-backend.vercel.app/setId?name=" +
								thisName
						);
					}
					console.log(data);
					const pageStatusElement =
						document.getElementsByTagName("html")[0];
					pageStatusElement.classList.remove(
						pageStatusElement.className
					);
					if (data.idle) {
						pageStatusElement.classList.add("idle");
					} else if (data.error) {
						pageStatusElement.classList.add("error");
					} else {
						document.getElementById("sysint").innerText = data.sys;
						document.getElementById("diaint").innerText = data.dia;
						document.getElementById("pulint").innerText = data.pul;
						if (data.sys > 140 && data.dia > 90) {
							pageStatusElement.classList.add("red");
							document.getElementById("suggest").innerText =
								"หลีกเลี่ยงอาหารรสเค็ม<br>งดสูบบุหรี่<br>งดดื่มแอลกอฮอ์";
						} else if (data.sys > 100 && data.dia > 70) {
							pageStatusElement.classList.add("green");
							document.getElementById("suggest").innerText =
								"ยินดีด้วย คุณความดันปกติ";
						} else {
							pageStatusElement.classList.add("yello");
							document.getElementById("suggest").innerText =
								"หลีกเลี่ยงการดื่มแอลกอฮอล์ <br> ทานอาหารที่มีประโยชน์สารอาหารครบถ้วน <br> ไม่ควรเปลี่ยนท่าทางอย่างรวดเร็วมากเกินไป";
						}
					}
				} catch {}
			};
			http.send();
		}, 1000);
	});
};
