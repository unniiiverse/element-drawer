/**
 * RSC interface
 */
export interface IRSCProps<QUERY = {
  [param: string]: string
}, SEARCH = {
  [searchParam: string]: string
}> {
  params?: Promise<QUERY>
  searchParams?: Promise<SEARCH>
}

/**
 * Layout interface
 */
export interface ILayoutProps<QUERY = {
  [param: string]: string
}> {
  children: React.ReactNode

  params?: Promise<QUERY>,
}