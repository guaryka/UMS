import React from 'react';
function ToastModal() {
    return (
        <div className="container mt-3 ">
            <div className="toast position-fixed top-0 end-0" id="toast1">
                <div className="toast-header">
                    <strong className="me-auto">Thông báo</strong>
                    <button type="button" className="btn-close" data-bs-dismiss="toast" />
                </div>
                <div className="toast-body">
                    <p>Tạo người dùng mới thành công </p>
                </div>
            </div>
            <div className="toast position-fixed top-0 end-0" id="toast2">
                <div className="toast-header">
                    <strong className="me-auto">Thông báo</strong>
                    <button type="button" className="btn-close" data-bs-dismiss="toast" />
                </div>
                <div className="toast-body">
                    <p>Xóa người dùng thành công</p>
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
        </div>
    );
}

export default ToastModal;