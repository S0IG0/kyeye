import {useState} from "react";

export const ColorChoice = () => {
    const loadChoiceTheme = localStorage.getItem("choice-theme");
    const [activeTheme, setActiveTheme] = useState(
        loadChoiceTheme ? JSON.parse(loadChoiceTheme) : {
            theme: "auto",
            icon: "#circle-half"
        }
    )

    if (activeTheme.theme === "auto") {
        setActiveTheme({
            ...activeTheme,
            theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"
        })
    }

    document.documentElement.setAttribute("data-bs-theme", activeTheme.theme);
    localStorage.setItem("choice-theme", JSON.stringify(activeTheme))


    return (
        <div className="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle" style={{
            zIndex: 1500
        }}>
            <button
                className="btn btn-bd-primary py-2 dropdown-toggle d-flex align-items-center"

                id="bd-theme"
                type="button"
                aria-expanded="false"
                data-bs-toggle="dropdown"
                aria-label="Toggle theme (light)">
                <svg className="bi my-1 theme-icon-active" width="1em" height="1em">
                    <use href={activeTheme.icon}></use>
                </svg>
                <span className="visually-hidden" id="bd-theme-text">Toggle theme</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="bd-theme-text">
                <li>
                    <button type="button"
                            className={`dropdown-item d-flex align-items-center ${activeTheme.icon === "#sun-fill" && "active"}`}
                            data-bs-theme-value="light"
                            aria-pressed="true"
                            onClick={() => setActiveTheme({icon: "#sun-fill", theme: "light"})}
                    >
                        <svg className="bi me-2 opacity-50 theme-icon" width="1em" height="1em">
                            <use href="#sun-fill"></use>
                        </svg>
                        Light
                        <svg className="bi ms-auto d-none" width="1em" height="1em">
                            <use href="#check2"></use>
                        </svg>
                    </button>
                </li>
                <li>
                    <button
                        type="button"
                        className={`dropdown-item d-flex align-items-center ${activeTheme.icon === "#moon-stars-fill" && "active"}`}
                        data-bs-theme-value="dark"
                        aria-pressed="true"
                        onClick={() => setActiveTheme({icon: "#moon-stars-fill", theme: "dark"})}
                    >
                        <svg className="bi me-2 opacity-50 theme-icon" width="1em" height="1em">
                            <use href="#moon-stars-fill"></use>
                        </svg>
                        Dark
                        <svg className="bi ms-auto d-none" width="1em" height="1em">
                            <use href="#check2"></use>
                        </svg>
                    </button>
                </li>
                <li>
                    <button
                        type="button"
                        className={`dropdown-item d-flex align-items-center ${activeTheme.icon === "#circle-half" && "active"}`}
                        data-bs-theme-value="auto"
                        aria-pressed="true"
                        onClick={() => setActiveTheme({icon: "#circle-half", theme: "auto"})}
                    >
                        <svg className="bi me-2 opacity-50 theme-icon" width="1em" height="1em">
                            <use href="#circle-half"></use>
                        </svg>
                        Auto
                        <svg className="bi ms-auto d-none" width="1em" height="1em">
                            <use href="#check2"></use>
                        </svg>
                    </button>
                </li>
            </ul>
        </div>

    );
}