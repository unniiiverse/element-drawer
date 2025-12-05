export interface IRoute {
  /** Route path */
  path: (...params: string[]) => string

  /** Define if route static (/hello) or dynamic (/hello/[property_1]). If route contain more than 1 prop, route should look like /hello/ASTERISK/world/ASTERISK
   * @note ASTERIST - star symbol
   * @default false
   */
  dynamic?: boolean
}

type TRoute = 'home'

export const Routes: { [key in TRoute]: IRoute } = {
  home: {
    path: () => '/'
  }
}; 