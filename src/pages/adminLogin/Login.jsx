import React from "react";
import { Redirect } from "react-router-dom";
import "./login.less";
import logo from "../../assets/img/logo.ico";

import { Form, Icon, Input, Button, message } from "antd";
import admin from "../../config/admin";
import memoryUtils from "../../utils/memoryUtils";
import storeUtils from "../../utils/storeUtils";

class Login extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log("Received values of form: ", values);
                let { username, password } = values;
                if (
                    admin.username === username &&
                    admin.password === password
                ) {
                    message.success("success sign up !");
                    memoryUtils.user = admin;
                    storeUtils.saveUser(admin);
                    this.props.history.replace("/admin/home");
                } else {
                    message.error("usernaem or password error");
                }
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        if (memoryUtils.user && memoryUtils.user.username) {
            return <Redirect to="/admin" />;
        }

        return (
            <div className="login">
                <section className="login-content">
                    <header>
                        <img alt="logo" src={logo} />
                        <h1>ADMIN MS</h1>
                    </header>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator("username", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please input your username!"
                                    },
                                    {
                                        min: 6,
                                        message:
                                            "username must more than 6 letters"
                                    },
                                    {
                                        max: 12,
                                        message:
                                            "username must less than 12 letters"
                                    },
                                    {
                                        pattern: /^[0-9a-zA-Z_]+$/,
                                        message:
                                            "username can not have special characters "
                                    }
                                ]
                            })(
                                <Input
                                    prefix={
                                        <Icon
                                            type="user"
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    placeholder="Username"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator("password", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please input your Password!"
                                    },
                                    {},
                                    {
                                        min: 6,
                                        message:
                                            "username must more than 6 letters"
                                    },
                                    {
                                        max: 12,
                                        message:
                                            "username must less than 12 letters"
                                    }
                                ]
                            })(
                                <Input
                                    prefix={
                                        <Icon
                                            type="lock"
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    type="password"
                                    placeholder="Password"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                            >
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
                <footer className="login-footer">
                    <a title="github" href="https://github.com/shanejix" />
                    <div>shanejix Design Admin ©2019 </div>
                </footer>
            </div>
        );
    }
}

const WrappedLoginForm = Form.create({ name: "login" })(Login);

export default WrappedLoginForm;
