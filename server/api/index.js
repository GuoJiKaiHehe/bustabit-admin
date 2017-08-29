import AdminRouter from "../controllers/Admin.js"

export default (app) => {

 	// app.use("/api",users);
 	

	app.use("/api/admin",AdminRouter);
}
