import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function DetailsGroupModal() { 
    return (
        <div className="modal fade" id="GroupDetails">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Details</h4>
                    </div>
                    <div className="modal-body">
                        <form id="XemChiTiet" onSubmit={(event) => event.preventDefault()}>
                            <div className="form-group">
                                <label>Mã nhóm</label>
                                <input type="text" className="form-control" id="Code" readOnly="" />
                            </div>
                            <div className="form-group">
                                <label>Tên Nhóm</label>
                                <input type="text" className="form-control" id="Name" readOnly="" />
                            </div>
                            <div className="form-group">
                                <label>Số thứ tự</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="GroupSTT"
                                    readOnly=""
                                />
                            </div>
                        </form>
                    </div>
                    {/* Modal footer */}
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-danger btn-lg"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default DetailsGroupModal;