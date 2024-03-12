import clsx from "clsx";

const Button = ({ type, onClick, text, disabled, extraClassName }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        "btn btn-primary",
        extraClassName,
        { "disabled": disabled },
        { "btn-hover": !disabled }
      )}
    >
      {text}
    </button>
  )
}

export default Button;
