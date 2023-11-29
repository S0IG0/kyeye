export const Spinner = () => {
    return (
        <div className="spinner-border" role="status" style={{
            width: "25px",
            height: "25px"
        }}>
            <span className="visually-hidden">Loading...</span>
        </div>
    );
};