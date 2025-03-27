const FilterBar = ({ filter, setFilter, sortByDueDate, setSortByDueDate }) => (
    <div>
        <button onClick={() => setFilter("all")} disabled={filter === "all"}>All</button>
        <button onClick={() => setFilter("completed")} disabled={filter === "completed"}>Completed</button>
        <button onClick={() => setFilter("incomplete")} disabled={filter === "incomplete"}>Incomplete</button>

        <label style={{ marginLeft: "15px" }}>
            <input 
                type="checkbox"
                checked={sortByDueDate}
                onChange={() => setSortByDueDate(!sortByDueDate)}
                style={{ marginRight: "5px" }}
            />
            Sort by Due Date
        </label>
    </div>
);

export default FilterBar;