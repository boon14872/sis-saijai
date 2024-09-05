import React from 'react';
import Card from '../components/dashboard/card/card'
import Styles from './dashboard.module.css';
import Chart from '../components/dashboard/chart/chart'
import Rightbar from '../components/dashboard/rightbar/rightbar'

export const metadata = {
  title: "Dashboard | Pos Sai Jai",
  description: "Welcome to Pos Sai Jai, your online.",
};
export default function Dashboard() {
  return (
    <div>
      <div className={Styles.wrapper}>
        <div className={Styles.main}>
          <div className={Styles.card}>
            <Card />
            <Card />
            <Card />
          </div>
          {/* <Transactions /> */}
          <Chart />
        </div>
        <div className={Styles.rightbar}>
          <Rightbar />
        </div>
        
      </div>
    </div>
    
  );
};