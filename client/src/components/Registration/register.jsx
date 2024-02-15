import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerAsClient } from "../../services/auth.service"; 
import '../../scss/register.css'
import SERVER_PATH from "../../constants/SERVER_PATH";

function Register() {
    const navigate = useNavigate()

    const [error, setError] = useState()
    const [name, setName] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [passwordVerification, setPasswordVerification] = useState("")
    const [accept, setAccept] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        if (!accept) {
            return setError("Чтобы продолжить необходимо принять политику конфиденциальности.")
        }

        return registerAsClient({
            name,
            lastname,
            email,
            phone,
            password1: password,
            password2: passwordVerification,
        })
        .then(() => navigate("/login"))
        .catch((err) => setError(err.message))
    }

    useEffect(() => {
        document.title = 'Регистрация';
    }, []);

    return (
        <section className="register">
            <h1>Регистрация</h1>
            <form onSubmit={onSubmit}>
                {error && (
                    <div className="auth-err">
                        {error}
                    </div>
                )}
                <input
                    required
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="heheinput"
                    placeholder="Имя"
                />
                <input
                    required
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    className="heheinput"
                    placeholder="Фамилия"
                />
                <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="heheinput"
                    placeholder="Email"
                />
                <input
                    required
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="heheinput"
                    placeholder="Телефон"
                />
                <input
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="heheinput"
                    placeholder="Пароль"
                />
                <input
                    required
                    type="password"
                    value={passwordVerification}
                    onChange={(e) => setPasswordVerification(e.target.value)}
                    className="heheinput"
                    placeholder="Подтвердите пароль"
                />
                <div className="rel"> {/* pihui */}
                    <input type="checkbox" id="really" checked={accept} onChange={(e) => setAccept(e.target.checked)} />
                    <label htmlFor="really">
                        Ознакомлен и согласен с условиями
                        <a
                            style={{
                                textDecoration: "underline",
                                marginLeft: "5px",
                                color: "#000"
                            }}
                            target="_blank"
                            href={SERVER_PATH + "files/privacy-policy.pdf"}
                        >
                            Политики конфиденциальности
                        </a>
                    </label>
                </div>
                <button>Регистрация</button>
            </form>
        </section>
    )
}

export default Register;