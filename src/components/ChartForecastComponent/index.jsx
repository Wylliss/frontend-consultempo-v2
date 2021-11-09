import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer } from 'recharts';
import api from '../../services/api';
import moment from 'moment';
import 'moment/locale/pt-br'
import './style.css'

export default class ChartForecast extends PureComponent {

    state = {
        forecast: [],

    }

    componentDidMount() {
        api.get('/forecast')
            .then(res => {
                console.log(res.data)
                this.setState({ forecast: res.data });
            })
    }


    render() {

        const { forecast } = this.state;

        function formatXAxis(tickItem) {
            moment.locale('pt-br')
            return moment(tickItem).format('dddd')
        }


        return (
            <ResponsiveContainer width="70%" height="100%"  >
                <LineChart className="chart2"
                    width={500}
                    height={300}
                    data={forecast}
                    margin={{
                        top: 5,
                        right: 50,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={formatXAxis} >
                        <Label
                            position="bottom"
                            style={{ textAnchor: "middle" }}
                        />
                    </XAxis>
                    <YAxis unit={"ºC"}>
                        <Label
                            position="left"
                            angle={-90}
                            style={{ textAnchor: "middle" }}
                        />
                    </YAxis>
                    <Tooltip />
                    <Legend />
                    <Line dataKey="maximum" name="Máxima" stroke="#b03407" type="monotone" activeDot={{ r: 8 }} />
                    <Line dataKey="minimum" name="Mínima" stroke="#07b06d" type="monotone" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        );
    }
}
