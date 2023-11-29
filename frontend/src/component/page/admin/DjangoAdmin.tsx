export const DjangoAdmin = () => {
    return (
        <iframe
            className="w-100 h-100 rounded-3 border"
            sandbox="allow-same-origin allow-scripts"
            src="http://localhost/api/admin/"
            style={{minHeight: "50em"}}
        />
    );
}