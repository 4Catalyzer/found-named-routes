import type { Middleware } from 'redux';
import type {Matcher, RouteConfig} from 'found';

export function createMatcherNamedRoutesMiddleware(matcher: Matcher) : Middleware;
export function createNamedRoutesMiddleware(routeConfig: RouteConfig) : Middleware;
