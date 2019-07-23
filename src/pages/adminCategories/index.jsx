import React from "react";
import { Table } from "antd";

import "./index.less";
// import LinkBotton from '../../components/linkBotton/';

export default class AdminCategories extends React.Component {
    render() {
       

        return (
            <div className="categores">
                <h2>Middle size table</h2>
                <Table bordered  />
            </div>
        );
    }
}
