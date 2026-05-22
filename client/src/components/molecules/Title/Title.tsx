type TitleProps = {
  text: string
}

function Title(props: TitleProps) {
  const { text } = props
  return <h1 className="text-center text-xl font-bold">{text}</h1>
}

export default Title
