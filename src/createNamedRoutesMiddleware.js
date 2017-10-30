import Matcher from 'found/lib/Matcher';

import createMiddlewareBase from './createMatcherNamedRoutesMiddleware';

export default function createNamedRoutesMiddleware(routeConfig) {
  return createMiddlewareBase(new Matcher(routeConfig));
}
