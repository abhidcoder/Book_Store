import React, { useState,useContext,useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {BookContext} from './createContext';
import "./App.css"



function BookStoreApp() {
  
  const [carts,setCarts] = useContext(BookContext);

  const ImgContainerStyle = {
    height: '200px',
    width: '300px',
    backgroundColor: 'red',
  };

  
 const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchQuery('');
  };




const [url, setUrl] = useState('https://reports-uat.inspektlabs.com/bstore');

const [bookListData, setBookListData] = useState([]);

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    console.log("Response", response);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    console.log(data);
    setBookListData(data);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  fetchData(url);
}, [url]);

const handlebclick = () => {
  const newUrl = 'https://reports-uat.inspektlabs.com/bstore/price/lh';
  setUrl(newUrl);
  fetchData(newUrl);
  };

const handlebclickhl = () => {
    const newUrl = 'https://reports-uat.inspektlabs.com/bstore/price/hl';
    setUrl(newUrl);
    fetchData(newUrl);
  };

  const handlebclickE = () => {
    const newUrl = 'https://reports-uat.inspektlabs.com//bstore/lang/English';
    setUrl(newUrl);
    fetchData(newUrl);
  };
 
  const handlebclickA = () => {
    const newUrl = 'https://reports-uat.inspektlabs.com//bstore/lang/Arabic';
    setUrl(newUrl);
    fetchData(newUrl);
  };

  const handlebclickF = () => {
    const newUrl = 'https://reports-uat.inspektlabs.com//bstore/lang/French';
    setUrl(newUrl);
    fetchData(newUrl);
  };

  const handlebclickM = () => {
    const newUrl = 'https://reports-uat.inspektlabs.com//bstore/lang/M';
    setUrl(newUrl);
    fetchData(newUrl);
  };
 
const filteredBooks = bookListData.filter((book) => {
  return (
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );
});

 
    
    const [cart, setCart] = useState([]);
    const [cartLength, setCartLength] = useState(0);


    const handleButtonClick = (book) => {
      window.open(book.link, '_blank');
    };

    const addBook = (book) => {
      setCart([...cart, book]);
      setCarts(cart)
      setCartLength(cart.length+1);
    };

    const removeBook = (index) => {
      const updatedCart = [...cart];
      updatedCart.splice(index, 1);
      setCart(updatedCart);
      setCartLength(updatedCart.length);
      setCarts(updatedCart)

    };
    

    const renderCartItems = () => {


      return (
      <div>
    
        <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search books"
        className="search-bar"
      />
        <ul>
          {cart.map((book, index) => (
            <div style={{marginTop:'6%'}} key={index}>
              <img style={{height:'5%',width:'5%',marginBottom:'-3%'}} src={book.imageLink} alt={book.title} />
              <h5 style={{marginTop:'4%'}}>{book.title}</h5>
              <p>Language: <p>{book.language}</p></p>
              <p>Author: <p>{book.author}</p></p>
              <button onClick={() => removeBook(index)}>Remove</button>
            </div>
          ))}
        </ul>
        </div>
      );
    };
    
    
    const [isCartVisible, setIsCartVisible] = useState(false);
    
    const toggleCartVisibility = () => {
      setIsCartVisible(!isCartVisible);
    };
    
    const handleSelect = (eventKey) => alert(`All your select items in the cart will be lost`);
        
    
      // const [bookList, setBookList] = useState(bookListData); // Use `bookListData` instead of `bookList`
    
      return (
        <div style={{marginTop:'2%',marginLeft:'2%'}}>
        
      <Nav variant="pills" activeKey="1" onSelect={handleSelect}>
      <Nav.Item>
        <Nav.Link eventKey="1" href={window.location.href}>
         Refresh BookStore
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={handlebclick} title="Item">
          Filter By Price Lowest To Highest
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={handlebclickhl} enabled>
        Filter By Price Highest To Lowest
        </Nav.Link>
      </Nav.Item>
      <NavDropdown title="Filter By Genre" id="nav-dropdown">
        <NavDropdown.Item onClick={handlebclickE}>English</NavDropdown.Item>
        <NavDropdown.Item onClick={handlebclickA} >Arabic</NavDropdown.Item>
        <NavDropdown.Item onClick={handlebclickF} >French</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={handlebclickM}>Mixed</NavDropdown.Item>
      </NavDropdown>
      </Nav>
        
        <br></br>

      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search books"
          className="search-bar"
        />
      </form>
  
          <h1 style={{ textAlign: 'center',marginTop:'2%' }}>Welcome To Book Store App</h1>
          <p style={{ color:'orange', textAlign: 'center',marginTop:'2%' }}>Please scroll left & right to view your books</p>
           <div className="container">
         
          
            {filteredBooks.map((book, index) => (
              <div key={index}>
               
                <img style={ImgContainerStyle} src={book.imageLink} alt={book.title} />
              <div style={{ marginTop:'5%' }}>
                  <h4>{book.title}</h4>
                 <h5>Language: <p style={{ color: 'red' }}>{book.language}</p></h5> 
                 <h5>Author: <p style={{ color: 'green' }}>{book.author}</p></h5> 
                 <h5>Year: <p style={{ color: 'orange' }}>{book.year}</p></h5> 
                 <h5>Price: <p style={{ color: 'purple' }}>{book.price}</p></h5> 
                  <button  onClick={() => addBook(book)}>Add Book</button>
                  <br></br>
                  <br></br>
                  <button onClick={handleButtonClick.bind(null, book)}>More Details</button>
                <div>
             
              </div>
              
                </div>
                
              </div>
              
            ))}
          </div>
        
        <div>
        <h1 style={{ textAlign: 'center',marginTop:'2%' }}>Click On Your Cart Below To Edit Your Items</h1>
        {isCartVisible && renderCartItems()} {/* Conditional rendering of cart items */}
        <h4 className="cart-emoji">Total <span style={{color:'red',marginLeft:'2%',marginRight:'2%'}}> {cartLength} </span> items in your cart</h4>
        <button className="cart-button" onClick={toggleCartVisibility}>
          {isCartVisible ? "Hide Cart" : "Show Cart "}
        </button>
        <img className="cart-emoji" style={{height:'5%',width:'5%'}}src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHM77I1vm6e38Y0SXDuPFvMMrAdNeMXzIwiGggM5Q&s" alt="here" onClick={toggleCartVisibility} />
        </div>
          
          <Link to="/check_out" className="checkout-button">Click Here To Check Out</Link>

     
       
          
        </div>
      );
    }

    

    export default BookStoreApp;




// fetch('http://localhost:8000/')
//   .then(response => response.json())
//   .then(data => {
//     setBookListData(data)
//     console.log(data);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });

// useEffect(() => {

//   fetch('http://localhost:8000/')
//       .then(response => response.json())
//       .then((jsonRes) => setBookListData(jsonRes))
      
//   })
    