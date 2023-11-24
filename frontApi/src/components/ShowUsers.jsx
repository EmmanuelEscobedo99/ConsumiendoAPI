import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../ShowUsers.css'; // Importa el archivo de estilos CSS

export const ShowUsers = () => {
    const URL = 'https://jsonplaceholder.typicode.com/users';
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [detailsUser, setDetailsUser] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [filter, setFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        filterUsers();
    }, [users, filter]);

    const getUsers = async () => {
        const res = await axios.get(URL);
        setUsers(res.data);
    };

    const filterUsers = () => {
        const filtered = users.filter((user) => {
            const searchTerms = [user.name, user.username, user.email].map(term => term.toLowerCase());
            return searchTerms.some(term => term.includes(filter.toLowerCase()));
        });
        setFilteredUsers(filtered);
    };

    const clearFilter = () => {
        setFilter('');
    };

    const getDetailsUsers = async (userId) => {
        try {
            const res = await axios.get(URL + '/' + userId);
            setDetailsUser(res.data);
            setIsPopupOpen(true); // Abre el popup cuando se obtienen los detalles
        } catch (error) {
            console.error('Error fetching details:', error);
        }
    };

    const closePopup = () => {
        setDetailsUser(null); // Limpia los detalles al cerrar el popup
        setIsPopupOpen(false);
    };

    // Paginación
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='container'>
            <h2>USERS</h2>
            <div className='row'>
                <div className='col'>
                    <div className='filter-section'>
                        <input
                            type='text'
                            placeholder='Filter by name, username, or email'
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                        <button className='btn btn-danger' onClick={clearFilter}>
                            Clear Filter
                        </button>
                    </div>
                    <table className='table'>
                        <thead className='table-primary'>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button
                                            className='btn btn-info'
                                            style={{ marginRight: '10px' }}
                                            onClick={() => getDetailsUsers(user.id)}
                                        >
                                            <i className='fas fa-info-circle'></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Paginación */}
                    <ul className='pagination'>
                        {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, index) => (
                            <li key={index} className='page-item'>
                                <button className='page-link' onClick={() => paginate(index + 1)}>
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Popup */}
            {isPopupOpen && (
                <div className='popup'>
                    <div className='popup-content'>
                        <span className='popup-close' onClick={closePopup}>
                            &times;
                        </span>
                        <h3>User Details</h3>
                        {detailsUser && (
                            <>
                                <p>Id: {detailsUser.id}</p>
                                <p>Name: {detailsUser.name}</p>
                                <p>Username: {detailsUser.username}</p>
                                <p>Email: {detailsUser.email}</p>

                                <p>Street: {detailsUser.address.street}</p>
                                <p>Suite: {detailsUser.address.suite}</p>
                                <p>City: {detailsUser.address.city}</p>
                                <p>Phone: {detailsUser.phone}</p>
                                <p>Website: {detailsUser.website}</p>

                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
