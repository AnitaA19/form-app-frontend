import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';

function AdminPanel() {
    const { t } = useTranslation();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users`); 
                if (!response.ok) {
                    throw new Error('Error fetching users');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDeleteUser = async (userID) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${userID}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error deleting user');
            }
            setUsers((prevUsers) => prevUsers.filter((user) => user.ID !== userID));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleUpdateRole = async (userID, newRole) => {
        const endpoint = newRole === 'admin'
            ? `${process.env.REACT_APP_API_URL}/users/${userID}/make-admin`
            : `${process.env.REACT_APP_API_URL}/users/${userID}/revoke-admin`;

        try {
            const response = await fetch(endpoint, {
                method: 'PUT',
            });
            if (!response.ok) {
                throw new Error(`Error updating role to ${newRole}`);
            }
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.ID === userID ? { ...user, role: newRole } : user
                )
            );
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4" style={{ color: '#A593D1' }}>{t('admin_panel')}</h1>
            <p className="text-center text-muted mb-4">{t('manage_users')}</p>

            {loading ? (
                <div className="text-center">
                    <div className="spinner-border" style={{ borderColor: '#A593D1' }} role="status">
                        <span className="sr-only">{t('loading')}</span>
                    </div>
                </div>
            ) : (
                <div>
                    <h2 className="text-center mb-4" style={{ color: '#4B4B4B' }}>{t('user_management')}</h2>
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover shadow-sm" style={{ borderColor: '#dcdcdc' }}>
                            <thead style={{ backgroundColor: '#f1f1f1' }}>
                                <tr>
                                    <th style={{ color: '#4B4B4B' }}>{t('id')}</th>
                                    <th>{t('email')}</th>
                                    <th style={{ color: '#4B4B4B' }}>{t('role')}</th>
                                    <th>{t('actions')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.ID}>
                                        <td style={{ color: '#A593D1' }}>{user.ID}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className={`badge ${user.role === 'admin' ? 'badge-success' : 'badge-secondary'}`} style={{ color: '#A593D1' }}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <button
                                                className="btn btn-sm"
                                                style={{
                                                    backgroundColor: '#A593D1',
                                                    color: 'white',
                                                    marginRight: '10px',
                                                    borderRadius: '5px',
                                                }}
                                                onClick={() => handleUpdateRole(user.ID, user.role === 'user' ? 'admin' : 'user')}
                                            >
                                                {user.role === 'user' ? t('make_admin') : t('revoke_admin')}
                                            </button>
                                            <button
                                                className="btn btn-sm"
                                                style={{
                                                    backgroundColor: '#dc3545',
                                                    color: 'white',
                                                    borderRadius: '5px',
                                                }}
                                                onClick={() => handleDeleteUser(user.ID)}
                                            >
                                                {t('delete')}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <div className="mt-4 text-center">
                <Link to="/" className="btn" style={{
                    backgroundColor: '#A593D1',
                    color: 'white',
                    borderRadius: '5px',
                    textDecoration: 'none',
                    padding: '10px 20px'
                }}>
                    {t('go_back_home')}
                </Link>
            </div>
        </div>
    );
}

export default AdminPanel;