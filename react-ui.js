function App() {
  const { useEffect, useState } = React;

  const [data, setData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("Select Employee");
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(async () => {
    fetch("./data.json")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  useEffect(async () => {
    if (data.length > 0) {
      setEmployeeData(returnData(selectedEmployee, data));
    }
  }, [selectedEmployee]);

  const handleChange = (e) => {
    setSelectedEmployee(e.target.value);
  };

  const returnData = (selectedEmployee, data) => {
    for (var i = 0; i < data.length; i++) {
      if (data[i]["Name and Principal Position"] == selectedEmployee) {
        let curData = [];
        for (const [key, value] of Object.entries(data[i])) {
          curData.push(`${key}: ${value}`);
        }
        return curData;
      }
    }
  };

  return (
    <div>
      <h1>Facebook 2020 Compensation Summary</h1>
      <label for="employee">Employee: </label>
      <select
        name="employee"
        id="employee"
        onChange={(e) => handleChange(e, setSelectedEmployee, setEmployeeData)}
      >
        {selectedEmployee === "Select Employee" ? (
          <option value="Select Employee">Select Employee...</option>
        ) : null}
        {data.map((employee) => {
          return (
            <option value={employee["Name and Principal Position"]}>
              {employee["Name and Principal Position"]}
            </option>
          );
        })}
      </select>
      {selectedEmployee !== "Select Employee" ? <h2>Results:</h2> : null}
      {employeeData.map((data) => (
        <p>{data}</p>
      ))}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
