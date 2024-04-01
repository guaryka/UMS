import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Select from 'react-select';
import { options } from './CreateUser';

const UpdateUserModal = ({ PrevSelected }) => {

    const [selectedRole, setSelectedRole] = useState(null); 
    
    const [Role, setRole] = useState(null);
    
    useEffect(() => {
        const selectedOption = options.find(option => option.id === PrevSelected);
        setSelectedRole(selectedOption);
    }, [PrevSelected]);

    const handleSelectChange = async (selectedOption) => {             
        setSelectedRole(selectedOption);
        //console.log(selectedOption);
        setRole(selectedOption.id);    
    }
  

    const UpdateUser = async () => {
        var currentPage = $("#myTable").DataTable().page();
        var pageLength = $("#myTable").DataTable().page.len();
        var myToast = document.getElementById('toast3');
        // var modal = document.getElementById('edit-user-form');
        // var bootstrapModal = bootstrap.Modal.getInstance(modal);
        var toast = new bootstrap.Toast(myToast);
        var Fullname = $('#edit-fullname').val();
        var Username = $('#edit-username').val();
        var date = $('#edit-date').val();
        var Gender = $('#edit-gender').val();
        var Number = $('#edit-number').val();
        var Email = $('#edit-email').val();
        var id = $('#edit-id').val();
        var stt = $('#edit-stt').val();
        var GroupId = $('#GroupId').val();
        try {
            const response = await fetch('https://localhost:7227/User/UpdateUser', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    FullName: Fullname,
                    UserName: Username,
                    Date: date,
                    Gender: Gender,
                    Number: Number,
                    Email: Email,
                    GroupId: GroupId,
                    Id: id,
                    STT: stt,
                    RoleId: Role,
                })
            });
            if (response.ok) {
                $("#myTable").DataTable().page(currentPage).page.len(pageLength).draw(false);
            }
            // bootstrapModal.hide();
            toast.show();
        } catch (error) {
            console.log('lỗi:', error);
        }
    }
    return (<>
        <div className="modal fade" id="edit-user-form">
            <div className="modal-dialog">
                <div className="modal-content">
                    {/* Modal Header */}
                    <div className="modal-header">
                        <h4 className="modal-title">Modal Heading</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" />
                    </div>
                    {/* Modal body */}
                    <div className="modal-body">
                        <div>
                            <h3>Edit User</h3>
                            <form onSubmit={(event) => event.preventDefault()}>
                                <label htmlFor="edit-username">Username:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="edit-username"
                                    name="UserName"
                                    required=""
                                />
                                <br />
                                <label htmlFor="edit-fullname">Full Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="edit-fullname"
                                    name="FullName"
                                    required=""
                                />
                                <br />
                                <label htmlFor="edit-date">Date of Birth:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="edit-date"
                                    name="Date"
                                    required=""
                                />
                                <br />
                                <label htmlFor="edit-gender">Gender:</label>
                                <select id="edit-gender" className="form-control" req="" uired="">
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                <br />
                                <label htmlFor="edit-number">Phone:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="edit-number"
                                    name="Number"
                                    required=""
                                />
                                <br />
                                <label htmlFor="edit-email">Email:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="edit-email"
                                    name="Email"
                                    required=""
                                />
                                <br />
                                <input
                                    type="number"
                                    id="edit-id"
                                    name="Id"
                                    style={{ display: "none" }}
                                    readOnly=""
                                />
                                <div>
                                    <Select
                                        id="edit-role"
                                        options={options}
                                        value={selectedRole}
                                        onChange={handleSelectChange}
                                    />
                                </div>
                                <label htmlFor="edit-stt">Số thứ tự</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="edit-stt"
                                    required=""
                                />
                            </form>
                        </div>
                    </div>
                    {/* Modal footer */}
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-danger"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={UpdateUser}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div className="toast position-fixed top-0 end-0" id="toast3">
            <div className="toast-header">
                <strong className="me-auto">Thông báo</strong>
                <button type="button" className="btn-close" data-bs-dismiss="toast" />
            </div>
            <div className="toast-body">
                <p>Cập nhật người dùng thành công</p>
            </div>
        </div>
    </>
    );
}
export default UpdateUserModal;