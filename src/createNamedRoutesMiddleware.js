import Matcher from 'found/lib/Matcher';

import createMiddlewareBase from './createNamedRoutesMiddlewareBase';

export default function createNamedRoutesMiddleware(routeConfig) {
  return createMiddlewareBase(routeConfig, new Matcher(routeConfig));
}
