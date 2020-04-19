import React, { useState, useEffect } from 'react'
import './RelationshipView.css'
import BottomNavBar from '../../components/BottomNavBar'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Chart from '../../components/Chart'
import HomePage from '../../components/HomePage'
import Item from '../../utils/Item'
import PostingWall from '../../components/PostingWall'

//Styling
const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: '95%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  heightCenterPage: { height: 'auto', overflow: 'auto', marginBottom: 70 }
  ,
  heightModalPage: {
    position: 'absolute',
    width: '95%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
}))


const RelationshipView = (props) => {

  const classes = useStyles();

  const [chartState, setChartState] = useState({
    items: [],
    
  })

  useEffect(() => {
    props.getRelationshipUserInfo()
    Item.readRelationship(props.userState.currentViewRelationshipID)
      .then(({ data: items }) => {
        let userID = props.userState.uid 
        let partnerID = props.userState.partnerId
        let requestingPartnerID = props.userState.requestingPartnerId 
        console.log(partnerID)
        console.log(userID)
        setChartState({ items })
        console.log(items)
      })
  }, [])

  //Sample Person Data
  let Person1Data = [
    { x: new Date("2020- 03- 14"), y: 20 },
    { x: new Date("2020- 03- 15"), y: 22 },
    { x: new Date("2020- 03- 16"), y: 24 },
    { x: new Date("2020- 03- 17"), y: 26 },
    { x: new Date("2020- 03- 18"), y: 24 },
    { x: new Date("2020- 03- 19"), y: 26 },
    { x: new Date("2020- 03- 20"), y: 24 },
    { x: new Date("2020- 03- 21"), y: 26 },
    { x: new Date("2020- 03- 22"), y: 24 },
    { x: new Date("2020- 03- 23"), y: 26 },
    { x: new Date("2020- 03- 24"), y: 28 },
    { x: new Date("2020- 03- 25"), y: 30 },
    { x: new Date("2020- 03- 26"), y: 32 },
    { x: new Date("2020- 03- 27"), y: 34 },
    { x: new Date("2020- 03- 28"), y: 36 },
    { x: new Date("2020- 03- 29"), y: 34 },
    { x: new Date("2020- 03- 30"), y: 36 },
    { x: new Date("2020- 03- 31"), y: 38 },
    { x: new Date("2020- 04- 01"), y: 40 },
    { x: new Date("2020- 04- 02"), y: 42 },
    { x: new Date("2020- 04- 03"), y: 44 },
    { x: new Date("2020- 04- 04"), y: 46 },
    { x: new Date("2020- 04- 05"), y: 44 },
    { x: new Date("2020- 04- 06"), y: 42 },
    { x: new Date("2020- 04- 07"), y: 44 }
  ]

  let Person2Data = [
    { x: new Date("2020- 03- 14"), y: 18 },
    { x: new Date("2020- 03- 15"), y: 20 },
    { x: new Date("2020- 03- 16"), y: 18 },
    { x: new Date("2020- 03- 17"), y: 18 },
    { x: new Date("2020- 03- 18"), y: 20 },
    { x: new Date("2020- 03- 19"), y: 22 },
    { x: new Date("2020- 03- 20"), y: 24 },
    { x: new Date("2020- 03- 21"), y: 26 },
    { x: new Date("2020- 03- 22"), y: 26 },
    { x: new Date("2020- 03- 23"), y: 28 },
    { x: new Date("2020- 03- 24"), y: 30 },
    { x: new Date("2020- 03- 25"), y: 28 },
    { x: new Date("2020- 03- 26"), y: 26 },
    { x: new Date("2020- 03- 27"), y: 28 },
    { x: new Date("2020- 03- 28"), y: 30 },
    { x: new Date("2020- 03- 29"), y: 32 },
    { x: new Date("2020- 03- 30"), y: 34 },
    { x: new Date("2020- 03- 31"), y: 34 },
    { x: new Date("2020- 04- 01"), y: 36 },
    { x: new Date("2020- 04- 02"), y: 34 },
    { x: new Date("2020- 04- 03"), y: 36 },
    { x: new Date("2020- 04- 04"), y: 38 },
    { x: new Date("2020- 04- 05"), y: 40 },
    { x: new Date("2020- 04- 06"), y: 41 },
    { x: new Date("2020- 04- 07"), y: 42 }
  ]

  let person1Name = `${ props.userState.firstName } ${ props.userState.lastName } `

  let person2Name = `${props.userState.partnerFirstName} ${props.userState.partnerLastName} `

  return (
    <>
      {props.userState.inRelationship ?
      <Paper className={classes.heightCenterPage}>
        <Chart ChartTitle='Relationship Chart' ChartSubtitles='~ Breakup Point ~'
          Person1Name={person1Name}
          Person1Data={Person1Data}
          Person1xValueFormatString="MMM YYYY"
          Person1yValueFormatString="#,##0.##"
          Person2Name={person2Name}
          Person2Data={Person2Data}
          Person2xValueFormatString="MMM YYYY"
          Person2yValueFormatString="#,##0.##"
        />
        <HomePage
            userState={props.userState}
        />
        <PostingWall
            userState={props.userState}
        />
      </Paper>:
      <h1>Please setup a relationship.  No Relationship setup.</h1>
      }
      <BottomNavBar searchOpen={props.handleOpenSearchModal}
        addOpen={props.handleOpenRelationshipModal}
        historyOpen={props.handleOpenConnectionsModal}
      />
    </>
  )
}

export default RelationshipView
