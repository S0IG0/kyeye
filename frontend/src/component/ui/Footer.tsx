export const Footer = () => {
    return (
        <footer className="footer mt-auto py-3 bg-body-tertiary">
            <div className="container">
                <span className="text-body-secondary">
                    Компания «KYEYE» была основана с 988 года крещения руси по {new Date().getFullYear()} год
                </span>
            </div>
        </footer>
    );
}