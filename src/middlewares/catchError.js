export const catchError = (ctrl) => {
  return (req, res, next) => {
    ctrl(req, res, next).catch(next)
  }
}