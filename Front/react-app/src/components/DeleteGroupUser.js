import React from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

function DeleteGroupUserModal() {
    return (
        <div
            className="modal fade"
            id="deleteGroupUser"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    {/* Modal Header */}
                    <div className="modal-header">
                        <h4 className="modal-title">Delete Group User</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" />
                    </div>
                    {/* Modal body */}
                    <div className="modal-body">
                        Bạn có muốn xóa nhóm người dùng này không ?
                    </div>
                    {/* Modal footer */}
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary btn-lg"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger btn-lg"
                            id="deleteGroup_button"  
                            data-bs-dismiss="modal"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DeleteGroupUserModal;
export const DeleteGroupUser = async (e) => {
    var currentPage = $("#myTable").DataTable().page();
    var pageLength = $("#myTable").DataTable().page.len();
    var modal = document.getElementById('deleteGroupUser');
    var bootstrapModal = bootstrap.Modal.getInstance(modal);
    bootstrapModal.hide();
    // var a = $('#NhomCha').val();
    try {
        const response = await fetch('https://localhost:7227/User/DeleteUser', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Id: e,
            })
        });
        if (response.ok) {
            $("#myTable").DataTable().page(currentPage).page.len(pageLength).draw(false);
        }
        // var myToast = document.getElementById('toast2');
        // var toast = new bootstrap.Toast(myToast);
        // toast.show();
    } catch (error) {
        console.log('lỗi:', error);
    }
}