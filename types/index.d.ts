import type { Matcher, RouteConfig } from 'found';
import type { Middleware } from 'redux';

export function createMatcherNamedRoutesMiddleware(
  matcher: Matcher,
): Middleware;
export function createNamedRoutesMiddleware(
  routeConfig: RouteConfig,
): Middleware;
