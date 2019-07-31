import React,{Component} from 'react';
import { Card, Grid, CardHeader } from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import ChartScaleBand from './commons/ChartScaleBand';


class Home extends Component{

    constructor(props){
        super(props);
        //this.state = {chartData:[{ x: '1950', y: 2.525 }]}
    }

    render(){
        //const {chartData} = this.state;
        /*return (
            <div style={{textAlign:'center'}}>
                <Grid container spacing={24}>
                    <Grid item sm={6}>
                        <Card>
                            <CardHeader title='Ingresos'/>
                            <ChartScaleBand chartData={chartData}/>
                        </Card>
                            </Grid>
                    <Grid item sm={6}>
                        <Card>
                            <CardHeader title='Ventas'/>
                            <ChartScaleBand chartData={chartData}/>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        )*/
        return (
            <div style={{textAlign:'center'}}>
            </div>
        )
    }
}


export default withRouter(Home);