import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'select2';
import Select from 'react-select';


export const options = [
  { value: 'Giám đốc', id: 1, label: 'Giám đốc' },
  { value: 'Trưởng phòng', id: 2, label: 'Trưởng phòng' },
  { value: 'Nhân viên', id: 3, label: 'Nhân viên' }
]
function CreateUserModal() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [Role, setRole] = useState(null);
  const handleRoleChange = async (selectedOption) => {
    setSelectedRole(selectedOption);
    console.log(selectedOption);
    setRole(selectedOption.id);
  }

  useEffect(() => {
    console.log(Role);
  }, [Role]);

  const SubUserCre = () => {
    if ($(".valNameUser").val() === "") {
      alert("Tên chưa điền");
    } else if ($(".valUserName").val() === "") {
      alert("Username chưa điền");
    } else if ($(".valSdt").val() === "") {
      alert("Số điện thoại chưa điền");
    } else if ($(".valEmail").val() === "") {
      alert("Email chưa điền");
    } else if ($(".valSttUser").val() === "") {
      alert("Stt chưa điền");
    }
    else { DangKiNguoiDung(); }
  }
  const DangKiNguoiDung = async () => {
    var currentPage = $("#myTable").DataTable().page();
    var pageLength = $("#myTable").DataTable().page.len();
    var myToast = document.getElementById('toast1');
    var toast = new bootstrap.Toast(myToast);
    var modal = document.getElementById('UserCreate');
    var bootstrapModal = bootstrap.Modal.getInstance(modal);
    // Lấy thông tin người dùng từ form
    var HoVaTen = $('#FullName').val();
    var TaiKhoan = $('#UserName').val();
    var NgaySinh = $('#Date').val();
    var GioiTinh = document.getElementById('Gender').value;
    var SDT = $('#Number').val();
    var email = $('#Email').val();
    var GroupId = $('#GroupId').val();
    var stt = $('#STT').val();
    try {
      const response = await fetch('https://localhost:7227/User/CreateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          FullName: HoVaTen,
          UserName: TaiKhoan,
          Date: NgaySinh,
          Gender: GioiTinh,
          Number: SDT,
          Email: email,
          GroupId: GroupId,
          RoleId: Role,
          STT: stt,
        })
      });
      // const responsedata = await response.json();
      if (response.ok) {
        $("#myTable").DataTable().page(currentPage).page.len(pageLength).draw(false);
      }
      bootstrapModal.hide();
      await toast.show();
    } catch (error) {
      console.log('lỗi:', error);
    }
  }
  return (<><div className="modal fade" id="UserCreate">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Create new User</h4>
        </div>
        <div className="modal-body">
          <form>
            <div>
              <label htmlFor="HoVaTen">Họ và tên</label>
              <input
                type="text"
                className="form-control valNameUser"
                id="FullName"
                name="FullName"
                required=""
              />
            </div>
            <div>
              <label htmlFor="TaiKhoan">Tài khoản</label>
              <input
                type="text"
                className="form-control valUserName"
                id="UserName"
                name="UserName"
                required=""
              />
            </div>
            <div>
              <label htmlFor="NgaySinh">Ngày sinh</label>
              <input
                type="date"
                className="form-control"
                id="Date"
                name="Date"
                required=""
              />
            </div>
            <div>
              <label htmlFor="Gender">Giới tính</label>
              <select id="Gender" className="form-control" required="">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <br />
            </div>
            <div>
              <label htmlFor="SDT">Số điện thoại</label>
              <input
                type="text"
                className="form-control valSdt"
                id="Number"
                name="Number"
                required=""
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className="form-control valEmail"
                id="Email"
                name="Email"
                required=""
              />
            </div>
            <div>
              <label>Chọn vai trò:</label>
              <Select
                className='form-control'
                options={options}
                value={selectedRole}
                onChange={handleRoleChange}
              />
            </div>
            <div>
              <label htmlFor="STT">Số thứ tự</label>
              <input
                type="number"
                className="form-control valSttUser"
                id="STT"
                name="Email"
                required=""
              />
            </div>
            <div>
              <label htmlFor="MaNhom" style={{ display: "none" }}>
                Id Nhóm
              </label>
              <input
                type="text"
                id="GroupId"
                name="GroupId"
                style={{ display: "none" }}
                required=""
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
          <button
            type="button"
            className="btn btn-primary btn-lg"
            data-bs-dismiss="modal"
            onClick={SubUserCre}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
    <div className="toast position-fixed top-0 end-0" id="toast1">
      <div className="toast-header">
        <strong className="me-auto">Thông báo</strong>
        <button type="button" className="btn-close" data-bs-dismiss="toast" />
      </div>
      <div className="toast-body">
        <p>Tạo người dùng mới thành công </p>
      </div>
    </div>
  </>
  );
}

export default CreateUserModal;