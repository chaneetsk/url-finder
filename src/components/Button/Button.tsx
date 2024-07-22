type ButtonType = {
    buttonText: string,
    buttonType: "submit" | "reset" | "button",
    onClick?: () => void,
}

const Button = ({ buttonText, buttonType, onClick}: ButtonType) => {

  return (
    <>
      <button
        className="w-full bg-blue-500 text-white font-bold py-2 px-4
          rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type={buttonType}
        onClick={onClick}
      >
        { buttonText }
      </button>
    </>
  )
}

export default Button
