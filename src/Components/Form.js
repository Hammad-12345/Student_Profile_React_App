import React, { useEffect } from "react";
import "./Form.css";

export default function Form() {
  const uniqueid = Date.now();

  const [objectdata, updateobject] = React.useState({
    Name: "",
    Address: "",
    City: "",
  });

  const [Arr_data, update_arr] = React.useState([]);
  const [add_button, addupdatebuttons] = React.useState(true);
  const [edit_object, edit_update_object] = React.useState("");
  const [search_field, update_search_field] = React.useState("");
  const [Id, update_id] = React.useState("");

  useEffect(() => {
    const data = localStorage.getItem("Form_Items");

    if (data != null) {
      update_arr([...JSON.parse(data)]);
      if (JSON.parse(data).length > 0) {
      }
    }
  }, []);

  const change_handler = (e) => {
    updateobject({
      uni_id: uniqueid,
      ...objectdata,
      [e.target.name]: e.target.value,
    });
  };

  const Submit_data = (e) => {
    e.preventDefault();
    const get_item = localStorage.getItem("Form_Items");
    if (get_item !== null) {
      const store = JSON.parse(get_item);
      localStorage.setItem(
        "Form_Items",
        JSON.stringify([...store, objectdata])
      );
      update_arr([...Arr_data, objectdata]);
      updateobject({ Name: "", Address: "", City: "" });
    } else {
      update_arr([...Arr_data, objectdata]);
      localStorage.setItem(
        "Form_Items",
        JSON.stringify([...Arr_data, objectdata])
      );
      updateobject({ Name: "", Address: "", City: "" });
    }
  };

  const deletedata = (element, index, ID) => {
    Arr_data.splice(index, 1);
    update_arr([...Arr_data]);

    const List_of_data = localStorage.getItem("Form_Items");
    const parse_data = JSON.parse(List_of_data);

    console.log(parse_data);
    console.log(ID);

    parse_data.forEach((element, index) => {
      if (element.uni_id === ID) {
        parse_data.splice(index, 1);
      }
      localStorage.setItem("Form_Items", JSON.stringify([...parse_data]));
    });
  };

  const edit_data = (field_items, ID) => {
    updateobject({
      Name: field_items.Name,
      Address: field_items.Address,
      City: field_items.City,
    });
    addupdatebuttons(false);
    edit_update_object(field_items);
    update_id(ID);
  };

  const Update_data = () => {
    edit_object.Name = objectdata.Name;
    edit_object.Address = objectdata.Address;
    edit_object.City = objectdata.City;

    update_arr([...Arr_data]);
    updateobject({ Name: "", Address: "", City: "" });
    addupdatebuttons(true);

    const List_of_data = localStorage.getItem("Form_Items");
    const parse_data = JSON.parse(List_of_data);

    console.log(parse_data);
    console.log(Id);

    parse_data.forEach((element, index) => {
      if (element.uni_id === Id) {
        element.Name = objectdata.Name;
        element.Address = objectdata.Address;
        element.City = objectdata.City;
      }
      // update_arr([...parse_data])
      localStorage.setItem("Form_Items", JSON.stringify([...parse_data]));

      if (search_field.length >= 0) {
        const array = localStorage.getItem("Form_Items");
        update_arr([...JSON.parse(array)]);
      }
    });
  };

  const search_data = (e) => {
    update_search_field(e.target.value);

    const get_data = localStorage.getItem("Form_Items");
    const parse_data = JSON.parse(get_data);

    console.log(parse_data);

    const return_arr = parse_data.filter((Element) => {
      return (
        Element.Name.toLowerCase().indexOf(e.target.value.toLowerCase()) !==
          -1 ||
        Element.Address.toLowerCase().indexOf(e.target.value.toLowerCase()) !==
          -1 ||
        Element.City.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
      );
    });
    console.log(return_arr);

    update_arr([...return_arr]);
  };

  return (
    <>
      <div className="main_form">
        <h3>Students Profile App</h3>
        <form
          id="form"
          className="form_container"
          autoComplete="off"
          onSubmit={Submit_data}
        >
          <div id="Book_title" className="form_items">
            <label>Name</label>

            <input
              type="text"
              name="Name"
              value={objectdata.Name}
              onChange={change_handler}
              required
            ></input>
          </div>
          <div id="Book_Author" className="form_items">
            <label>Address</label>

            <input
              type="text"
              name="Address"
              value={objectdata.Address}
              onChange={change_handler}
              required
            ></input>
          </div>

          <div id="Book_No" className="form_items">
            <label>City</label>
            <select
              name="City"
              value={objectdata.City}
              onChange={change_handler}
              required
            >
              <option>Select City</option>
              <option value="Islamabad">Islamabad</option>
              <option value="Lahore">Lahore</option>
              <option value="Rawalpindi">Rawalpindi</option>
              <option value="Multan">Multan</option>
              <option value="Karachi">Karachi</option>
              <option value="Peshawar">Peshawar</option>
            </select>
          </div>
        </form>

        {add_button ? (
          <button form="form" className="buttons">
            Add Data
          </button>
        ) : (
          <button onClick={Update_data} className="buttons">
            Update Book
          </button>
        )}

        <input
          type="search"
          placeholder="search person"
          onChange={search_data}
        ></input>
      </div>

      <table>
        <thead>
          <th>Uni_ID</th>
          <th>Name</th>
          <th>Address</th>
          <th>City</th>
          <th>Action</th>
        </thead>
        <tbody>
          {Arr_data.map((field, index) => (
            <tr key={index}>
              <td>{field.uni_id}</td>
              <td>{field.Name}</td>
              <td>{field.Address}</td>
              <td>{field.City}</td>
              <td>
                <button onClick={() => edit_data(field, field.uni_id)}>
                  <i class="fa-regular fa-pen-to-square"></i>
                </button>
                <button onClick={() => deletedata(field, index, field.uni_id)}>
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
