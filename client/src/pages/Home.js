import React, { useEffect, useState } from "react";
import "./Authentication.css";
import { message, Select, Table } from "antd";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Spinner from "../components/Spinner";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import AddTransaction from "../components/AddTransaction";
import moment from "moment";
import { DatePicker} from "antd";
import Analytic from "../components/Analytic";
const { RangePicker } = DatePicker;


const Home = (props) => {
  // const styleForPaper = {
  //   font-size: '18px' 
    
  
  // };
  const [loading, setLoading] = useState(false);
  const [edit , setEdit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [transactionData, setTransactionData] = useState([]);
  const [frequency, setFrequency] = useState("0");
  const [type, setType] = useState("all");
  const [range, setRange] = useState("");
  const [view, setView] = useState("analytics");
  const getTransactions = async () => {
    try {
      let response;
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("expense-user"));
      response = await axios.post("/api/transactions/getalltransactions", {
        userID: user._id,
        frequency,
        ...(frequency === "custom" && { range }),
        type,
      });

      setLoading(false);
      setTransactionData(response.data);
    } catch (error) {
      setLoading(false);
      message.error("Something Went Wrong");
    }
  };

  const deleteTransaction =async(record)=>{
    try{
    await axios.post("/api/transactions/deletetransaction",{
      transactionId : record._id
    });
    setLoading(false);
    getTransactions();
  }catch(error){
    setLoading(false);
    message.error("Something Went Wrong");
  }
  }
  useEffect(() => {
    getTransactions();
  }, [frequency, range, type]);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title : "Action",
      dataIndex : "action",
      render : (text,record)=>{
        return (
          <div>
             <EditIcon className="editicon" 
                       onClick={() => {
                             setEdit(record);
                             setShowModal(true);
              }}
             />
             <DeleteIcon className="deleteicon"
                         onClick={()=>deleteTransaction(record)}
             />
          </div>
        );
      }
    }
  ];

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <div className="filter d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <div className="d-flex flex-column">
            <h6>Select frequency</h6>
            <Select value={frequency} onChange={(value) => setFrequency(value)}>
              <Select.Option value="0">All</Select.Option>
              <Select.Option value="7">Last 1 Week</Select.Option>
              <Select.Option value="30">Last 1 Month</Select.Option>
              <Select.Option value="365">Last 1 Year</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>
            <div className="mt-2">
              {frequency === "custom" && (
                <RangePicker
                  value={range}
                  onChange={(values) => setRange(values)}
                />
              )}
            </div>
          </div>
          <div className="d-flex flex-column mx-5">
            <h6>Select Type</h6>
            <Select value={type} onChange={(value) => setType(value)}>
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expence">Expence</Select.Option>
            </Select>
          </div>
        </div>

        <div className="d-flex ">
          <div className="view" >
            <FormatListBulletedIcon  fontSize="large" className={`${view === "table" ? "active-icon" : "inactive-icon"}`} 
                                    onClick={() => setView("table")} />
            <AnalyticsIcon fontSize="large" className={`${view === "analytics" ? "active-icon" : "inactive-icon"}`}
              
              onClick={() => setView("analytics")}
            />
          </div>

          <button className="primary" onClick={() => setShowModal(true)}>
            Add New
          </button>
        </div>
      </div>

      <div className="tables">
        <div className="table">
          {view === "table" ? (
            <Table columns={columns} dataSource={transactionData} />
          ) : (
            <Analytic transactionData={transactionData} />
          )}
        </div>
      </div>

      {showModal && (
        <AddTransaction
          showModal={showModal}
          edit={edit}
          setEdit={setEdit}
          setShowModal={setShowModal}
          getTransactions={getTransactions}
        />
      )}
    </DefaultLayout>
  );
};

export default Home;
//<Modal onClick ={handleCancel} onHandle ={handleChange}/>
