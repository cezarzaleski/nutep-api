import InvalidParamError from 'src/shared/exception/invalid-param'

export enum YesOrNo {
  Yes = 'Y',
  No = 'N'
}
export const validateYesOrNo = (field: string, name: string): any => () => {
  if (!Object.values(YesOrNo).includes(field as YesOrNo)) throw new InvalidParamError(name)
  return true
}
