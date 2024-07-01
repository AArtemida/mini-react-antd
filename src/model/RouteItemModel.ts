export default interface RouteItemModel {
  path: string
  name?: string
  title: string
  icon?: string
  permission?: Array<string>
  componentName: string
  children?: RouteItemModel[]
  component?: React.ReactNode
}
