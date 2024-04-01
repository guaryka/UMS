import React from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


function EditGroupModal(){
    const CapNhatNhom = async () => {
        // var modal = document.getElementById('EditGroup');
        // var bootstrapModal = new bootstrap.Modal(modal);
        // bootstrapModal.hide();
        var tenNhom = $('#groupName').val();
        var IdNhom = $('#groupCode').val();
        var Id = Number($('#groupId').val());
        var stt = $('#groupStt').val();
        var parent = $('#parentId').val();
        try {
            const response = await fetch('https://localhost:7227/Group/UpdateGroup', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Name: tenNhom,
                    Code: IdNhom,
                    GroupId: Id,
                    STT: stt,
                    Parent_Id: parent,
                })
            });
            const data = await response.json();
            console.log(data);
            await $('#html1').jstree('refresh');

            console.log('nhóm đã được sửa:', data);
        } catch (error) {
            console.log('lỗi:', error);
        }
    }
    return (
        <div className="modal fade" id="EditGroup">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Edit group</h4>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={(event) => event.preventDefault()}>
                            <div className="form-group">
                                <label>Id nhóm</label>
                                <input type="text" className="form-control" id="groupId"/>
                            </div>
                            <div className="form-group">
                                <label>Tên nhóm</label>
                                <input type="text" className="form-control" id="groupName" />
                            </div>
                            <div className="form-group">
                                <label>Mã nhóm</label>
                                <input type="text" className="form-control" id="groupCode" />
                            </div>
                            <div className="form-group">
                                <label>Số thứ tự</label>
                                <input type="text" className="form-control" id="groupStt" />
                            </div>
                            <div className="form-group">
                                <label>Nhóm cha</label>
                                <input type="text" className="form-control" id="parentId"/>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-danger btn-lg" data-bs-dismiss="modal">Close</button>
                        <button onClick={CapNhatNhom} className="btn btn-primary btn-lg" data-bs-dismiss="modal">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditGroupModal;
