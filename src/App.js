import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";

function App() {
  const [password, setPassword] = useState();
  const [myResponse, setData] = useState([]);
  console.log(myResponse);
  const [showPassword, setShowPassword] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [selected, setSelected] = useState();
  const [list, setList] = useState([]);

  const checkboxes = (value) => {
    if (!list.includes(value)) {
      setList([...list, value]);
    }

  }

  const selectAll = () => {
    const selectAll = document.querySelector(".select-all").checked;
    if (selectAll) {
      let selected = [];

      let selecting = document.querySelectorAll(".my");
      for (let i = 0; i < selecting.length; i++) {
        selecting[i].checked = selectAll;
        if (selecting[i].checked) {
          selected.push(selecting[i].value);
        }

      }

      console.log(selected);
    } else {
      let selecting = document.querySelectorAll(".my")
      for (let i = 0; i < selecting.length; i++) {
        selecting[i].checked = false;
      }


    }
  }

  const url = `https://dummyjson.com/products/category/smartphones`;

  const fetchData = async () => {
    const response = await fetch(url);
    const data = await response.json();

    setData(data.products);
    setFilteredData(data.products);
  };

  const filter = () => {
    const updatedData = myResponse.sort((a, b) => a.price - b.price)[0];
    console.log(updatedData);
  };
  let ProductNames = []
  const ProductNamesArray = () => {

    ProductNames = myResponse.map(item => item.brand);
    console.log(ProductNames);
  }
  const arr = [123, 121, 122]
  const changeStatus = () => {
    const updatedData = myResponse.map(item => {
      if (arr.includes(item.id)) {
        item.availabilityStatus = "Sold";
      }
      return item;
    })
    console.log(updatedData);
   
  }
  const addNewProperty = () => {
    const updatedData = myResponse.map(item => ({
      ...item,
      status:"in-progress"
    }));
    // console.log(updatedData);
    setData(updatedData);
  }

  const removeProperty = () => {
    const updatedData = myResponse.map(item => {
      const newItem = {...item};

      delete newItem.status;

      return newItem;


    })
    // console.log(updatedData);
    setData(updatedData);
  }
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
      <button onClick={ProductNamesArray}>Names</button>
      <button onClick={changeStatus}>Status</button>
      <button onClick={addNewProperty}>addNewProperty</button>
      <button onClick={removeProperty}>removeProperty</button>
      

      {filteredData.map((item, i) => {
        return <div key={i}>{item.price}</div>;
      })}
      <div className="checkboxes-wrapper">
        <label>Select All</label>
        <input type="checkbox" className="select-all" id="select-all" value="all" onChange={(e) => selectAll(e.target.value)} />
        <label>One</label>
        <input type="checkbox" className="my" id="one" value="one" onChange={(e) => checkboxes(e.target.value)} />
        <label>Two</label>
        <input type="checkbox" className="my" id="two" value="two" onChange={(e) => checkboxes(e.target.value)} />
        <label>Three</label>
        <input type="checkbox" className="my" id="three" value="three" onChange={(e) => checkboxes(e.target.value)} />
      </div>

    </div>
  );
}

export default App;
