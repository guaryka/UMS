import React from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

function DeleteGroupModal() {
  const DeleteGroup = async () => {
    var modal = document.getElementById('staticBackdrop');
    var bootstrapModal = bootstrap.Modal.getInstance(modal);
    bootstrapModal.hide();
    var GroupId = Number($('#groupId').val());
    try {
      const response = await fetch(`https://localhost:7227/Group/DeleteGroup/GroupId/${GroupId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log('nhóm đã được xóa', data);
      } else {
        console.log('Không thể xóa nhóm');
      }
    } catch (error) {
      console.log('lỗi:', error);
    }
    $('#html1').jstree('refresh');
  }
  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          {/* Modal Header */}
          <div className="modal-header">
            <h4 className="modal-title">Delete Group</h4>
            <button type="button" className="btn-close" data-bs-dismiss="modal" />
          </div>
          {/* Modal body */}
          <div className="modal-body">Bạn có muốn xóa nhóm không ?</div>
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
              data-bs-dismiss="modal"
              onClick={DeleteGroup}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>

  );
}

export default DeleteGroupModal;
