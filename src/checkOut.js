import {React, useState } from 'react';
import { useContext } from 'react';
import { BookContext } from './createContext';
import "./checkOut.css"


function CheckoutPage() {

const [carts,setCarts] = useContext(BookContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform any desired action with the customer's contact details
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone:', phone);
    // Reset the form
    const data = {
      name: name,
      email: email,
      phone: phone,
    };

    fetch('https://reports-uat.inspektlabs.com/bstore/store_data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(result => {
        console.log(result)
      })
      .catch(error => {
       console.log(error)
      });

      alert(`We have Got your Order Our Representative will contact you in a whicle to confirm the same`)

  };


  const renderCartItems = () => {
    return (
      <ul>
        {carts.map((book, index) => (
          <div style={{marginTop:'6%'}} key={index}>
            <img style={{height:'5%',width:'5%',marginBottom:'-3%'}} src={book.link} alt={book.title} />
            <h5 style={{marginTop:'4%'}}>{book.title}</h5>
            <p>Language: <p>{book.language}</p></p>
            <p>Author: <p>{book.author}</p></p>
          </div>
        ))}
      </ul>
    );
  };



  return (
    <div style={{marginTop:'2%'}}>
      <h1>Online Book Store Checkout</h1>
      {carts.length >0 && (
  <div className="container">{renderCartItems()}</div>
        )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={handleNameChange} required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} required />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input type="tel" id="phone" value={phone} onChange={handlePhoneChange} required />
        </div>
        
        <button style={{marginTop:'2%',marginBottom:'2%', color:'black'}} type="submit">Submit And Place Order</button>
    
      </form>
    </div>
  );
}


export default CheckoutPage;
