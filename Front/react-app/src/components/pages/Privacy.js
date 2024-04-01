import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import 'jstree';

const Privacy = () => {
    useEffect(() => {
        $('#html1').jstree({
            'core': {
                'data': [
                    {
                        'id': 'node1',
                        'text': 'Node 1',
                        'children': [
                            { 'id': 'node2', 'text': 'Node 2' },
                            { 'id': 'node3', 'text': 'Node 3' }
                        ]
                    }
                ]
            }
        });

        // Gắn sự kiện select_node.jstree
        $('#html1').on('select_node.jstree', hihi);

        // Định nghĩa hàm hihi
        function hihi(event, data) {
            console.log(data.node.text);
        }
    }, []);

    return (
        <div id="html1"></div>
    );
};

export default Privacy;
