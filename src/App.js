import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const API = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Failed to fetch data", error);
        window.alert('failed to fetch data'); // Ensure the alert is triggered
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="App">
      <h2>Employee Data Table</h2>
      <table
        style={{
          width: "98%",
          margin: "20px auto",
          borderCollapse: "collapse",
          borderBottom: "2px solid #4CAF50",
          padding: "10px",
        }}
      >
        <thead
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
          }}
        >
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((item) => (
              <tr
                key={item.id}
                style={{
                  borderBottom: "1px solid black",
                }}
              >
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Pagination Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <div>
          <button
            onClick={() => handlePageChange("prev")}
            style={{
              padding: "10px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              cursor: "pointer",
              height: "40px",
            }}
          >
            Previous
          </button>
        </div>

        <div
          style={{
            padding: "10px",
            backgroundColor: "#4CAF50",
            borderRadius: "5px",
            color: "white",
          }}
          aria-label={`Page ${currentPage}`} // Add an accessible label for tests
        >
          {currentPage}
        </div>

        <div>
          <button
            onClick={() => handlePageChange("next")}
            style={{
              padding: "10px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              cursor: "pointer",
              height: "40px",
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
