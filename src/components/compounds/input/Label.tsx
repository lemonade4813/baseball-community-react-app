

interface ILabel{
  label : string;
  htmlFor : string;
}


export default function Label({label, htmlFor} : ILabel) {
  return (
    <label 
      htmlFor={htmlFor} 
      style={{marginRight : '16px', marginLeft : '16px'}}
    >{label}
    </label>
  )
}

