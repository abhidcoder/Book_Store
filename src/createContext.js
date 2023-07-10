import React, {useState} from 'react';

export const BookContext = React.createContext();

export const BookProvider = (props) => {
  const [carts, setCarts] = useState(0);
  return (
    <BookContext.Provider value={[carts, setCarts]}>
      {props.children}
    </BookContext.Provider>
  )
}