
import { IncomingMessage, Server, ServerResponse } from "http";
import app from "./app";
const port = 3000;

let server: Server<typeof IncomingMessage, typeof ServerResponse>;

function onError(error:any){
    if (error.syscall !== "listen") {
        throw error;
      }
      const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
      // handle specific listen errors with friendly messages
      switch (error.code) {
        case "EACCES":
          console.error(bind + " requires elevated privileges");
          server.close(() => {
            process.exit(1);
          });
          break;
        case "EADDRINUSE":
          console.error(bind + " is already in use");
          server.close(() => {
            process.exit(1);
          });
          break;
        default:
          throw error;
      }
}



process.on("SIGTERM", () => {
    console.log("Closing server");
    server.close(() => {
      process.exit(0);
    });
  });

(async()=>{
    server =app.app.listen(port,()=>{
     console.log(
         `✅ Server listening on port ${port} with process id ${process.pid} on Date :: ` +
           new Date()
       );
     });
     server.on("error",onError)
 })();
// app.get('/',(req,res)=>{
//     res.send('Hello World');
// });

// app.listen(port, ()=>{
//     console.log(`Server is running on port ${port}`);
// })

