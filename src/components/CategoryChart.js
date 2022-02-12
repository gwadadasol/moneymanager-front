import React from 'react';
import { useState, useEffect } from "react"
// material
import Chart from 'react-apexcharts';





const CategoryChart = () => {

  // const baseUrlAnalyzer = 'https://localhost:7071' ;
  const baseUrlAnalyzer = 'http://acme.com' ;

  const [balances,setBalances] = useState([]);

  useEffect(() => {

    const getBalances = async () => {
      await updateBalances(); 
    }
    getBalances();
  }, [])

   //  Categories
   const fetchBalances = async () => {
    const res = await fetch(baseUrlAnalyzer + '/api/v1/analyzer/amounts/categories')
    const data = await res.json()

    return data
  }

  const updateBalances = async () => {
    const newBalances = await fetchBalances();
    newBalances.map((bal) => console.log(bal));

    setBalances(newBalances);
    console.log(balances);
    // balances.map((bal) => console.log(bal.year + "-" + bal.month));
  }

  const options = {
    chart: {
      id: 'apexchart-example'
    },
    xaxis: {
      // categories:     balances.map((bal) =>bal.year + "-" + bal.month)
      categories:     balances.map((bal) =>bal.category)
    }
  };
  const series  = [{
    name: 'series-1',
    data:balances.map((bal) =>bal.value)
  }];
  

    return (
      <Chart options={options} series={series} type="bar" width={500} height={320} />
    )
}

export default CategoryChart
