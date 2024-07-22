
type ButtonType = {
    buttonText: string
    buttonType: "submit" | "reset" | "button"
    onClick?: () => void
}

const Button = ({ buttonText, buttonType, onClick }: ButtonType) => {

  return (
    <>
      <button
        type={buttonType}
        onClick={onClick}
      >
        { buttonText }
      </button>
    </>
  )
}

export default Button
