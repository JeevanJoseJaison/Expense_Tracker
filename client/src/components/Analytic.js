import React from "react";
import "./Analytic.css";
import { Progress} from 'antd';


const Analytic =({transactionData})=>{
   
    const totalTransactions = transactionData.length;
    const totalTurnover = transactionData.reduce((accumulator , data)=>
    accumulator+data.amount,0);

    const numIncome = transactionData.filter(
        (transaction) => transaction.type === "income"
      );

      const numExpense = transactionData.filter(
        (transaction) => transaction.type === "expence"
      );
     
      const numIncomePercent = +((numIncome.length/totalTransactions)*100).toFixed(0);
      const numExpensePercent = +((numExpense.length/totalTransactions)*100).toFixed(0);

      const totalExpense = numExpense.reduce((accumulator,data)=>
      accumulator + data.amount,0);
    

      const totalIncome = numIncome.reduce((accumulator,data)=>
      accumulator + data.amount,0);

      const totalExpensePercent = +((totalExpense/totalTurnover)*100).toFixed(0);
      const totalIncomePercent = +((totalIncome/totalTurnover)*100).toFixed(0);
      console.log(numExpense);


    const progressBarExpense= numExpense.map((item)=>{
        return(
         
            <div className="progress">
                <h6>{item.category}</h6>
                <Progress strokeColor="#DC3535" percent={((item.amount/totalExpense)*100).toFixed(0)}/>
            </div>
        );
    });
    
    const progressBarIncome= numIncome.map((item)=>{
        return(
         
            <div className="progress ">
                <h6>{item.category}</h6>
                <Progress  strokeColor="#B01E68" percent={((item.amount/totalIncome)*100).toFixed(0)}/>
            </div>
        );
    });

  
      


    
    return(
        <div className="analytics">
        <div className="row">
          <div className=" col-md-4 mt-3">
          <div className="transactions">
            <h3>Total Transactions : {totalTransactions}</h3>
            <hr/>
            <h6>Income : {numIncome.length}</h6>
            <h6>Expence : {numExpense.length}</h6>
            <Progress className ="progress-bar" type="circle" strokeColor="#DC3535" percent={numIncomePercent}/>
            <Progress className ="progress-bar" type="circle" strokeColor="#B01E68" percent={numExpensePercent}/>
            </div>
          </div>
          <div className=" col-md-4 mt-3">
          <div className="transactions">
          <h3>Total Turnover : {totalTurnover}</h3>
          <hr/>
          <h6>Income : {totalIncome}</h6>
            <h6>Expence : {totalExpense}</h6>
            <Progress className ="progress-bar" type="circle" strokeColor="#DC3535" percent={totalIncomePercent}/>
            <Progress className ="progress-bar" type="circle" strokeColor="#B01E68" percent={totalExpensePercent}/>
          </div>
          </div>
        </div>
        <hr/>
        <div className="row">
        
        <div className="col-md-6">
        <div className="category">
          <h3>Income - Category Wise</h3>
          {progressBarIncome}

         </div>
         </div>
         
         <div className="col-md-6">
         <div className="category">
         <h3>Expence - Category Wise</h3>
      
         {progressBarExpense}
         </div>
         </div>

        </div>
        </div>
    );
}

export default Analytic;