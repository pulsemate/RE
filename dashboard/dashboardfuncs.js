const setupOnline = (user) => {
    const socket = new WebSocket("wss://pulsemate-backend.vercel.app/updateData");
    socket.addEventListener("open", (event) => {
        console.log("hello world");
        socket.send("Hello Server!");
    });

}