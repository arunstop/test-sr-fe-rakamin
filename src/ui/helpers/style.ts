import { TType } from "../../core/data/commons"

interface ITypeStyle {
  bg: string
  border: string
  text: string
  all?: string
}

function getTypeStyleData(style: ITypeStyle): ITypeStyle {
  return { ...style, all: Object.values(style).join('') }
}

export function getTypeStyle(type: TType): ITypeStyle {
  switch (type) {
    case "main": {
      return getTypeStyleData({
        bg: "bg-primary ",
        border: "border-primary/100 ",
        text: "text-primary",
      })
    }
    case "secondary": {
      return getTypeStyleData({
        bg: "bg-secondary ",
        border: "border-secondary ",
        text: "text-secondary",
      })
    }
    case "danger": {
      return getTypeStyleData({
        bg: "bg-danger ",
        border: "border-danger ",
        text: "text-danger",
      })
    }
    case "success": {
      return getTypeStyleData({
        bg: "bg-success ",
        border: "border-success ",
        text: "text-success",
      })
    }
    default: {
      return getTypeStyleData({
        bg: "bg-primary ",
        border: "border-primary ",
        text: "text-primary",
      })
    }
  }
}
