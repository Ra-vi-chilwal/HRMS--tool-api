import React from 'react'

function PageHeader(props) {
  return (
    <>
    <div className="row">
                <div className="col-md-12">
                  <div className="card ctm-border-radius shadow-sm grow">
                    <div className="card-body py-4">
                      <div className="row">
                        <div className="col-md-12 mr-auto text-left">
                          <div className="custom-search input-group">
                            <div className="custom-breadcrumb">
                       
                              <h4 className="text-dark" style={{textTransform:"capitalize"}}>{props && props.title}</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    </>
  )
}

export default PageHeader