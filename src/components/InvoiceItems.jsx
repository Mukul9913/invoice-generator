import React from "react";
import { Table, Button } from "react-bootstrap";
import { BiTrash } from "react-icons/bi";
import EditableField from "./EditableField";

const InvoiceItems = ({ items, currency, onItemizedItemEdit, onRowDel, onRowAdd }) => (
  <div>
    <Table>
      <thead>
        <tr>
          <th>ITEM</th>
          <th>QTY</th>
          <th>PRICE/RATE</th>
          <th>ACTION</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <ItemRow
            key={item.id}
            item={item}
            currency={currency}
            onItemizedItemEdit={onItemizedItemEdit}
            onDelEvent={onRowDel}
          />
        ))}
      </tbody>
    </Table>
    <Button className="fw-bold" onClick={onRowAdd}>
      Add Item
    </Button>
  </div>
);

const ItemRow = ({ item, currency, onItemizedItemEdit, onDelEvent }) => {
  // const editableFields = [
  //   { name: "name", placeholder: "Item Name", type: "text", value: item.name },
  //   { name: "description", placeholder: "Item Description", type: "text" , value: item.description },
  //   { name: "quantity", placeholder: "Quantity", type: "number", value: item.quantity },
  //   { 
  //     name: "price", 
  //     placeholder: "Price/Rate", 
  //     type: "number",
  //     min: "0.01",
  //     step: "0.01",
  //     precision: "2",
  //     textAlign: "text-end",
  //     value: item.price,
  //   }
  // ];
  return (
    <tr>
      <td style={{ width: "100%" }}>
          <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            name: "name",
            leading: "Item",
            type: "text",
            placeholder: "Item Name",
            value: item.name,
            id: item.id,
          }}
  
          />
           <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            name: "description",
            leading: "Description",
            type: "text",
            placeholder: "Item Description",
            value: item.name,
            id: item.id,
          }}
  
          />
      </td>
        <td style={{minWidth:"70px"}}>
          <EditableField
            onItemizedItemEdit={onItemizedItemEdit}
            cellData={{
              namee: "quantity",
              type: "number",
              name: "quantity",
              min: 1,
              step: "1",
              value: item.quantity,
              id: item.id,
            }}/>
        </td>
        <td style={{minWidth:"130px"}}>
          <EditableField
            onItemizedItemEdit={onItemizedItemEdit}
            cellData={{
              leading:currency,
              type: "number",
              name: "price",
              min: 1,
              step: "0.01",
              presicion: 2,
              textAlign: "text-end",
              value:item.price,
              id:item.id,
            }}/>
        </td>
      <td>
        <BiTrash
          style={{ height: "33px", width: "33px", padding: "7.5px" }}
          className="text-white mt-1 btn btn-danger"
          onClick={() => onDelEvent(item)}
        />
      </td>
    </tr>
  );
};

export default InvoiceItems;
