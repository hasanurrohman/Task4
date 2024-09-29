import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, update, remove } from "firebase/database";
import { Link } from 'react-router-dom';

const TableUser = () => {
  const [userData, setUserData] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const db = getDatabase();

  useEffect(() => {
    const userRef = ref(db, 'users/');
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val());
      });
      setUserData(arr);
    });
  }, [db]);

  const handleCheckboxChange = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter((userId) => userId !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      const allUserIds = userData.map((user) => user.id);
      setSelectedUsers(allUserIds);
    }
    setSelectAll(!selectAll);
  };

  const handleBatchBlock = () => {
    selectedUsers.forEach((id) => {
      update(ref(db, `users/${id}`), { status: 'blocked' });
    });
    setSelectedUsers([]);
  };

  const handleBatchUnblock = () => {
    selectedUsers.forEach((id) => {
      update(ref(db, `users/${id}`), { status: 'active' });
    });
    setSelectedUsers([]);
  };

  const handleBatchDelete = () => {
    selectedUsers.forEach((id) => {
      remove(ref(db, `users/${id}`));
    });
    setSelectedUsers([]);
  };

  return (
    <div className="container mx-auto mt-10 py-6 px-6">
      <h1 className="text-2xl mb-6 text-center">User Management</h1>

      <div className="mb-4">
        <button
          onClick={handleBatchBlock}
          className="bg-red-500 text-white px-4 py-2 rounded mr-2"
          disabled={selectedUsers.length === 0}
        >
          Block Selected
        </button>
        <button
          onClick={handleBatchUnblock}
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          disabled={selectedUsers.length === 0}
        >
          Unblock Selected
        </button>
        <button
          onClick={handleBatchDelete}
          className="bg-gray-500 text-white px-4 py-2 rounded"
          disabled={selectedUsers.length === 0}
        >
          Delete Selected
        </button>
      </div>

      <table className="min-w-full table-auto border">
        <thead>
          <tr>
            <th className="px-4 py-2">
              <input
                id="selectAll"
                name="selectAll"
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
              <label className="ml-2" htmlFor="selectAll">All</label>

            </th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Status</th>
          </tr>
        </thead>
        <tbody className="px-6">
          {userData.map((item) => (
            <tr className="border" key={item.id}>
              <td className="px-12 py-2">
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(item.id)}
                  onChange={() => handleCheckboxChange(item.id)}
                />
              </td>
              <td className="px-4 py-2 border">{item.username}</td>
              <td className="px-4 py-2 border">{item.email}</td>
              <td className="px-4 py-2 border">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-center mt-8">
        <Link to="/">
          <button className="bg-red-500 text-white px-12 py-2 rounded">
            Log Out
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TableUser;
