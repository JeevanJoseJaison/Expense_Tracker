import React, { Component, useState } from 'react';
import "antd/dist/antd.css";
import { Form, Input, Modal, Select ,message } from "antd";
import Spinner from './Spinner';
import axios from "axios";


const AddTransaction =({showModal,setShowModal,getTransactions,edit, setEdit})=> {

    const [loading , setLoading] = useState(false);
  const handleFinish = async (values) => {
    try {
        const user = JSON.parse(localStorage.getItem("expense-user"));
     setLoading(true);
     if(edit){
        await axios.post("/api/transactions/edittransaction",{
         datas:{
            ...values,
            userID : user._id
         },
         transactionId : edit._id
        });
        message.success("Transaction edited Successfull");
        getTransactions();
     }
     else
     {
      await axios.post("/api/transactions/addtransaction", {...values , userID : user._id});
      message.success("Transaction added Successfull");
      getTransactions();
     }
      setLoading(false);
      setEdit(null);
      setShowModal(false);
    } catch (error) {
      message.error("Something went wrong");
      console.log(error);
     setLoading(false);
    }
  };

   return (
    <Modal
    title="Add Transaction"
    visible={showModal}
    onCancel={() => setShowModal(false)}
    footer ={false}
  > {loading && <Spinner/>}
    <Form layout="vertical" className="transaction-form" onFinish={handleFinish} initialValues={edit} >
      <Form.Item label="Amount" name="amount">
        <Input type="text" />
      </Form.Item>

      <Form.Item label="Type" name="type">
        <Select>
          <Select.Option value="income">Income</Select.Option>
          <Select.Option value="expence">Expence</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Category" name="category">
        <Select>
          {" "}
          <Select.Option value="salary">Salary</Select.Option>
          <Select.Option value="freelance">Freelance</Select.Option>
          <Select.Option value="food">Food</Select.Option>
          <Select.Option value="entertainment">
            Entertainment
          </Select.Option>
          <Select.Option value="investment">Investment</Select.Option>
          <Select.Option value="travel">Travel</Select.Option>
          <Select.Option value="education">Education</Select.Option>
          <Select.Option value="medical">Medical</Select.Option>
          <Select.Option value="tax">Tax</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Date" name="date">
        <Input type="date" />
      </Form.Item>

      <Form.Item label="Reference" name="reference">
        <Input type="text" />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Input type="text" />
      </Form.Item>

      <div className="d-flex justify-content-end">
        <button className="primary" type="submit">Save</button>
      </div>
    </Form>
  </Modal>
        );
    }




export default AddTransaction;