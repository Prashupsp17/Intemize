import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";

function App() {
  const [password, setPassword] = useState();
  const [myResponse, setData] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const url = `https://dummyjson.com/products/category/smartphones`;

  const fetchData = async () => {
    const response = await fetch(url);
    const data = await response.json();

    setData(data.products);
    setFilteredData(data.products);
  };

  const filter = () => {
    if (myResponse.length > 0) {
      // const cheapestProduct = myResponse.sort((a, b) => a.price - b.price)[0];
      // console.log(cheapestProduct);
      const minPrice = Math.min(...myResponse.map(item => item.price));
      console.log(minPrice);
      // setFilteredData([cheapestProduct]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const showMyPassword = () => {
    setShowPassword(true);
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <input
        type={showPassword ? "text" : "password"}
        value={password}
        placeholder="password"
        onChange={handleChange}
      />
      <button onClick={showMyPassword}>Show Password</button>
      <button onClick={filter}>Filter</button>
      {filteredData.map((item, i) => {
        return <div key={i}>{item.price}</div>;
      })}
    </div>
  );
}

export default App;
