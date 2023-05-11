import React, { Fragment } from 'react'

interface SideBarProps {
  setCategory?:React.Dispatch<React.SetStateAction<string>>;
}

const SideBar = (props:SideBarProps) => {
  const categories = [
    'Mobile',
    'Laptop',
    'Electronics',
    'Toys',
    'Footewear'
]


  return (
    <Fragment>
        <div className="main">
            
            <h3 className='catheading'>Categories</h3>
            {
              categories.map((item,index)=>(
                <ul key={index} onClick={()=>props.setCategory&&props.setCategory(item)}>
                <li>{item}</li>
              </ul>
              ))
            }
        </div>
    </Fragment>
  )
}

export default SideBar;
