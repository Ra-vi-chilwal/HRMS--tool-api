import React from 'react'

function Search() {
  return (
        <div className="user-notification-block align-right d-inline-block">
                        <div className="top-nav-search">
                          <form>
                            <input type="text" className="form-control" placeholder="Search here" />
                            <button className="btn" type="submit"><i className="fa fa-search" /></button>
                          </form>
                        </div>
                      </div>
  );
}

export default Search;