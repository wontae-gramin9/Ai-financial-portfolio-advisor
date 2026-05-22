type SubTitleProps = {
  text: string
  bold?: boolean
}

function SubTitle(props: SubTitleProps) {
  const { text, bold } = props
  const fontBold = bold ? 'font-bold' : ''
  return <h3 className={`text-center ${fontBold}`}>{text}</h3>
}

export default SubTitle
