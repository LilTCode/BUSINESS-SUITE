import { useState } from 'react';
import { FaUserTie, FaEdit, FaTrash } from 'react-icons/fa';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'John Smith',
      position: 'Sales Manager',
      department: 'Sales',
      email: 'john@example.com',
      status: 'Active',
    },
    // Add more mock data
  ]);

  const [newEmployee, setNewEmployee] = useState({
    name: '',
    position: '',
    department: '',
    email: '',
  });

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (
      newEmployee.name &&
      newEmployee.position &&
      newEmployee.department &&
      newEmployee.email
    ) {
      setEmployees([
        ...employees,
        {
          id: employees.length + 1,
          ...newEmployee,
          status: 'Active',
        },
      ]);
      setNewEmployee({ name: '', position: '', department: '', email: '' });
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center mb-8">
        <FaUserTie className="text-3xl text-blue-500 mr-3" />
        <h1 className="text-3xl font-bold gradient-text">
          Employee Management
        </h1>
      </div>

      {/* Add Employee Form */}
      <form onSubmit={handleAddEmployee} className="glass p-6 rounded-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Employee Name"
            className="glass px-4 py-2 rounded-lg"
            value={newEmployee.name}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Position"
            className="glass px-4 py-2 rounded-lg"
            value={newEmployee.position}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, position: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Department"
            className="glass px-4 py-2 rounded-lg"
            value={newEmployee.department}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, department: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            className="glass px-4 py-2 rounded-lg"
            value={newEmployee.email}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, email: e.target.value })
            }
          />
        </div>
        <button
          type="submit"
          className="mt-4 glass px-6 py-2 rounded-lg hover:scale-105 transition-transform"
        >
          Add Employee
        </button>
      </form>

      {/* Employee List */}
      <div className="glass rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Position</th>
              <th className="px-4 py-3 text-left">Department</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="border-t border-gray-700">
                <td className="px-4 py-3">{employee.name}</td>
                <td className="px-4 py-3">{employee.position}</td>
                <td className="px-4 py-3">{employee.department}</td>
                <td className="px-4 py-3">{employee.email}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 text-sm rounded-full glass">
                    {employee.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="p-1 hover:text-blue-500">
                      <FaEdit />
                    </button>
                    <button className="p-1 hover:text-red-500">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeManagement;
