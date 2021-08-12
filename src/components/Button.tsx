import { ButtonHTMLAttributes } from "react"

import '../styles/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export function Button({ isOutlined = false, ...props }: ButtonProps) { // Colocar o export aqui pois propaga o erro se mudar o nome - Named Export.
  return (
    <button 
      className={`button ${isOutlined ? 'outlined' : ''}`} 
      {...props} 
    /> // tecnica do JS spread operator
  )
}

//export default Button; // Não recomendado usar o default em componentes 