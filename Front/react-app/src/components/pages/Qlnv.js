import React, { useEffect, useState } from 'react';
import "./Qlnv.css";
import 'jstree';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import 'datatables.net-select-dt';
import 'bootstrap/js/dist/modal.js';
import 'select2';
import { DeleteGroup } from '../../App';
import { DeleteUser } from '../DeleteUser';
import { DeleteGroupUser } from '../DeleteGroupUser';
import UpdateUserModal from '../UpdateUser';

export const Qlnv = () => {
    const [PrevSelected, setPreSelected] = useState(null);

    useEffect(() => {
        $('#html1').jstree({
            'core': {
                'data': {
                    'url': 'https://localhost:7227/Home/Nodes',
                },
                'open_all': true,
            }
        });
        $('#html1').on('select_node.jstree', hihi);
        async function hihi(e, data) {
            document.getElementById('nutbam').style.display = "block";
            document.getElementById('RightPannel').style.display = "block";
            document.getElementById('NhomCha').value = data.node.id;
            $('#parentId').val(data.node.parent);
            <DeleteGroup />
            var a = data.node.id;
            await DataTablehihi(a);
            try {
                const response = await fetch(`https://localhost:7227/Group/Details/GroupId/${data.node.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                const respondedata = await response.json();
                console.log(respondedata);
                $('#groupName').val(respondedata[0].name);
                $('#groupCode').val(respondedata[0].code);
                $('#Name').val(respondedata[0].name);
                $('#Code').val(respondedata[0].code);
                $('#groupId').val(respondedata[0].id);
                $('#GroupId').val(respondedata[0].id);
                $('#GroupSTT').val(respondedata[0].stt);
                $('#groupStt').val(respondedata[0].stt);
            } catch (error) {
                console.log('lỗi:', error);
            }
        }
        var DT4;
        function DataTablehihi(a) {
            $("#myTable").DataTable().destroy();
            DT4 = $("#myTable").DataTable({
                "processing": true,
                "serverSide": true,
                "ordering": true,
                "ajax": {
                    "url": `https://localhost:7227/User/GetData?GroupId=${a}`,
                    "type": "POST",
                    "datatype": "json",
                    "dataSrc": function (json) {
                        console.log("Dữ liệu trả về từ server:", json);
                        return json.data;
                    }
                },
                "select": {
                    style: 'multi',
                    selector: 'td:first-child',
                },
                "columnDefs": [
                    {
                        targets: 0,
                        data: null,
                        defaultContent: '',
                        orderable: false,
                        className: 'select-checkbox',
                    },
                    {
                        targets: 1,
                        data: 'stt',
                    },
                    {
                        targets: 2,
                        data: 'fullname',
                        render: function (data, type, row, meta) {
                            return row.fullname;
                        },

                    },
                    {
                        targets: 3,
                        data: 'username',

                    },
                    {
                        targets: 4,
                        data: 'date',
                        render: function (data, type, row, meta) {
                            var date = new Date(data);
                            var day = date.getDate();
                            var month = date.getMonth() + 1; // Tháng bắt đầu từ 0
                            var year = date.getFullYear();
                            var formattedDate = day + "/" + month + "/" + year;
                            return formattedDate;
                        },

                    },
                    {
                        targets: 5,
                        data: 'gender',
                    },
                    {
                        targets: 6,
                        data: 'number',

                    },
                    {
                        targets: 7,
                        data: 'email',

                    },
                    {
                        targets: 8,
                        data: 'roleName',

                    },
                    {
                        targets: 9,
                        data: null,
                        render: function (data, type, row, meta) {
                            return '<button type="button" class="edit-button btn btn-warning" data-bs-toggle="modal" data-bs-target="#edit-user-form">Chỉnh sửa</button>' +
                                '<button type="button" class="delete-button btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteUser">Xóa</button>';
                        },
                    }
                ]
            });
            $('#myTable').on('click', '.edit-button', function () {
                var data = $('#myTable').DataTable().row($(this).closest('tr')).data();
                var date = new Date(data.date);
                // Tạo chuỗi có định dạng yyyy-mm-dd
                var year = date.getFullYear();
                var month = ("0" + (date.getMonth() + 1)).slice(-2);
                var day = ("0" + date.getDate()).slice(-2);
                var formattedDate = year + "-" + month + "-" + day;
                console.log(date);
                $('#edit-username').val(data.username);
                $('#edit-fullname').val(data.fullname);
                $('#edit-date').val(formattedDate);
                $('#edit-gender').val(data.gender);
                $('#edit-number').val(data.number);
                $('#edit-email').val(data.email);
                $('#edit-id').val(data.id);
                $('#edit-stt').val(data.stt);
                $('#edit-role').val(data.roleName).trigger('change');
                setPreSelected(data.roleId);
                console.log('Chỉnh sửa:', data);
            });
            $('#myTable').on('click', '.delete-button', function () {
                var data = $('#myTable').DataTable().row($(this).closest('tr')).data();
                $('#edit-id').val(data.id);
            });
            $('#delete_button').on('click', function () {
                var e = $('#edit-id').val();
                DeleteUser(e);
            });
            $('#myTable').on('click', '.selectAll', function (e) {
                if ($(this).is(":checked")) {
                    DT4.rows().select();
                } else {
                    DT4.rows().deselect();
                }
                var selectedRows = DT4.rows({ selected: true }).data();
                var selectedIds = selectedRows.map(function (row) {
                    return row.id;
                });
                console.log("Selected IDs:", selectedIds);

            });
            $('#deleteGroup_button').on('click', function () {
                var selectedRows = Array.from(DT4.rows({ selected: true }).data());

                selectedRows.forEach(function (row) {
                    DeleteGroupUser(row.id);
                });
            });

        };
    }, [PrevSelected]);
    return (
        <div className="contain">
            <div id="LeftPannel">
                <div id="cuccung">
                    <div className="nutbam" style={{ display: "block" }} id="nutbam">
                        <button
                            type="button"
                            className="btn btn-success btn-lg"
                            data-bs-toggle="modal"
                            data-bs-target="#CreateGroup"
                        >
                            Create
                        </button>
                        <button
                            type="button"
                            className="btn btn-warning btn-lg"
                            data-bs-toggle="modal"
                            data-bs-target="#EditGroup"
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger btn-lg"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                        >
                            Delete
                        </button>
                        <button
                            type="button"
                            className="btn btn-info btn-lg"
                            data-bs-toggle="modal"
                            data-bs-target="#GroupDetails"
                        >
                            Details
                        </button>
                    </div>
                </div>
                <div id="html1"></div>
            </div>
            <div id="RightPannel" style={{ display: "block" }}>
                <button
                    type="button"
                    className="btn btn-success btn-lg"
                    data-bs-toggle="modal"
                    data-bs-target="#UserCreate"
                >
                    Đăng kí
                </button>
                <button
                    type="button"
                    className="btn btn-danger btn-lg"
                    data-bs-toggle="modal"
                    id="delGUbutton"
                    data-bs-target="#deleteGroupUser"
                >
                    Xóa nhiều
                </button>
                <table id="myTable" className="display" style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <th className="text-center">
                                <input
                                    type="checkbox"
                                    className="selectAll"
                                    name="selectAll"
                                    defaultValue="all"
                                />
                            </th>
                            <th>STT</th>
                            <th>Họ và tên</th>
                            <th>Tài khoản</th>
                            <th>Ngày sinh</th>
                            <th>Giới tính</th>
                            <th>Sđt</th>
                            <th>Email</th>
                            <th>Vai trò</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                        </tr>
                    </tbody>
                </table>
            </div>
            <UpdateUserModal PrevSelected={PrevSelected} />
        </div>
    );
};

export default Qlnv;