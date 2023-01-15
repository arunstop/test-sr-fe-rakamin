import { useCallback, useState } from "react"
import Button from "../common/Button"
import TextInput from "../common/TextInput"
import {
    validationIsAlphaOnly,
  validationIsEmail,
  validationIsPassword,
  validationMoreThan,
} from "../../helpers/helper-form"

export interface IAuthInput {
  email: string
  name?: string
  password: string
  confirmPassword?: string
}

function AuthForm(props: {
  data: IAuthInput
  type?: "LOGIN" | "REGISTER"
  onSubmit: (data: IAuthInput) => void
  onEdit: (data: IAuthInput) => void
  loading?: boolean
}) {
  const { data, loading, onEdit, type = "LOGIN" } = props
  const {
    email,
    name,
    password,
    confirmPassword,
    errors,
    handleChangeEmail,
    handleChangeName,
    handleChangePassword,
    handleChangeConfirmPassword,
    handleSubmit,
  } = useAuthForm(props)

  return (
    <form
      className="flex flex-col gap-2 sm:gap-4 w-full"
      onSubmit={(ev) => {
        ev.preventDefault()
        handleSubmit({ ...data, email: email, password: password })
      }}
    >
      <div
        className={`grid gap-4 ${
          loading ? "pointer-events-none opacity-50" : ""
        }`}
      >
        <div className="grid gap-2">
          <span className="text-sm font-bold">Email</span>
          <TextInput
            name="email"
            value={email}
            className={`${
              errors.get("email")
                ? "bg-danger border-danger outline-danger !text-danger"
                : ""
            }`}
            onChange={(ev) => handleChangeEmail(ev.target.value)}
            onBlur={(ev) => {
              onEdit({ ...data, email: ev.target.value })
            }}
            placeholder="example@gmail.com"
            type="email"
            data-cy="input-todo-email"
          />
          <span className="text-danger font-semibold">
            {errors.get("email")}
          </span>
        </div>
        {type === "REGISTER" && (
          <div className="grid gap-2">
            <span className="text-sm font-bold">Name</span>
            <TextInput
              name="name"
              value={name}
              className={`${
                errors.get("name")
                  ? "bg-danger border-danger outline-danger !text-danger"
                  : ""
              }`}
              onChange={(ev) => handleChangeName(ev.target.value)}
              onBlur={(ev) => {
                onEdit({ ...data, name: ev.target.value })
              }}
              placeholder="Kanban user"
              data-cy="input-todo-name"
            />
            <span className="text-danger font-semibold">
              {errors.get("name")}
            </span>
          </div>
        )}
        <div className="grid gap-2">
          <span className="text-sm font-bold">Password</span>
          <TextInput
            name="password"
            value={password}
            className={`${
              errors.get("password")
                ? "bg-danger border-danger outline-danger !text-danger"
                : ""
            }`}
            onChange={(ev) => handleChangePassword(ev.target.value)}
            onBlur={(ev) => {
              onEdit({ ...data, password: ev.target.value })
            }}
            placeholder="**********"
            type="password"
            data-cy="input-todo-password"
          />
          <span className="text-danger font-semibold">
            {errors.get("password")}
          </span>
        </div>
        {type === "REGISTER" && (
          <div className="grid gap-2">
            <span className="text-sm font-bold">Confirm Password</span>
            <TextInput
              name="confirmPassword"
              value={confirmPassword}
              className={`${
                errors.get("confirmPassword")
                  ? "bg-danger border-danger outline-danger !text-danger"
                  : ""
              }`}
              onChange={(ev) => handleChangeConfirmPassword(ev.target.value)}
              onBlur={(ev) => {
                onEdit({ ...data, confirmPassword: ev.target.value })
              }}
              placeholder="**********"
              type="password"
              data-cy="input-todo-confirmPassword"
            />
            <span className="text-danger font-semibold">
              {errors.get("confirmPassword")}
            </span>
          </div>
        )}
      </div>
      <div className="flex  gap-[0.625rem] w-full">
        <Button
          id="button-add-todo"
          className="w-full"
          type="submit"
          loading={loading}
        >
          Login
        </Button>
      </div>
    </form>
  )
}

function useAuthForm({
  data,
  onSubmit,
  onEdit,
  loading,
}: {
  data: IAuthInput
  onSubmit: (data: IAuthInput) => void
  onEdit: (data: IAuthInput) => void
  loading?: boolean
}) {
  const [email, setEmail] = useState(data.email)
  const [name, setName] = useState(data.name || "")
  const [password, setPassword] = useState(data.password)
  const [confirmPassword, setConfirmPassword] = useState(
    data.confirmPassword || "",
  )
  const [errors, setErrors] = useState<Map<keyof IAuthInput, string>>(new Map())

  const handleChangeEmail = useCallback((value: string) => {
    setEmail(value)
    if (!validationIsEmail(value))
      return setErrors((old) => {
        return old.set("email", "Email format is not valid")
      })
    return setErrors((old) => {
      old.delete("email")
      return old
    })
  }, [])

  const handleChangeName = useCallback((value: string) => {
    setName(value)
    if (!validationIsAlphaOnly(value))
      return setErrors((old) => {
        return old.set("name", "Name cannot contain numbers")
      })
    return setErrors((old) => {
      old.delete("name")
      return old
    })
  }, [])

  const handleChangePassword = useCallback((value: string) => {
    setPassword(value)
    if (!validationMoreThan(value, 5))
      return setErrors((old) => old.set("password", "Needs at least 6 digits"))
    if (!validationIsPassword(value))
      return setErrors((old) => old.set("password", "Cannot contain space"))
    return setErrors((old) => {
      old.delete("password")
      return old
    })
  }, [])

  const handleChangeConfirmPassword = useCallback(
    (value: string) => {
      setConfirmPassword(value)
      if (!validationMoreThan(value, 7))
        return setErrors((old) =>
          old.set("confirmPassword", "Needs at least 8 digits"),
        )
      if (!validationIsPassword(value))
        return setErrors((old) => old.set("confirmPassword", "Cannot contain space"))
      if (value !== password)
        return setErrors((old) => old.set("confirmPassword", "Passwords should match"))
      return setErrors((old) => {
        old.delete("confirmPassword")
        return old
      })
    },
    [password],
  )

  const handleSubmit = (data: IAuthInput) => {
    const { email, password } = data
    handleChangeEmail(email)
    handleChangePassword(password)
    if (errors.size) return onEdit({ ...data })
    onSubmit({ email: email, password: password })
  }

  return {
    email,
    name,
    password,
    confirmPassword,
    errors,
    handleChangeEmail,
    handleChangeName,
    handleChangePassword,
    handleChangeConfirmPassword,
    handleSubmit,
  }
}

export default AuthForm
