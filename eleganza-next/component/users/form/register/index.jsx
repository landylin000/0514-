import React, { useState } from 'react';
import styles from './register.module.scss';
import PasswordStrengthBar from 'react-password-strength-bar';
import { useRouter } from 'next/router';

export default function RegisterForm() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [user, setUser] = useState({
        useremail: '',
        password: '',
        phone: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({
        useremail: '',
        password: '',
        phone: '',
        confirmPassword: '',
    });

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { useremail: user.useremail, phone: user.phone, password: user.password, confirmPassword: user.confirmPassword };
        const newErrors = { useremail: '', password: '', phone: '', confirmPassword: '' };

        let hasErrors = false;

        if (!user.useremail) {
            newErrors.useremail = '*帳號為必填';
            hasErrors = true;
        }

        if (!user.phone) {
            newErrors.phone = '手機號碼為必填';
            hasErrors = true;
        }

        if (user.password !== user.confirmPassword) {
            newErrors.password = '密碼與確認密碼需要一致';
            newErrors.confirmPassword = '密碼與確認密碼需要一致';
            hasErrors = true;
        }

        if (!user.password) {
            newErrors.password = '*密碼為必填';
            hasErrors = true;
        }

        if (!user.confirmPassword) {
            newErrors.confirmPassword = '*確認密碼為必填';
            hasErrors = true;
        }

        setErrors(newErrors);

        if (hasErrors) {
            return;
        }

    // 发送数据到后端
        try {
            const res = await fetch('http://localhost:3005/api/home-myaccount/register', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            const data = await res.json();
            console.log(data);

            // 注册成功后重定向到登录页面
            router.push('/users/user-form/login');
        } catch (error) {
            console.error('Error occurred during registration:', error);
            alert('註冊時發生錯誤');
        }
    };

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = (e) => {
        e.preventDefault();
        setShowPassword((prevState) => !prevState);
    };

    const [showPassword2, setShowPassword2] = useState(false);
    const togglePasswordVisibility2 = (e) => {
        e.preventDefault();
        setShowPassword2((prevState) => !prevState);
    };

    return (
        <>
            <div className={styles.overlaybg}>
                <div className={styles.popupwindow}>
                    <a href="">
                        <img src="/icons/icon-x.svg" alt="" />
                    </a>
                    <div className={styles.formwrap}>
                        <div className={styles.logo}>
                            <a href="">ELEGANZA</a>
                        </div>
                        <form className={styles.formwraps} onSubmit={handleSubmit}>
                            <div className={styles.form}>
                                <p className={styles.formkey}>Email</p>
                                <input
                                    className={styles.formvalue}
                                    type="text"
                                    name="useremail"
                                    value={user.useremail}
                                    onChange={handleFieldChange}
                                />
                                <span className={styles.error}>{errors.useremail}</span>
                            </div>
                            <div className={styles.form}>
                                <p className={styles.formkey}>手機號碼</p>
                                <input
                                    className={styles.formvalue}
                                    type="text"
                                    name="phone"
                                    value={user.phone}
                                    onChange={handleFieldChange}
                                />
                            </div>
                            <div className={styles.form}>
                                <div className={styles.passwordinput}>
                                    <label className={styles.formkey}>密碼</label>
                                    <a href="#" onClick={togglePasswordVisibility}>
                                        <img src="/icons/icon-eye.svg" alt="Toggle Password Visibility" />
                                    </a>
                                </div>
                                <input
                                    className={styles.formvalue}
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={user.password}
                                    onChange={handleFieldChange}
                                />
                                <span className={styles.error}>{errors.password}</span>
                                <PasswordStrengthBar password={password} />
                            </div>
                            <div className={styles.form}>
                                <div className={styles.passwordinput}>
                                    <label className={styles.formkey}>重新輸入密碼</label>
                                    <a href="#" onClick={togglePasswordVisibility2}>
                                        <img src="/icons/icon-eye.svg" alt="Toggle Password Visibility" />
                                    </a>
                                </div>
                                <input
                                    className={styles.formvalue}
                                    type={showPassword2 ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={user.confirmPassword}
                                    onChange={handleFieldChange}
                                />
                                <span className={styles.error}>{errors.confirmPassword}</span>
                            </div>
                            <div className={styles.formcheck}>
                                <div className={styles.checkloginstatus}>
                                    <input type="checkbox" />
                                    <p>保持登入狀態</p>
                                </div>
                                <a href="">忘記密碼？</a>
                            </div>
                            <div className={styles.mbtn} onClick={handleSubmit}>
                                <button type="submit">註冊</button>
                            </div>
                        </form>
                        <div className={styles.registeraccount}>
                            <p>已有帳號了嗎？</p>
                            <a href="http://localhost:3000/users/user-form/login">由此登入</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}