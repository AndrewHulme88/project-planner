const FilterBar = ({ 
    filter, 
    setFilter, 
    sortByDueDate, 
    setSortByDueDate, 
    priorityFilter, 
    setPriorityFilter,
    sortByPriority,
    setSortByPriority,
}) => (
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

        <label style={{ marginLeft: "15px" }}>
            <input 
                type="checkbox" 
                checked={sortByPriority}
                onChange={() => setSortByPriority(!sortByPriority)}
            />
            Sort by Priority
        </label>

        <select 
            style={{ marginLeft: "15px" }}
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
        >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
        </select>
    </div>
);

export default FilterBar;