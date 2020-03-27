import React from 'react'
import CanvasJSReact from './canvasjs.react';
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Chart = (props) => {
  
  const options = {
    theme: "light2",
    animationEnabled: true,
    title: {
      text: `${props.ChartTitle}`
    },
    subtitles: [{
      text: `${props.ChartSubtitles}`
    }],
    axisY: {
      includeZero: false,
      prefix: ""
    },
    toolTip: {
      shared: true
    },
    data: [
      {
        type: "area",
        name: `${props.Person1Name}`,
        showInLegend: true,
        xValueFormatString: `${props.Person1xValueFormatString}`,
        yValueFormatString: `${props.Person2yValueFormatString}`,
        dataPoints: props.Person1Data
      },
      {
        type: "area",
        name: `${props.Person2Name}`,
        showInLegend: true,
        xValueFormatString: `${props.Person2xValueFormatString}`,
        yValueFormatString: `${props.Person2yValueFormatString}`,
        dataPoints: props.Person2Data
      }
    ]
  }

  return (
    <>
    
    <CanvasJSChart options={options}
    /* onRef={ref => this.chart = ref} */
    />
    </>
  )
}

export default Chart