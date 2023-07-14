import '../App.css';

function ItemEdit() {
  return (
    <>
      <div>
        {/* Edit area */}
        <h3>Edit</h3>
        <div>
          <label>id: </label>
          <input
            type="text"
          />
        </div>
        <div>
          <input
            type="text"
          />
        </div>
        <div>
          <textarea
            rows="5"
            cols="50"
          ></textarea>
        </div>
        <div>
          <button >Edit</button>
        </div>
      </div>
    </>
  )
}

export default ItemEdit