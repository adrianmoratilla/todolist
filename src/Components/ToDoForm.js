export const ToDoForm = ({addNewList}) => {
    return(
        <form onSubmit={addNewList}>
            <input type = "text" name="task"></input>
            <button type="submit">+</button>
        </form>
    )
}