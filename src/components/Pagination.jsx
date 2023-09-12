import React, {useEffect, useState} from "react";
import {instance} from "../api/axios";
import {Link} from "react-router-dom";


const Pagination = () => {
  const [items, setItems] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    instance.get('cosmetics/br/new')
      .then(response => {
        if (response.data && response.data.data && Array.isArray(response.data.data.items)) {
          setItems(response.data.data.items);
        }
      })
      .catch(err => {
        console.error("Error fetching data:", err);
      });
  }, []);


  const sliceItems = showAll ? items : items.slice(0, 5);
  console.log(items)
  return (
    <div className={'container'}>
      <div className="scrollable-container">
        <table border="1">
          <thead>
          <tr>
            <th>Rarity</th>
            <th>Set</th>
            <th>Type</th>
          </tr>
          </thead>
          <tbody>
          {sliceItems.map((item, index) => (
            <tr key={index}>
              <td className={'pagination-td'}>
                {item.rarity && Object.entries(item.rarity).map(([key, value], idx) => (
                  <div key={idx}>
                    {value}
                  </div>
                ))}
              </td>
              <td className={'pagination-td'}>
                {item.set && Object.entries(item.set).map(([key, value], idx) => (
                  <div key={idx}>
                    {value}
                  </div>
                ))}
              </td>
              <td className={'pagination-td'}>
                <div>{item.type && item.type.backendValue}</div>
                <div>{item.type && item.type.displayValue}</div>
                <div>{item.type && item.type.value}</div>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      <div className="btn-wrapper">
        <button className="btn-show" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Less" : "Show All"}
        </button>
        <button className="btn-show">
          <Link to="/Table" style={{color:"white"}}>
            1 pages
          </Link>
        </button>
      </div>
    </div>
  )
}
export default Pagination