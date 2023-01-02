import { TType } from "../../core/data/commons"

interface ITypeStyle {
  bg: string
  bgMain: string
  border: string
  text: string
  all?: () => string
}
type ITypeStyleData = {
  bg: string
  bgMain: string
  border: string
  text: string
} & { all: (hidden?: keyof ITypeStyle) => string }

function getTypeStyleData(style: ITypeStyle): ITypeStyleData {
  return {
    ...style,
    all: (hidden) => {
      return Object.keys(style)
        .map((e) => {
          if (!hidden) return style[e as keyof ITypeStyle]
          if (hidden.includes(e)) {
            return ""
          }
          return style[e as keyof ITypeStyle]
        })
        .join("")
    },
  }
}

export function getTypeStyle(type: TType): ITypeStyleData {
  switch (type) {
    case "primary": {
      return getTypeStyleData({
        bg: "bg-primary ",
        bgMain: "bg-primary-main ",
        border: "border-primary/100 ",
        text: "text-primary",
      })
    }
    case "secondary": {
      return getTypeStyleData({
        bg: "bg-secondary ",
        bgMain: "bg-secondary-main ",
        border: "border-secondary ",
        text: "text-secondary",
      })
    }
    case "danger": {
      return getTypeStyleData({
        bg: "bg-danger ",
        bgMain: "bg-danger-main ",
        border: "border-danger ",
        text: "text-danger",
      })
    }
    case "success": {
      return getTypeStyleData({
        bg: "bg-success ",
        bgMain: "bg-success-main ",
        border: "border-success ",
        text: "text-success",
      })
    }
    default: {
      return getTypeStyleData({
        bg: "bg-primary ",
        bgMain: "bg-primary-main ",
        border: "border-primary ",
        text: "text-primary",
      })
    }
  }
}
