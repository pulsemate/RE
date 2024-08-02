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
								"https://pulsemate-backend.vercel.app/setId?name=" +
									thisName
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

		let sented = false;

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
							console.log(data);
							if (!data.user) {
								// fetch(
								// 	"http://localhost:3000/setId?name=" +
								// 		thisName
								// );
								if (!sented) {
									sented = true;
									const ado = new XMLHttpRequest();
									http.open(
										"GET",
										"https://pulsemate-backend.vercel.app/setId?name=" +
											thisName
									);
									http.onreadystatechange((e) => {
										if (http.readyState == 4)
											sented = false;
									});
									http.send();
								}

								return;
							} else if (data.userCount > 1) {
								clearInterval(myInterval);
								fetch(
									"https://pulsemate-backend.vercel.app/unsetId"
								).then(
									// fetch("http://localhost:3000/unsetId").then(
									window.location.replace("../main/main.html")
								);
							}
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
								if (data.sys > 140 && data.dia > 90) {
									pageStatusElement.classList.add("red");
									document.getElementById(
										"suggest"
									).innerText =
										"หลีกเลี่ยงอาหารรสเค็ม<br>งดสูบบุหรี่<br>งดดื่มแอลกอฮอ์";
								} else if (data.sys > 100 && data.dia > 70) {
									pageStatusElement.classList.add("green");
									document.getElementById(
										"suggest"
									).innerText = "ยินดีด้วย คุณความดันปกติ";
								} else {
									pageStatusElement.classList.add("yellow");
									document.getElementById(
										"suggest"
									).innerText =
										"หลีกเลี่ยงการดื่มแอลกอฮอล์ <br> ทานอาหารที่มีประโยชน์สารอาหารครบถ้วน <br> ไม่ควรเปลี่ยนท่าทางอย่างรวดเร็วมากเกินไป";
								}
							}
						} catch {}
				};
				http.send();
			}, 500);
		};
	});
};
