import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [students, setstudents] = useState([]);
  const [rollNumber, setRollNumber] = useState("");
  const [name, setName] = useState("");
  const [studentsPresent, setStudentsPresent] = useState(0);

  // Function will be called when check in button will be clicked.
  function handelClick() {
    if (name !== "" && rollNumber !== "") {
      let result = [...students, { rollNumber, name, checkInTime: new Date() }];
      setstudents(result);
    }
  }

  // Function will be called when check out button will be clicked.
  function checkoutHandel(checkoutRollNumber, checkoutName) {
    const updatedStudents = students.map(student => {
      if (student.rollNumber === checkoutRollNumber && student.name === checkoutName) {
        return { ...student, checkOutTime: new Date() };
      }
      return student;
    });
    setstudents(updatedStudents);
  }

  // Count the number of students present in the class currently.
  function countPresentStudents() {
    console.log(students);
    var totalPresentStudents = 0;
    students.map((ele) => {
      if (!("checkOutTime" in ele) === true) {
        totalPresentStudents++;
      }
    })
    setStudentsPresent(totalPresentStudents);
  }


  useEffect(() => {
    countPresentStudents();
    setRollNumber("");
    setName("");
  }, [students])


  return (
    <div className="App">
      <form onSubmit={e => { e.preventDefault(); }} className="w-50" >
        <div className="form-group">
          <label for="text">Roll Number:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Roll Number"
            value={rollNumber}
            required={true}
            onChange={(e) => setRollNumber(e.target.value)} />
        </div>
        <div className="form-group mt-2">
          <label for="text">Name:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group mt-3">
          <button
            type="submit" students
            className="btn btn-primary"
            onClick={handelClick}>Check In</button>
        </div>
      </form>
      <div className='mt-3'>
        <h5>Total Students Present -: {studentsPresent}</h5>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Roll Number</th>
            <th>Name</th>
            <th>Check In Time</th>
            <th>Check Out Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr scope="row" key={student.rollNumber}>
              <td>{student.rollNumber}</td>
              <td>{student.name}</td>
              <td>{student.checkInTime.toString()}</td>
              <td>{student.checkOutTime ? student.checkOutTime.toString() : '-'}</td>
              <td>
                {student.checkOutTime ? '-' : (
                  <button className="btn btn-danger p-2" onClick={() => checkoutHandel(student.rollNumber, student.name)}>Check Out</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default App;
