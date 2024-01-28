const apiRoutePrefix = (route: string): string =>
	`/${process.env.API_ROUTE_PREFIX}/${route}`;

export default apiRoutePrefix;
