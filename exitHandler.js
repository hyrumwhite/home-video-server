export const listen = (dbProcess) => {
	const killProcess = () => process.kill(-dbProcess.pid);

	// process.on("beforeExit", (code) => {
	// 	console.log("Process beforeExit event with code: ", code);
	// });

	// only works when the process normally exits
	// on windows, ctrl-c will not trigger this handler (it is unnormal)
	// unless you listen on 'SIGINT'
	process.on("exit", (code) => {
		killProcess();
		console.log("Process exit event with code: ", code);
	});

	// just in case some user like using "kill"
	process.on("SIGTERM", (signal) => {
		console.log(`Process ${process.pid} received a SIGTERM signal`);
		killProcess();
		process.exit(0);
	});

	// catch ctrl-c, so that event 'exit' always works
	process.on("SIGINT", (signal) => {
		killProcess();
		console.log(`Process ${process.pid} has been interrupted`);
		process.exit(0);
	});

	// what about errors
	// try remove/comment this handler, 'exit' event still works
	process.on("uncaughtException", (err) => {
		killProcess();
		console.log(`Uncaught Exception: ${err.message}`);
		process.exit(1);
	});
};
