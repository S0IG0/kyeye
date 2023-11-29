import {Header} from "@ui/Header.tsx";
import {Footer} from "@ui/Footer.tsx";
import {ColorChoice} from "@ui/ColorChoice.tsx";
import {Route, Routes} from "react-router-dom";
import {NamePages, Page, routes, Visibly} from "@route/routes.tsx";
import {NotFoundPage} from "@page/public/NotFoundPage.tsx";
import {store} from "@store/store.ts";
import TokenService from "@service/TokenService.ts";
import {useEffect} from "react";
import {observer} from "mobx-react-lite";

function App() {
    const pages: Page[] = Object.keys(NamePages)
        .filter(key => !isNaN(Number(key)))
        .map(key => routes[Number(key) as NamePages])
        .filter(page => {

            if (store.isAuth && page.visibly.includes(Visibly.PUBLIC_ONLY_NO_AUTH)) {
                return false;
            }

            if (store.isAuth && (
                page.visibly.includes(Visibly.PUBLIC) ||
                page.visibly.includes(Visibly.AUTH_HIDDEN) ||
                page.visibly.includes(Visibly.AUTH)
            )) {
                return true;
            }

            if (
                page.visibly.includes(Visibly.PUBLIC) ||
                page.visibly.includes(Visibly.PUBLIC_HIDDEN) ||
                page.visibly.includes(Visibly.PUBLIC_ONLY_NO_AUTH
                )) {
                return true;
            }
        })

    useEffect(() => {
        if (TokenService.loadTokensFromLocalStorage().refresh) {
            store.checkAuth().then();
        }
    }, [])

    return (
        <>
            <Header/>
            <ColorChoice/>
            <main className="flex-shrink-1">
                <div className="container pt-4">
                    <Routes>
                        {pages.map(page => (
                            <Route
                                key={page.path}
                                path={page.path}
                                element={page.component}
                            />
                        ))}
                        <Route path={"*"} element={<NotFoundPage/>}/>
                    </Routes>
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default observer(App);
