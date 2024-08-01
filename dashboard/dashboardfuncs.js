const setupOnline = (user) => {
    const socket = new WebSocket("wss://pulsemate-backend.vercel.app/dataUpdate");
    socket.addEventListener("open", (event) => {
        console.log("hello world");
        socket.send("Hello Server!");
    });

}