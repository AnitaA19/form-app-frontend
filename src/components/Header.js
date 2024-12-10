import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
    return (
        <header className="bg-light py-3">
            <div className="container d-flex justify-content-between align-items-center">
                <h1 className="mb-0">Forms</h1>
                <div className="d-flex w-50 justify-content-center">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Search"
                    />
                </div>
                <button className="btn btn-primary ml-2">Sign in</button>
            </div>
        </header>
    );
}

export default Header;
