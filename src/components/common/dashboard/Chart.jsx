// Essentials
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Components
import ChartTooltip from 'components/common/dashboard/ChartTooltip';

const Chart = ({ chart }) => {
  
  return (
    <>
      {chart &&
        <>
          <ResponsiveContainer width='95%' height='100%'>
            <BarChart
              data={chart.data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              baseValue={1}
            >
              <XAxis dataKey='label' />
              <YAxis allowDecimals={false} />
              <Tooltip content={<ChartTooltip unit={chart.unit} />} />
              <Bar dataKey='value' fill='#82CD47' />
            </BarChart>
          </ResponsiveContainer>
          <div className='chart-title mt-2'>{chart.title}</div> 
        </>
      }
    </>
  );
};

export default Chart;