import React from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function CreateGroupModal() {
    // const [modalInstance, setModalInstance] = useState("");

    // if (modalInstance) {
    //     modalInstance.hide();
    // }
    const Validate = async () => {
        if ($(".valName").val() === "") {
            alert("Tên chưa điền");
        } else if ($(".valCode").val() === "") {
            alert("Code chưa điền")
        } else if ($(".valStt").val() === "") {
            alert("Stt chưa điền")
        }
        else { TaoNhom(); }
    }
    const TaoNhom = async () => {
        var tennhom = $('#tenNhom').val();
        var nhomcha = $('#NhomCha').val();
        var manhom = $('#CodeNhom').val();
        var stt = $('#STTNhom').val();
        try {
            const response = await fetch('https://localhost:7227/Group/CreateGroup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Name: tennhom,
                    Code: manhom,
                    Parent_Id: nhomcha,
                    STT: stt
                })
            });
            const data = await response.json();
            await $('#html1').jstree('refresh');
            console.log('nhóm đã được tạo:', data);
        } catch (error) {
            console.log('lỗi:', error);
        }
    }
    return (
        <div className="modal fade" id="CreateGroup" data-bs-keyboard="false" data-bs-backdrop="static">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Create Group</h4>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={(event) => event.preventDefault()}>
                            <div className="form-group">
                                <label>Tên nhóm</label>
                                <input
                                    type="text"
                                    className="form-control valName"
                                    id="tenNhom"
                                    required=""
                                />
                            </div>
                            <div className="form-group">
                                <label>Mã nhóm</label>
                                <input
                                    type="text"
                                    className="form-control valCode"
                                    id="CodeNhom"
                                    required=""
                                />
                            </div>
                            <div className="form-group">
                                <label style={{ display: "block" }}>Nhóm Cha</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="NhomCha"
                                    style={{ display: "block" }}
                                />
                            </div>
                            <div className="form-group">
                                <label style={{ display: "block" }}>Số thứ tự</label>
                                <input
                                    type="text"
                                    className="form-control valStt"
                                    id="STTNhom"
                                    style={{ display: "block" }}
                                    required=""
                                />
                            </div>
                        </form>
                    </div>
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
                            onClick={Validate}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CreateGroupModal;