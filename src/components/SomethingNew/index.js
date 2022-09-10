const style = {
    backgroundColor: "red",
    color: "black",
    fontSize: "48px",
    display: "flex",
    height: "100vh",
    width: "100vw",
    padding: "30px",
    fontFamily: "lucida"
    // rotate:"90%"
}

const SomethingNew = () => (
    <div style={style}>
        <h1 >Hello world</h1>
        <frameset >
            <frame >
                <div >
                    hello world
                </div>
            </frame>

        </frameset>
    </div>
)

export default SomethingNew