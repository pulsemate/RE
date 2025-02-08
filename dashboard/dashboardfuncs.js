const setupOnline = (user) => {
	var userId = user.uid;
	var userRef = firebase.database().ref("users/" + userId);

	userRef.once("value").then((snapshot) => {
		var userData = snapshot.val();
		const thisName = userData ? userData.name + " " + userData.surname : "";
		fetch("https://pulsemate-backend.vercel.app/setId?name=" + thisName);
		// fetch("http://localhost:3000/setId?name=" + thisName);
		const first = setInterval(() => {
			var done = false;
			const http = new XMLHttpRequest();
			const url = "https://pulsemate-backend.vercel.app/getData";
			http.open("GET", url);
			http.send();
			http.onreadystatechange = (e) => {
				if (http.readyState == 4)
					try {
						const data = JSON.parse(http.responseText);
						console.log(data);
						if (!data.user)
							fetch(
								"https://pulsemate-backend.vercel.app/setId?name=" + thisName
							);
							// fetch(
							// 	"http://localhost:3000/setId?name=" + thisName
							// );
						if (data.user.name == thisName) {
							if (data.userCount < 2) {
								clearInterval(first);
								main();
							}
						} else {
						}
					} catch {}
			};
		}, 1000);

		const main = () => {
			console.log("main");
			const myInterval = setInterval(() => {
				const http = new XMLHttpRequest();
				const url = "https://pulsemate-backend.vercel.app/getData";
				// const url = "http://localhost:3000/getData";
				http.open("GET", url);
				http.onreadystatechange = (e) => {
					if (http.readyState == 4)
						try {
							const data = JSON.parse(http.responseText);
							if (!data.user) {
								// fetch(
								// 	"http://localhost:3000/setId?name=" +
								// 		thisName
								// );
								fetch(
									"https://pulsemate-backend.vercel.app/setId?name=" +
										thisName
								);
								return;
							}

							// if (data.userCount > 1) {
							// 	clearInterval(myInterval);
							// 	fetch("https://pulsemate-backend.vercel.app/unsetId").then(
							// 	// fetch("http://localhost:3000/unsetId").then(
							// 		window.location.replace("../main/main.html")
							// 	);
							// }
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
								document.getElementById("sysint").innerText =
									data.sys;
								document.getElementById("diaint").innerText =
									data.dia;
								document.getElementById("pulint").innerText =
									data.pul;
								if (data.sys > 140 || data.dia > 90) {
									document.getElementById("pressure").innerText = "สูง";
									pageStatusElement.classList.add("red");
									document.getElementById(
										"suggest"
									).innerHTML =
										"หลีกเลี่ยงอาหารรสเค็ม<br>งดสูบบุหรี่<br>งดดื่มแอลกอฮอ์";
								} else if (data.sys > 100 || data.dia > 50) {
									document.getElementById("pressure").innerText = "ปกติ";
									pageStatusElement.classList.add("green");
									document.getElementById(
										"suggest"
									).innerHTML = "ยินดีด้วย คุณความดันปกติ";
								} else {
									document.getElementById("pressure").innerText = "ต่ำ";
									pageStatusElement.classList.add("yellow");
									document.getElementById(
										"suggest"
									).innerHTML =
										"หลีกเลี่ยงการดื่มแอลกอฮอล์ <br> ทานอาหารที่มีประโยชน์สารอาหารครบถ้วน <br> ไม่ควรเปลี่ยนท่าทางอย่างรวดเร็วมากเกินไป";
								}
							}
						} catch {}
				};
				http.send();
			}, 1000);
		};
	});
};
