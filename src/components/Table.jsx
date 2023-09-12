import React, { useEffect, useState } from "react";
import {instance} from "../api/axios";
import {Link} from "react-router-dom";

const Table = () => {
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
console.log(items)
  const displayedItems = showAll ? items : items.slice(0, 5);

  return (
    <div className={'containers'}>
      <div className="scrollable-container">
        <table border="1">
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Added</th>
            <th>GameplayTags</th>
            <th>Images</th>
            <th>Introduction</th>
          </tr>
          </thead>
          <tbody>
          {displayedItems.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.added}</td>
              <td>
                <ul>
                  { item.gameplayTags && item.gameplayTags.map((tag, tagIndex) => (
                    <li key={tagIndex}>{tag}</li>
                  ))}
                </ul>
              </td>
              <td>
                <div>
                  {item.images && <img src={item.images.icon} className="images" alt={`${item.name} icon`} />}
                </div>
              </td>
              <td>
                {item.introduction.text}
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
          <Link to="/Pagination" style={{color:"white"}}>
            2 pages
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Table;
