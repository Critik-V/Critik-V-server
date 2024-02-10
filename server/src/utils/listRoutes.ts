/* import { Application } from 'express';

function listRoutes(app: Application) {
	const routes: string[] = [];

	app._router.stack.forEach(middleware => {
		if (middleware.route) {
			routes.push(middleware.route.path);
		} else if (middleware.name === 'router') {
			middleware.handle.stack.forEach(handler => {
				const route = handler.route;
				routes.push(route.path);
			});
		}
	});

	return routes;
}

export default listRoutes; */
